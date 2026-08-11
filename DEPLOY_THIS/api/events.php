<?php
/**
 * Events API
 * GET /api/events.php?type=upcoming|past&limit=X
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

    // Get query parameters
    $type = isset($_GET['type']) ? $_GET['type'] : 'all';
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : null;
    
    $today = date('Y-m-d');
    
    if ($type === 'upcoming') {
        // Fetch upcoming events (event_date >= today)
        $sql = "SELECT * FROM events WHERE event_date >= :today ORDER BY event_date ASC";
        $stmt = $conn->prepare($sql);
        $stmt->execute(['today' => $today]);
    } elseif ($type === 'past') {
        // Fetch past events (event_date < today)
        $sql = "SELECT * FROM events WHERE event_date < :today ORDER BY event_date DESC";
        $stmt = $conn->prepare($sql);
        $stmt->execute(['today' => $today]);
    } else {
        // Fetch all events
        $sql = "SELECT * FROM events ORDER BY event_date DESC";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
    }
    
    // Add limit if specified
    if ($limit) {
        $sql .= " LIMIT " . $limit;
    }
    
    $events = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'data' => $events
    ]);
    
} catch(PDOException $e) {
    error_log("Events API Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to fetch events'
    ]);
}
?>
