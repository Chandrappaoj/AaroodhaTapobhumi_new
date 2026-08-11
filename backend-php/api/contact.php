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
    
    // Send email notification via SMTP
    require_once 'SimpleSMTP.php';
    
    // SMTP Configuration from config.php or hardcoded here if preferred
    // Ideally these should be in config.php, but for now we use the ones provided
    $smtp_host = 'mail.sriaaroodhatapobhomi.com';
    $smtp_port = 587;
    $smtp_user = 'info@sriaaroodhatapobhomi.com';
    $smtp_pass = SMTP_PASSWORD; // Defined in config.php
    
    $smtp = new SimpleSMTP($smtp_host, $smtp_port, $smtp_user, $smtp_pass);
    
    $emailSubject = "Contact Form: $subject";
    $emailBody = "New Contact Form Submission\r\n\r\n";
    $emailBody .= "Name: $name\r\n";
    $emailBody .= "Email: $email\r\n";
    $emailBody .= "Phone: $phone\r\n";
    $emailBody .= "Subject: $subject\r\n\r\n";
    $emailBody .= "Message:\r\n$message\r\n";
    
    $headers = [
        'Reply-To' => $email,
        'Content-Type' => 'text/plain; charset=UTF-8'
    ];
    
    if ($smtp->send(ADMIN_EMAIL, $emailSubject, $emailBody, $headers)) {
        sendResponse([
            'success' => true,
            'message' => 'Thank you for contacting us. We will respond soon.'
        ]);
    } else {
        throw new Exception("Failed to send email via SMTP");
    }
    
} catch(Exception $e) {
    error_log("Contact Form Error: " . $e->getMessage());
    // Still return success to user if DB save worked, but log error? 
    // Or return error. Let's return error for now so they know.
    sendError('Failed to submit contact form (Email Error). Please try again.', 500);
}
?>
