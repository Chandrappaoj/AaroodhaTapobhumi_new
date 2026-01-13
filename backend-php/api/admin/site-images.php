<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
require_once '../config.php';

// Session-based authentication check
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    sendError('Unauthorized access', 401);
}

// Initialize DB connection
$pdo = getDBConnection();

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

// Helper for consistency with frontend expectations
function sendJsonResponse($success, $message, $data = null) {
    $response = ['success' => $success, 'message' => $message];
    if ($data !== null) {
        $response['data'] = $data;
    }
    // Use config.php's sendResponse/sendError underlying logic roughly
    // But since sendResponse exits, we just use it.
    if ($success) {
        sendResponse($response);
    } else {
        // If it's an error but we want to return JSON with success: false (as frontend expects success check),
        // we should probably use 200 OK or 400 Bad Request depending on logic.
        // Frontend checks result.success.
        // Let's use 200 for logic errors so JS can parse it, or 400.
        // Frontend: if (result.success) ... else showMessage('Failed...', 'error');
        // So 200 is safest to ensure parsing.
        http_response_code(200); 
        echo json_encode($response);
        exit();
    }
}

try {
    switch ($method) {
        case 'GET':
            // Fetch all site images or specific section
            if (isset($_GET['section'])) {
                $section = sanitizeInput($_GET['section']);
                $stmt = $pdo->prepare("SELECT * FROM site_images WHERE section = ?");
                $stmt->execute([$section]);
                $image = $stmt->fetch(PDO::FETCH_ASSOC);
                sendJsonResponse(true, 'Site image fetched successfully', $image);
            } else {
                $stmt = $pdo->query("SELECT * FROM site_images ORDER BY section ASC");
                $images = $stmt->fetchAll(PDO::FETCH_ASSOC);
                // Wrap in object if needed? No, frontend expects array or object?
                // Frontend: setImages(imagesData.images || []) ? this is Gallery.tsx
                // Admin site-images.php frontend:
                // It iterates over $siteImages (PHP rendered).
                // But update calls fetch APIs.
                // It doesn't use GET API for page load.
                // So GET is for other consumers possibly.
                sendJsonResponse(true, 'Site images fetched successfully', $images);
            }
            break;
            
        case 'POST':
            // Update or create site image entry
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($data['id']) || !isset($data['section']) || !isset($data['alt_text'])) {
                sendJsonResponse(false, 'Missing required fields');
            }
            
            $id = (int)$data['id'];
            $section = sanitizeInput($data['section']);
            $altText = sanitizeInput($data['alt_text']);
            $imageUrl = isset($data['image_url']) ? sanitizeInput($data['image_url']) : null;
            $mobileImageUrl = isset($data['mobile_image_url']) ? sanitizeInput($data['mobile_image_url']) : null;
            
            // Build update query dynamically based on provided fields
            $updateFields = ['alt_text = ?'];
            $params = [$altText];
            
            if ($imageUrl !== null) {
                $updateFields[] = 'image_url = ?';
                $params[] = $imageUrl;
            }
            
            if ($mobileImageUrl !== null) {
                $updateFields[] = 'mobile_image_url = ?';
                $params[] = $mobileImageUrl;
            }
            
            $params[] = $id;
            
            $sql = "UPDATE site_images SET " . implode(', ', $updateFields) . " WHERE id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            
            sendJsonResponse(true, 'Site image updated successfully');
            break;
            
        case 'DELETE':
            // Remove custom image (revert to default)
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($data['id'])) {
                sendJsonResponse(false, 'Missing image ID');
            }
            
            $id = (int)$data['id'];
            
            // Get current image URLs to delete files
            $stmt = $pdo->prepare("SELECT image_url, mobile_image_url FROM site_images WHERE id = ?");
            $stmt->execute([$id]);
            $image = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($image) {
                // Delete image files if they exist
                if ($image['image_url']) {
                    $filePath = __DIR__ . '/../../' . str_replace('/ashrama-api/', '', $image['image_url']);
                    if (file_exists($filePath)) {
                        unlink($filePath);
                    }
                }
                
                if ($image['mobile_image_url']) {
                    $filePath = __DIR__ . '/../../' . str_replace('/ashrama-api/', '', $image['mobile_image_url']);
                    if (file_exists($filePath)) {
                        unlink($filePath);
                    }
                }
                
                // Set image URLs to NULL (revert to default)
                $stmt = $pdo->prepare("UPDATE site_images SET image_url = NULL, mobile_image_url = NULL WHERE id = ?");
                $stmt->execute([$id]);
                
                sendJsonResponse(true, 'Image removed successfully');
            } else {
                sendJsonResponse(false, 'Image not found');
            }
            break;
            
        default:
            sendJsonResponse(false, 'Method not allowed');
    }
} catch (PDOException $e) {
    sendJsonResponse(false, 'Database error: ' . $e->getMessage());
}
?>
