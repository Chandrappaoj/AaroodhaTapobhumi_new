<?php
/**
 * Trustees API
 * GET /api/trustees.php
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

    // Fetch all trustees ordered by display_order
    $stmt = $conn->prepare("
        SELECT id, name_english, name_kannada, position_english, position_kannada, 
               bio_english, bio_kannada, image_url, display_order
        FROM trustees
        ORDER BY display_order ASC
    ");
    
    $stmt->execute();
    $trustees = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode(['trustees' => $trustees]);
    
} catch(PDOException $e) {
    error_log("Trustees API Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to fetch trustees'
    ]);
}
?>
