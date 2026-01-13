<?php
/**
 * Admin Videos Management
 * POST /api/admin/videos.php - Create video
 * DELETE /api/admin/videos.php?id=X - Delete video
 */

session_start();
header('Content-Type: application/json');

require_once __DIR__ . '/../../admin/db_connect.php';

// Check authentication
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Unauthorized']);
    exit();
}

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // CREATE VIDEO
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['video_url'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Video URL is required']);
            exit();
        }
        
        $stmt = $pdo->prepare("
            INSERT INTO videos (video_url, title_english, title_kannada, 
                                description_english, description_kannada)
            VALUES (:video_url, :title_english, :title_kannada, 
                    :description_english, :description_kannada)
        ");
        
        $stmt->execute([
            'video_url' => $input['video_url'],
            'title_english' => $input['title_en'] ?? null,
            'title_kannada' => $input['title_kn'] ?? null,
            'description_english' => $input['description'] ?? null,
            'description_kannada' => $input['description_kn'] ?? null
        ]);
        
        echo json_encode([
            'success' => true, 
            'message' => 'Video added successfully', 
            'id' => $pdo->lastInsertId()
        ]);
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        // DELETE VIDEO
        $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
        if ($id === 0) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Video ID required']);
            exit();
        }
        
        $stmt = $pdo->prepare("DELETE FROM videos WHERE id = :id");
        $stmt->execute(['id' => $id]);
        
        echo json_encode(['success' => true, 'message' => 'Video deleted successfully']);
        
    } else {
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    }
    
} catch(PDOException $e) {
    error_log("Admin Videos Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Operation failed: ' . $e->getMessage()]);
}
?>
