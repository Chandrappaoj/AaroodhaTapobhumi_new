<?php
/**
 * Admin Image Upload
 * POST /api/admin/upload.php
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
require_once '../config.php';

// Check authentication
checkAdminAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed', 405);
}

try {
    if (!isset($_FILES['image'])) {
        error_log("Upload Error: No image file in request. FILES: " . print_r($_FILES, true));
        sendError('No image file provided', 400);
    }
    
    error_log("Upload attempt: " . $_FILES['image']['name'] . ", size: " . $_FILES['image']['size']);
    
    // Save to uploads directory (not gallery subdirectory)
    $result = uploadImage($_FILES['image'], '../../uploads/');
    
    error_log("Upload result: " . print_r($result, true));
    
    if ($result['success']) {
        sendResponse([
            'success' => true,
            'url' => $result['url'],
            'message' => 'Image uploaded successfully'
        ]);
    } else {
        error_log("Upload failed: " . $result['error']);
        sendError($result['error'], 400);
    }
    
} catch(Exception $e) {
    error_log("Image Upload Exception: " . $e->getMessage());
    sendError('Upload failed: ' . $e->getMessage(), 500);
}
?>
