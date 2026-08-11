<?php
/**
 * Database Connection for Admin Panel
 * Place this file in: C:\xampp\htdocs\ashrama-api\admin\db_connect.php
 */

$host = 'localhost';
$dbname = 'jnanakas_ashrama';
$username = 'jnanakas_ashrama';
$password = 'fPHV6zAV4EPYcdE8CCC8';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    http_response_code(500);
    // Return JSON error so APIs don't break, HTML pages will just show the JSON string
    // Return JSON error so APIs don't break, HTML pages will just show the JSON string
    die(json_encode(['success' => false, 'error' => "Database connection failed: " . $e->getMessage()]));
}
