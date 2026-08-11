<?php
/**
 * Admin Charitre Management
 * POST /api/admin/charitre.php - Create/Update chapter
 * DELETE /api/admin/charitre.php?id=X - Delete chapter
 */

session_start();
ini_set('display_errors', 0);
error_reporting(E_ALL);
ob_start();
header('Content-Type: application/json');

require_once __DIR__ . '/../../admin/db_connect.php';

// Check authentication
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Unauthorized']);
    exit();
}

// Ensure upload directory exists
$uploadBase = $_SERVER['DOCUMENT_ROOT'] . '/ashrama-api/uploads/charitre/';
$audioDir = $uploadBase . 'audio/';
$imageDir = $uploadBase . 'images/';

foreach ([$uploadBase, $audioDir, $imageDir] as $dir) {
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
}

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = $_POST;
        $id = isset($input['id']) && !empty($input['id']) ? (int)$input['id'] : 0;
        $isUpdate = $id > 0;

        if (!$isUpdate && empty($_FILES['content_txt'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Text file is required for new chapters']);
            exit();
        }

        // 1. Handle Text File parsing
        $contentHtml = null;
        if (isset($_FILES['content_txt']) && $_FILES['content_txt']['error'] === UPLOAD_ERR_OK) {
            $txtFile = $_FILES['content_txt'];
            if ($txtFile['type'] !== 'text/plain') {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Invalid file type. Only .txt allowed.']);
                exit();
            }

            $rawText = file_get_contents($txtFile['tmp_name']);
            if (!mb_check_encoding($rawText, 'UTF-8')) {
                $rawText = mb_convert_encoding($rawText, 'UTF-8', 'auto');
            }
            
            // Escape HTML for safety
            $safeText = htmlspecialchars($rawText, ENT_QUOTES, 'UTF-8');
            
            // Split by double newlines to create paragraphs
            $paragraphs = preg_split('/\n\s*\n/', $safeText);
            $contentHtml = '';
            foreach ($paragraphs as $p) {
                $p = trim($p);
                if (!empty($p)) {
                    // Convert single newlines inside paragraphs to <br>
                    $contentHtml .= '<p>' . nl2br($p) . "</p>\n\n";
                }
            }
        }

        // 2. Handle Audio Upload
        $audioUrl = null;
        if (isset($_FILES['audio_file']) && $_FILES['audio_file']['error'] === UPLOAD_ERR_OK) {
            $file = $_FILES['audio_file'];
            if (strpos($file['type'], 'audio/') !== 0) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Invalid file type. Only audio files allowed.']);
                exit();
            }
            $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
            $filename = 'chapter_' . time() . '.' . $ext;
            if (move_uploaded_file($file['tmp_name'], $audioDir . $filename)) {
                $audioUrl = '/ashrama-api/uploads/charitre/audio/' . $filename;
            }
        }

        // 3. Handle Cover Image Upload
        $imageUrl = null;
        if (isset($_FILES['cover_image']) && $_FILES['cover_image']['error'] === UPLOAD_ERR_OK) {
            $file = $_FILES['cover_image'];
            if (strpos($file['type'], 'image/') !== 0) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Invalid image type.']);
                exit();
            }
            $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
            $filename = 'cover_' . time() . '.' . $ext;
            if (move_uploaded_file($file['tmp_name'], $imageDir . $filename)) {
                $imageUrl = '/ashrama-api/uploads/charitre/images/' . $filename;
            }
        }

        if ($isUpdate) {
            $sql = "UPDATE charitre_chapters SET 
                    chapter_number = :chapter_number, 
                    title_kn = :title_kn, 
                    subtitle_kn = :subtitle_kn, 
                    display_order = :display_order,
                    is_published = :is_published";
            
            $params = [
                'id' => $id,
                'chapter_number' => $input['chapter_number'],
                'title_kn' => $input['title_kn'],
                'subtitle_kn' => $input['subtitle_kn'] ?? null,
                'display_order' => $input['display_order'] ?? 0,
                'is_published' => $input['is_published'] ?? 1
            ];

            if ($contentHtml !== null) {
                $sql .= ", content_kn = :content_kn";
                $params['content_kn'] = $contentHtml;
            }
            if ($audioUrl !== null) {
                $sql .= ", audio_file = :audio_file";
                $params['audio_file'] = $audioUrl;
            }
            if ($imageUrl !== null) {
                $sql .= ", cover_image = :cover_image";
                $params['cover_image'] = $imageUrl;
            }

            $sql .= " WHERE id = :id";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);

            echo json_encode(['success' => true, 'message' => 'Chapter updated successfully']);

        } else {
            $stmt = $pdo->prepare("
                INSERT INTO charitre_chapters (chapter_number, title_kn, subtitle_kn, content_kn, audio_file, cover_image, is_published, display_order)
                VALUES (:chapter_number, :title_kn, :subtitle_kn, :content_kn, :audio_file, :cover_image, :is_published, :display_order)
            ");
            
            $stmt->execute([
                'chapter_number' => $input['chapter_number'],
                'title_kn' => $input['title_kn'],
                'subtitle_kn' => $input['subtitle_kn'] ?? null,
                'content_kn' => $contentHtml ?? '',
                'audio_file' => $audioUrl,
                'cover_image' => $imageUrl,
                'is_published' => $input['is_published'] ?? 1,
                'display_order' => $input['display_order'] ?? 0
            ]);
            
            echo json_encode(['success' => true, 'message' => 'Chapter added successfully']);
        }

    } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
        if ($id === 0) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Chapter ID required']);
            exit();
        }

        // Optional: Get old files and unlink them to save space
        $stmt = $pdo->prepare("SELECT audio_file, cover_image FROM charitre_chapters WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();
        
        if ($row) {
            if ($row['audio_file']) {
                $path = $_SERVER['DOCUMENT_ROOT'] . $row['audio_file'];
                if (file_exists($path)) unlink($path);
            }
            if ($row['cover_image']) {
                $path = $_SERVER['DOCUMENT_ROOT'] . $row['cover_image'];
                if (file_exists($path)) unlink($path);
            }
        }

        $stmt = $pdo->prepare("DELETE FROM charitre_chapters WHERE id = :id");
        $stmt->execute(['id' => $id]);
        
        echo json_encode(['success' => true, 'message' => 'Chapter deleted successfully']);
    } else {
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    }
} catch(PDOException $e) {
    if (ob_get_length()) ob_clean();
    error_log("Admin Charitre Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
}

if (ob_get_length()) ob_end_flush();
?>
