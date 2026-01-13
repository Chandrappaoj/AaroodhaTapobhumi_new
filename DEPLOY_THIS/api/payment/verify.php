<?php
/**
 * Verify Razorpay Payment
 * POST /api/payment/verify.php
 */

require_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed', 405);
}

try {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    validateRequired($input, ['razorpay_order_id', 'razorpay_payment_id', 'razorpay_signature']);
    
    $orderId = $input['razorpay_order_id'];
    $paymentId = $input['razorpay_payment_id'];
    $signature = $input['razorpay_signature'];
    
    // Verify signature
    $generatedSignature = hash_hmac('sha256', $orderId . '|' . $paymentId, RAZORPAY_KEY_SECRET);
    
    if ($generatedSignature !== $signature) {
        error_log("Payment Signature Mismatch: Order $orderId");
        sendError('Payment verification failed', 400);
    }
    
    // Update database
    $conn = getDBConnection();
    $stmt = $conn->prepare("
        UPDATE donations
        SET razorpay_payment_id = :payment_id, status = 'success'
        WHERE razorpay_order_id = :order_id
    ");
    
    $stmt->execute([
        'payment_id' => $paymentId,
        'order_id' => $orderId
    ]);
    
    // Get donation details for email
    $stmt = $conn->prepare("
        SELECT amount, donor_name, donor_email
        FROM donations
        WHERE razorpay_order_id = :order_id
    ");
    $stmt->execute(['order_id' => $orderId]);
    $donation = $stmt->fetch();
    
    // Send confirmation email
    if ($donation && $donation['donor_email']) {
        $emailBody = "Dear " . $donation['donor_name'] . ",\n\n";
        $emailBody .= "Thank you for your generous donation of ₹" . number_format($donation['amount'], 2) . " to Sri Siddaroodha Swamiji Ashrama.\n\n";
        $emailBody .= "Your contribution will help us continue our sacred mission of service and spiritual upliftment.\n\n";
        $emailBody .= "Payment ID: $paymentId\n";
        $emailBody .= "Order ID: $orderId\n\n";
        $emailBody .= "May Sri Siddaroodha Swamiji's blessings be with you.\n\n";
        $emailBody .= "With gratitude,\nSri Siddaroodha Swamiji Ashrama";
        
        $headers = "From: " . ADMIN_EMAIL . "\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        
        mail($donation['donor_email'], "Donation Confirmation - Sri Siddaroodha Ashrama", $emailBody, $headers);
    }
    
    sendResponse([
        'success' => true,
        'message' => 'Payment verified successfully',
        'payment_id' => $paymentId
    ]);
    
} catch(PDOException $e) {
    error_log("Payment Verification Error: " . $e->getMessage());
    sendError('Failed to verify payment', 500);
}
?>
