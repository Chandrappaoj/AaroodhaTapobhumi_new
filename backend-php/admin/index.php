<?php
session_start();

// If already logged in, redirect to dashboard
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header('Location: dashboard.php');
    exit();
}

// Handle login form submission
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    // Database connection
    $host = 'localhost';
    $dbname = 'ashrama_db';
    $db_username = 'root';
    $db_password = '';
    
    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $db_username, $db_password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Query user
        $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE username = :username LIMIT 1");
        $stmt->execute(['username' => $username]);
        $user = $stmt->fetch();
        
        if ($user) {
            // Check if password is hashed or plain text
            if (password_verify($password, $user['password']) || $password === $user['password']) {
                // Login successful
                $_SESSION['admin_logged_in'] = true;
                $_SESSION['admin_id'] = $user['id'];
                $_SESSION['admin_username'] = $user['username'];
                header('Location: dashboard.php');
                exit();
            } else {
                $error = 'Invalid username or password';
            }
        } else {
            $error = 'Invalid username or password';
        }
    } catch(PDOException $e) {
        $error = 'Database error: ' . $e->getMessage();
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - Sri Aaroodha Tapobhumi</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+Kannada:wght@400;600;700&family=Noto+Sans+Kannada:wght@400;500;600&family=Lexend:wght@400;500;600;700&family=Outfit:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Outfit', sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(to bottom right, #E8E8E8, #D0D0D0);
            padding: 32px;
        }
        
        .login-card {
            display: flex;
            max-width: 900px;
            width: 100%;
            height: 500px;
            background: white;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
        }
        
        .login-left {
            flex: 0 0 35%;
            background: url('../assets/Admin_Side-Image.png');
            background-size: cover;
            background-position: center;
            position: relative;
        }
        
        .login-left::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom right, rgba(255, 153, 51, 0.05), transparent);
        }
        
        .login-right {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 32px;
            background: linear-gradient(to bottom, rgba(255, 153, 51, 0.05), rgba(255, 153, 51, 0.1));
        }
        
        .form-card {
            width: 100%;
            max-width: 320px;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 32px 28px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .form-header {
            text-align: center;
            margin-bottom: 24px;
        }
        
        .logo {
            width: 60px;
            height: 60px;
            margin: 0 auto 16px;
        }
        
        .welcome-title {
            font-family: 'Lexend', sans-serif;
            font-size: 20px;
            font-weight: 700;
            color: #5D4037;
            margin-bottom: 4px;
        }
        
        .welcome-subtitle {
            font-family: 'Outfit', sans-serif;
            font-size: 11px;
            color: #8D6E63;
            line-height: 1.4;
        }
        
        .login-form {
            margin-top: 20px;
        }
        
        .form-group {
            margin-bottom: 16px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 6px;
            font-family: 'Outfit', sans-serif;
            font-weight: 700;
            color: #1a1a1a;
            font-size: 11px;
        }
        
        .form-group input {
            width: 100%;
            padding: 11px 16px;
            border: 1px solid #FF9933;
            border-radius: 22px;
            font-size: 13px;
            font-family: 'Outfit', sans-serif;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.6);
        }
        
        .form-group input:focus {
            outline: none;
            border-color: #FF9933;
            background: white;
            box-shadow: 0 0 0 2px rgba(255, 153, 51, 0.2);
        }
        
        .submit-btn {
            width: 100%;
            padding: 13px;
            background: #FF9933;
            color: white;
            border: none;
            border-radius: 22px;
            font-size: 14px;
            font-weight: 600;
            font-family: 'Lexend', sans-serif;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 16px;
        }
        
        .submit-btn:hover {
            background: #CC6600;
            transform: translateY(-2px);
            box-shadow: 0 12px 24px rgba(255, 153, 51, 0.3);
        }
        
        .error {
            background: #FFEBEE;
            color: #C62828;
            padding: 10px 14px;
            border-radius: 12px;
            margin-bottom: 16px;
            font-size: 12px;
            border-left: 3px solid #C62828;
        }
        
        .form-footer {
            margin-top: 20px;
            text-align: center;
            font-size: 11px;
            color: #8D6E63;
        }
        
        @media (max-width: 968px) {
            body {
                padding: 20px;
            }
            
            .login-card {
                flex-direction: column;
                max-width: 400px;
                height: auto;
            }
            
            .login-left {
                flex: 0 0 auto;
                min-height: 250px;
            }
            
            .login-right {
                padding: 32px 24px;
            }
            
            .form-card {
                max-width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="login-card">
        <div class="login-left"></div>
        
        <div class="login-right">
            <div class="form-card">
                <div class="form-header">
                    <img src="../assets/ashrama-logo.png" alt="Sri Aaroodha Tapobhumi Logo" class="logo">
                    <h1 class="welcome-title">Welcome to Admin Panel</h1>
                    <p class="welcome-subtitle">Sign in to your Admin Dashboard account</p>
                </div>
                
                <?php if ($error): ?>
                    <div class="error"><?php echo htmlspecialchars($error); ?></div>
                <?php endif; ?>
                
                <form method="POST" class="login-form">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            placeholder="Enter your username"
                            required 
                            autocomplete="username"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Enter your password"
                            required 
                            autocomplete="current-password"
                        >
                    </div>
                    
                    <button type="submit" class="submit-btn">Sign In</button>
                </form>
                
                <div class="form-footer">
                    <p>ಓಂ ನಮಃ ಶಿವಾಯ | Om Namah Shivaya</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
