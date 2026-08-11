<?php
/**
 * Public Donation Settings API
 * GET /api/donation-settings.php
 */

require_once 'config.php';

try {
    $pdo = getDBConnection();
    
    $stmt = $pdo->query("SELECT account_name, account_number, ifsc_code, bank_name, upi_id, qr_code FROM donation_settings ORDER BY id ASC LIMIT 1");
    $settings = $stmt->fetch();
    
    if ($settings) {
        // Convert to camelCase to match React frontend interface expectations
        sendResponse([
            'accountName' => $settings['account_name'],
            'accountNumber' => $settings['account_number'],
            'ifscCode' => $settings['ifsc_code'],
            'bankName' => $settings['bank_name'],
            'upiId' => $settings['upi_id'],
            'qrCode' => $settings['qr_code']
        ]);
    } else {
        sendResponse([
            'accountName' => '',
            'accountNumber' => '',
            'ifscCode' => '',
            'bankName' => '',
            'upiId' => '',
            'qrCode' => ''
        ]);
    }
    
} catch(PDOException $e) {
    error_log("Donation Settings API Error: " . $e->getMessage());
    sendError('Failed to fetch data', 500);
}
?>
