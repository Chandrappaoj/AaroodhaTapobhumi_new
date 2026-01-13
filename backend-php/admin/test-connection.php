<?php
// MySQL Connection Test
echo "<h2>MySQL Connection Test</h2>";

$host = 'localhost';
$dbname = 'ashrama_db';
$username = 'root';
$password = '';

echo "<p><strong>Testing connection to:</strong></p>";
echo "<ul>";
echo "<li>Host: $host</li>";
echo "<li>Database: $dbname</li>";
echo "<li>Username: $username</li>";
echo "<li>Password: " . (empty($password) ? '(empty)' : '(set)') . "</li>";
echo "</ul>";

try {
    // Try with localhost
    echo "<p>Attempting connection with 'localhost'...</p>";
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "<p style='color: green;'><strong>✅ SUCCESS!</strong> Connected to MySQL successfully!</p>";
    
    // Test query
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM admin_users");
    $result = $stmt->fetch();
    echo "<p>Admin users count: " . $result['count'] . "</p>";
    
} catch(PDOException $e) {
    echo "<p style='color: red;'><strong>❌ FAILED with localhost</strong></p>";
    echo "<p>Error: " . $e->getMessage() . "</p>";
    
    // Try with 127.0.0.1
    try {
        echo "<p>Attempting connection with '127.0.0.1'...</p>";
        $pdo = new PDO("mysql:host=127.0.0.1;dbname=$dbname;charset=utf8mb4", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "<p style='color: green;'><strong>✅ SUCCESS!</strong> Connected with 127.0.0.1!</p>";
        echo "<p><strong>Solution:</strong> Change 'localhost' to '127.0.0.1' in db_connect.php</p>";
    } catch(PDOException $e2) {
        echo "<p style='color: red;'><strong>❌ FAILED with 127.0.0.1 too</strong></p>";
        echo "<p>Error: " . $e2->getMessage() . "</p>";
        
        // Check if MySQL is running
        echo "<hr>";
        echo "<h3>Troubleshooting:</h3>";
        echo "<ol>";
        echo "<li>Check if MySQL is running in XAMPP Control Panel</li>";
        echo "<li>Check if port 3306 is being used by MySQL</li>";
        echo "<li>Try restarting MySQL in XAMPP</li>";
        echo "</ol>";
    }
}
?>
