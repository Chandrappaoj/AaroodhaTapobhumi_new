<?php
/**
 * Admin Image Upload Endpoint
 * POST /api/admin/upload-image.php - Upload gallery image
 */

require_once '../config.php';
checkAdminAuth();

header('Content-Type: application/json');

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        sendError('Method not allowed', 405);
    }

    // Check if file was uploaded
    if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        $errorMsg = isset($_FILES['image']) ? 'Upload error: ' . $_FILES['image']['error'] : 'No file uploaded';
        sendError($errorMsg, 400);
    }

    $file = $_FILES['image'];
    
    // Validate file type
    $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mimeType = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);
    
    if (!in_array($mimeType, $allowedTypes)) {
        sendError('Invalid file type. Only JPG, PNG, and WebP images are allowed.', 400);
    }
    
    // Validate file size (max 5MB)
    $maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if ($file['size'] > $maxSize) {
        sendError('File too large. Maximum size is 5MB.', 400);
    }
    
    // Create upload directory if it doesn't exist
    $uploadDir = '../../uploads/gallery/';
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    
    // Generate unique filename
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = 'gallery_' . time() . '_' . uniqid() . '.' . $extension;
    $uploadPath = $uploadDir . $filename;
    
    // Move uploaded file
    if (!move_uploaded_file($file['tmp_name'], $uploadPath)) {
        sendError('Failed to save uploaded file', 500);
    }
    
    // Return the URL path (relative to web root)
    $imageUrl = '/uploads/gallery/' . $filename;
    
    sendResponse([
        'success' => true,
        'message' => 'Image uploaded successfully',
        'url' => $imageUrl, // For admin panel compatibility
        'image_url' => $imageUrl,
        'filename' => $filename
    ]);
    
} catch (Exception $e) {
    error_log("Image Upload Error: " . $e->getMessage());
    sendError('Upload failed: ' . $e->getMessage(), 500);
}
?>
