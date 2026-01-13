<?php
/**
 * Create Razorpay Order
 * POST /api/payment/create-order.php
 */

require_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed', 405);
}

try {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    validateRequired($input, ['amount']);
    
    $amount = floatval($input['amount']);
    
    if ($amount < 1) {
        sendError('Invalid amount', 400);
    }
    
    // Create Razorpay order
    $orderData = [
        'receipt' => 'rcpt_' . time(),
        'amount' => $amount * 100, // Convert to paise
        'currency' => 'INR',
        'notes' => [
            'donor_name' => isset($input['donor_name']) ? $input['donor_name'] : '',
            'donor_email' => isset($input['donor_email']) ? $input['donor_email'] : ''
        ]
    ];
    
    // Call Razorpay API
    $ch = curl_init('https://api.razorpay.com/v1/orders');
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($orderData));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
    ]);
    curl_setopt($ch, CURLOPT_USERPWD, RAZORPAY_KEY_ID . ':' . RAZORPAY_KEY_SECRET);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200) {
        error_log("Razorpay Order Creation Failed: " . $response);
        sendError('Failed to create payment order', 500);
    }
    
    $order = json_decode($response, true);
    
    // Save to database
    $conn = getDBConnection();
    $stmt = $conn->prepare("
        INSERT INTO donations (razorpay_order_id, amount, donor_name, donor_email, donor_phone, status)
        VALUES (:order_id, :amount, :name, :email, :phone, 'pending')
    ");
    
    $stmt->execute([
        'order_id' => $order['id'],
        'amount' => $amount,
        'name' => isset($input['donor_name']) ? sanitizeInput($input['donor_name']) : null,
        'email' => isset($input['donor_email']) ? sanitizeInput($input['donor_email']) : null,
        'phone' => isset($input['donor_phone']) ? sanitizeInput($input['donor_phone']) : null
    ]);
    
    sendResponse([
        'order_id' => $order['id'],
        'amount' => $amount,
        'currency' => 'INR',
        'key_id' => RAZORPAY_KEY_ID
    ]);
    
} catch(Exception $e) {
    error_log("Payment Order Error: " . $e->getMessage());
    sendError('Failed to create payment order', 500);
}
?>
