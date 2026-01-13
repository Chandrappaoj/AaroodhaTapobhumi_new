<?php
/**
 * Admin Trustees Management
 * POST /api/admin/trustees.php - Create trustee (supports both JSON and FormData with file upload)
 * PUT /api/admin/trustees.php?id=X - Update trustee
 * DELETE /api/admin/trustees.php?id=X - Delete trustee
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
        // CREATE TRUSTEE
        
        // Check if it's a file upload (FormData) or JSON
        $isFileUpload = isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK;
        
        if ($isFileUpload) {
            // Handle FormData with file upload
            $input = $_POST;
            
            // Validate required fields
            if (empty($input['name_english']) || empty($input['position_english'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Name and position are required']);
                exit();
            }
            
            // Handle file upload
            $file = $_FILES['image'];
            $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            
            if (!in_array($file['type'], $allowedTypes)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Invalid file type. Only JPG, PNG, GIF, and WebP allowed.']);
                exit();
            }
            
            // Generate unique filename
            $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
            $filename = uniqid() . '_' . time() . '.' . $extension;
            
            // Use DOCUMENT_ROOT for robust path handling
            $uploadDir = $_SERVER['DOCUMENT_ROOT'] . '/ashrama-api/uploads/';
            $uploadPath = $uploadDir . $filename;
            
            // Create upload directory if it doesn't exist
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }
            
            if (!move_uploaded_file($file['tmp_name'], $uploadPath)) {
                http_response_code(500);
                echo json_encode(['success' => false, 'error' => 'Failed to upload image. Check permissions.']);
                exit();
            }
            
            $imageUrl = '/ashrama-api/uploads/' . $filename;
        } else {
            // Handle JSON data (no file upload)
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($input['name_english']) || !isset($input['position_english'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Name and position are required']);
                exit();
            }
            
            $imageUrl = $input['image_url'] ?? null;
        }
        
        $stmt = $pdo->prepare("
            INSERT INTO trustees (name_english, name_kannada, position_english, position_kannada, 
                                  bio_english, bio_kannada, image_url, display_order)
            VALUES (:name_english, :name_kannada, :position_english, :position_kannada, 
                    :bio_english, :bio_kannada, :image_url, :display_order)
        ");
        
        $stmt->execute([
            'name_english' => $input['name_english'],
            'name_kannada' => $input['name_kannada'] ?? null,
            'position_english' => $input['position_english'],
            'position_kannada' => $input['position_kannada'] ?? null,
            'bio_english' => $input['bio_english'] ?? null,
            'bio_kannada' => $input['bio_kannada'] ?? null,
            'image_url' => $imageUrl,
            'display_order' => $input['display_order'] ?? 0
        ]);
        
        echo json_encode([
            'success' => true, 
            'message' => 'Trustee added successfully', 
            'id' => $pdo->lastInsertId()
        ]);
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        // UPDATE TRUSTEE
        $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
        if ($id === 0) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Trustee ID required']);
            exit();
        }
        
        $input = json_decode(file_get_contents('php://input'), true);
        
        $stmt = $pdo->prepare("
            UPDATE trustees
            SET name_english = :name_english, name_kannada = :name_kannada, 
                position_english = :position_english, position_kannada = :position_kannada, 
                bio_english = :bio_english, bio_kannada = :bio_kannada,
                image_url = :image_url, display_order = :display_order
            WHERE id = :id
        ");
        
        $stmt->execute([
            'id' => $id,
            'name_english' => $input['name_english'],
            'name_kannada' => $input['name_kannada'] ?? null,
            'position_english' => $input['position_english'],
            'position_kannada' => $input['position_kannada'] ?? null,
            'bio_english' => $input['bio_english'] ?? null,
            'bio_kannada' => $input['bio_kannada'] ?? null,
            'image_url' => $input['image_url'] ?? null,
            'display_order' => $input['display_order'] ?? 0
        ]);
        
        echo json_encode(['success' => true, 'message' => 'Trustee updated successfully']);
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        // DELETE TRUSTEE
        $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
        if ($id === 0) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Trustee ID required']);
            exit();
        }
        
        // Get image URL before deleting to remove file
        $stmt = $pdo->prepare("SELECT image_url FROM trustees WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $trustee = $stmt->fetch();
        
        // Delete from database
        $stmt = $pdo->prepare("DELETE FROM trustees WHERE id = :id");
        $stmt->execute(['id' => $id]);
        
        // Delete image file if exists
        if ($trustee && $trustee['image_url']) {
            $imagePath = __DIR__ . '/../..' . $trustee['image_url'];
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
        }
        
        echo json_encode(['success' => true, 'message' => 'Trustee deleted successfully']);
        
    } else {
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    }
    
} catch(PDOException $e) {
    error_log("Admin Trustees Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Operation failed: ' . $e->getMessage()]);
}
?>
