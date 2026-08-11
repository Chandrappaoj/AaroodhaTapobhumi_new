<?php
/**
 * Admin Donation Settings API
 * POST /api/admin/donation-settings.php
 */

session_start();
ini_set('display_errors', 0);
error_reporting(E_ALL);
ob_start();
header('Content-Type: application/json');

require_once __DIR__ . '/../../admin/db_connect.php';

// Check auth
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Unauthorized']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = $_POST;
    
    // Ensure 1 row exists
    $stmt = $pdo->query("SELECT id FROM donation_settings LIMIT 1");
    $row = $stmt->fetch();
    $id = $row ? $row['id'] : 0;
    
    $qrUrl = null;
    if (isset($_FILES['qr_code']) && $_FILES['qr_code']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['qr_code'];
        $allowed = ['image/jpeg', 'image/png', 'image/webp'];
        if (in_array($file['type'], $allowed)) {
            $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
            $filename = 'qr_' . time() . '.' . $ext;
            $dir = $_SERVER['DOCUMENT_ROOT'] . '/ashrama-api/uploads/donation/';
            if (!is_dir($dir)) mkdir($dir, 0755, true);
            
            if (move_uploaded_file($file['tmp_name'], $dir . $filename)) {
                $qrUrl = '/ashrama-api/uploads/donation/' . $filename;
            }
        }
    }

    if ($id > 0) {
        $sql = "UPDATE donation_settings SET 
                account_name = :account_name, 
                account_number = :account_number, 
                ifsc_code = :ifsc_code, 
                bank_name = :bank_name, 
                upi_id = :upi_id";
        
        $params = [
            'id' => $id,
            'account_name' => $input['account_name'],
            'account_number' => $input['account_number'],
            'ifsc_code' => $input['ifsc_code'],
            'bank_name' => $input['bank_name'],
            'upi_id' => $input['upi_id']
        ];
        
        if ($qrUrl) {
            $sql .= ", qr_code = :qr_code";
            $params['qr_code'] = $qrUrl;
        }
        
        $sql .= " WHERE id = :id";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        
        echo json_encode(['success' => true, 'qr_code_url' => $qrUrl]);
    } else {
        $stmt = $pdo->prepare("
            INSERT INTO donation_settings (account_name, account_number, ifsc_code, bank_name, upi_id, qr_code)
            VALUES (:account_name, :account_number, :ifsc_code, :bank_name, :upi_id, :qr_code)
        ");
        $stmt->execute([
            'account_name' => $input['account_name'],
            'account_number' => $input['account_number'],
            'ifsc_code' => $input['ifsc_code'],
            'bank_name' => $input['bank_name'],
            'upi_id' => $input['upi_id'],
            'qr_code' => $qrUrl ?? ''
        ]);
        echo json_encode(['success' => true, 'qr_code_url' => $qrUrl]);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
}
if (ob_get_length()) ob_end_flush();
?>
