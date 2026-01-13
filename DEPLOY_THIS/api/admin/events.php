<?php
/**
 * Admin Events Management
 * POST /api/admin/events.php - Create event
 * PUT /api/admin/events.php?id=X - Update event
 * DELETE /api/admin/events.php?id=X - Delete event
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
        // CREATE EVENT
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['title']) || !isset($input['title_kn']) || !isset($input['date'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Required fields missing']);
            exit();
        }
        
        $stmt = $pdo->prepare("
            INSERT INTO events (title_english, title_kannada, event_date, event_time, 
                                location_english, location_kannada, description_english, description_kannada)
            VALUES (:title_english, :title_kannada, :event_date, :event_time, 
                    :location_english, :location_kannada, :description_english, :description_kannada)
        ");
        
        $stmt->execute([
            'title_english' => $input['title'],
            'title_kannada' => $input['title_kn'],
            'event_date' => $input['date'],
            'event_time' => $input['time'] ?? null,
            'location_english' => $input['location'] ?? null,
            'location_kannada' => $input['location_kn'] ?? null,
            'description_english' => $input['description'] ?? null,
            'description_kannada' => $input['description_kn'] ?? null
        ]);
        
        echo json_encode([
            'success' => true, 
            'message' => 'Event created successfully', 
            'id' => $pdo->lastInsertId()
        ]);
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        // UPDATE EVENT
        $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
        if ($id === 0) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Event ID required']);
            exit();
        }
        
        $input = json_decode(file_get_contents('php://input'), true);
        
        $stmt = $pdo->prepare("
            UPDATE events
            SET title_english = :title_english, title_kannada = :title_kannada, 
                event_date = :event_date, event_time = :event_time,
                location_english = :location_english, location_kannada = :location_kannada, 
                description_english = :description_english, description_kannada = :description_kannada
            WHERE id = :id
        ");
        
        $stmt->execute([
            'id' => $id,
            'title_english' => $input['title'],
            'title_kannada' => $input['title_kn'],
            'event_date' => $input['date'],
            'event_time' => $input['time'] ?? null,
            'location_english' => $input['location'] ?? null,
            'location_kannada' => $input['location_kn'] ?? null,
            'description_english' => $input['description'] ?? null,
            'description_kannada' => $input['description_kn'] ?? null
        ]);
        
        echo json_encode(['success' => true, 'message' => 'Event updated successfully']);
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        // DELETE EVENT
        $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
        if ($id === 0) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Event ID required']);
            exit();
        }
        
        $stmt = $pdo->prepare("DELETE FROM events WHERE id = :id");
        $stmt->execute(['id' => $id]);
        
        echo json_encode(['success' => true, 'message' => 'Event deleted successfully']);
        
    } else {
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    }
    
} catch(PDOException $e) {
    error_log("Admin Events Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Operation failed: ' . $e->getMessage()]);
}
?>
