<?php
/**
 * Database Configuration
 * Update these values with your InterServer cPanel database credentials
 */

// Database Configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'jnanakas_ashrama');
define('DB_USER', 'jnanakas_ashrama');
define('DB_PASS', 'fPHV6zAV4EPYcdE8CCC8');

// Razorpay Configuration
define('RAZORPAY_KEY_ID', 'your_razorpay_key_id'); // Get from razorpay.com
define('RAZORPAY_KEY_SECRET', 'your_razorpay_key_secret'); // Get from razorpay.com

// Email Configuration (for contact form)
// Email Configuration (for contact form)
define('ADMIN_EMAIL', 'info@sriaaroodhatapobhomi.com');
define('SITE_URL', 'https://sriaaroodhatapobhomi.com');
define('SMTP_PASSWORD', 'Aaroodhaashrama@2026'); // UPDATE THIS!

// Security
define('SESSION_TIMEOUT', 3600); // 1 hour in seconds

// CORS Headers (allow React app to access API)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=UTF-8');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

/**
 * Get Database Connection
 */
function getDBConnection() {
    try {
        $conn = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]
        );
        return $conn;
    } catch(PDOException $e) {
        error_log("Database Connection Error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed']);
        exit();
    }
}

/**
 * Send JSON Response
 */
function sendResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit();
}

/**
 * Send Error Response
 */
function sendError($message, $statusCode = 400) {
    http_response_code($statusCode);
    echo json_encode(['error' => $message]);
    exit();
}

/**
 * Validate Required Fields
 */
function validateRequired($data, $fields) {
    foreach ($fields as $field) {
        if (!isset($data[$field]) || empty(trim($data[$field]))) {
            sendError("Field '$field' is required", 400);
        }
    }
}

/**
 * Sanitize Input
 */
function sanitizeInput($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

/**
 * Check Admin Authentication
 */
function checkAdminAuth() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    
    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        sendError('Unauthorized access', 401);
    }
    
    // Check session timeout
    if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > SESSION_TIMEOUT)) {
        session_unset();
        session_destroy();
        sendError('Session expired', 401);
    }
    
    $_SESSION['last_activity'] = time();
}

/**
 * Upload Image
 */
function uploadImage($file, $targetDir = '../uploads/') {
    // Validate file
    if (!isset($file) || $file['error'] !== UPLOAD_ERR_OK) {
        return ['success' => false, 'error' => 'File upload failed'];
    }
    
    // Check file type
    $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    $fileType = mime_content_type($file['tmp_name']);
    
    if (!in_array($fileType, $allowedTypes)) {
        return ['success' => false, 'error' => 'Invalid file type. Only JPG, PNG, and WebP allowed'];
    }
    
    // Check file size (max 5MB)
    if ($file['size'] > 5 * 1024 * 1024) {
        return ['success' => false, 'error' => 'File too large. Maximum 5MB allowed'];
    }
    
    // Generate unique filename
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = uniqid() . '_' . time() . '.' . $extension;
    $targetPath = $targetDir . $filename;
    
    // Create directory if it doesn't exist
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0755, true);
    }
    
    // Move uploaded file
    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        // Return URL path for uploads directory
        return ['success' => true, 'url' => '/uploads/' . $filename];
    } else {
        return ['success' => false, 'error' => 'Failed to save file'];
    }
}
?>
