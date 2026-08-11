<?php
/**
 * Site Images API
 * GET /api/site-images.php?section=hero|about|seva_puja|etc
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

require_once 'config.php';

try {
    $conn = getDBConnection();

    // Get section parameter
    $section = isset($_GET['section']) ? $_GET['section'] : null;
    
    if (!$section) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Section parameter is required'
        ]);
        exit();
    }
    
    // Fetch image for the specified section
    $stmt = $conn->prepare("
        SELECT id, image_key, image_url, section
        FROM site_images
        WHERE image_key = :section
        LIMIT 1
    ");
    
    $stmt->execute(['section' => $section]);
    $image = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($image) {
        echo json_encode([
            'success' => true,
            'data' => $image
        ]);
    } else {
        echo json_encode([
            'success' => true,
            'data' => null
        ]);
    }
    
} catch(PDOException $e) {
    error_log("Site Images API Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to fetch site image'
    ]);
}
?>
