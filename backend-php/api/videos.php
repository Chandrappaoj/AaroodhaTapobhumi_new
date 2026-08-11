<?php
/**
 * Videos API
 * GET /api/videos.php - Get all videos
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
    $pdo = getDBConnection();

    // Fetch all videos
    $stmt = $pdo->prepare("
        SELECT id, video_url, title_english, title_kannada, 
               description_english, description_kannada
        FROM videos
        ORDER BY id DESC
    ");
    $stmt->execute();
    
    $videos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode(['videos' => $videos]);
    
} catch(PDOException $e) {
    error_log("Videos API Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to fetch videos'
    ]);
}
?>
