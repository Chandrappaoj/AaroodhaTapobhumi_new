<?php
/**
 * Contact Form API
 * POST /api/contact.php
 */

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed', 405);
}

try {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    validateRequired($input, ['name', 'email', 'message']);
    
    // Sanitize inputs
    $name = sanitizeInput($input['name']);
    $email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
    $phone = isset($input['phone']) ? sanitizeInput($input['phone']) : null;
    $subject = isset($input['subject']) ? sanitizeInput($input['subject']) : 'Contact Form Submission';
    $message = sanitizeInput($input['message']);
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendError('Invalid email address', 400);
    }
    
    $conn = getDBConnection();
    
    // Save to database
    $stmt = $conn->prepare("
        INSERT INTO contact_submissions (name, email, phone, subject, message)
        VALUES (:name, :email, :phone, :subject, :message)
    ");
    
    $stmt->execute([
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'subject' => $subject,
        'message' => $message
    ]);
    
    // Send email notification
    $emailBody = "New Contact Form Submission\n\n";
    $emailBody .= "Name: $name\n";
    $emailBody .= "Email: $email\n";
    $emailBody .= "Phone: $phone\n";
    $emailBody .= "Subject: $subject\n\n";
    $emailBody .= "Message:\n$message\n";
    
    $headers = "From: noreply@" . $_SERVER['HTTP_HOST'] . "\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    mail(ADMIN_EMAIL, "Contact Form: $subject", $emailBody, $headers);
    
    sendResponse([
        'success' => true,
        'message' => 'Thank you for contacting us. We will respond soon.'
    ]);
    
} catch(PDOException $e) {
    error_log("Contact Form Error: " . $e->getMessage());
    sendError('Failed to submit contact form', 500);
}
?>
