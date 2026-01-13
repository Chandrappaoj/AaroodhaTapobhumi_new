<?php
/**
 * Admin Gallery Management
 * POST /api/admin/gallery.php - Upload gallery image
 * DELETE /api/admin/gallery.php?id=X - Delete gallery image
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
        // UPLOAD GALLERY IMAGE
        
        // Check if file was uploaded
        if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'No image uploaded']);
            exit();
        }
        
        $file = $_FILES['image'];
        $title = $_POST['title'] ?? '';
        $title_kannada = $_POST['title_kannada'] ?? '';
        $category = $_POST['category'] ?? 'ashrama';
        
        // Validate file type
        $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!in_array($file['type'], $allowedTypes)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid file type. Only JPG, PNG, GIF, and WebP allowed.']);
            exit();
        }
        
        // Generate unique filename
        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $filename = uniqid() . '_' . time() . '.' . $extension;
        $uploadDir = $_SERVER['DOCUMENT_ROOT'] . '/ashrama-api/uploads/';
        $uploadPath = $uploadDir . $filename;
        
        // Create upload directory if it doesn't exist
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        
        // Move uploaded file
        if (!move_uploaded_file($file['tmp_name'], $uploadPath)) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Failed to save image']);
            exit();
        }
        
        // Save to database
        $imageUrl = '/ashrama-api/uploads/' . $filename;
        
        $stmt = $pdo->prepare("
            INSERT INTO gallery (image_url, title_english, title_kannada, category)
            VALUES (:image_url, :title_english, :title_kannada, :category)
        ");
        
        $stmt->execute([
            'image_url' => $imageUrl,
            'title_english' => $title,
            'title_kannada' => $title_kannada,
            'category' => $category
        ]);
        
        echo json_encode([
            'success' => true, 
            'message' => 'Image uploaded successfully', 
            'id' => $pdo->lastInsertId(),
            'image_url' => $imageUrl
        ]);
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        // DELETE GALLERY IMAGE
        $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
        if ($id === 0) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Image ID required']);
            exit();
        }
        
        // Get image info before deleting
        $stmt = $pdo->prepare("SELECT image_url FROM gallery WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $image = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$image) {
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => 'Image not found']);
            exit();
        }
        
        // Delete from database
        $stmt = $pdo->prepare("DELETE FROM gallery WHERE id = :id");
        $stmt->execute(['id' => $id]);
        
        // Delete file from disk
        $imagePath = $_SERVER['DOCUMENT_ROOT'] . $image['image_url'];
        if (file_exists($imagePath)) {
            unlink($imagePath);
        }
        
        echo json_encode(['success' => true, 'message' => 'Image deleted successfully']);
        
    } else {
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    }
    
} catch(PDOException $e) {
    error_log("Admin Gallery Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Operation failed: ' . $e->getMessage()]);
}
?>
