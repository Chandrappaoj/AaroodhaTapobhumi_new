<?php
/**
 * Gallery API
 * GET /api/gallery.php?category=all|ashrama|events|seva|festivals
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../admin/db_connect.php';

try {
    // Get query parameter
    $category = isset($_GET['category']) ? $_GET['category'] : 'all';
    
    if ($category === 'all') {
        // Fetch all images
        $stmt = $pdo->prepare("
            SELECT id, image_url, title_english, title_kannada, category
            FROM gallery
            ORDER BY id DESC
        ");
        $stmt->execute();
    } else {
        // Fetch images by category
        $stmt = $pdo->prepare("
            SELECT id, image_url, title_english, title_kannada, category
            FROM gallery
            WHERE category = :category
            ORDER BY id DESC
        ");
        $stmt->execute(['category' => $category]);
    }
    
    $images = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode(['images' => $images]);
    
} catch(PDOException $e) {
    error_log("Gallery API Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to fetch gallery images'
    ]);
}
?>
