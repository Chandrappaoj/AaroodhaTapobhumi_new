<?php
session_start();

// Check if user is logged in
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: index.php');
    exit();
}

$username = $_SESSION['admin_username'] ?? 'Admin';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Sri Aaroodha Tapobhumi</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+Kannada:wght@400;600;700&family=Noto+Sans+Kannada:wght@400;500;600&family=Lexend:wght@400;500;600;700&family=Outfit:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="../assets/favicon.ico">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Outfit', sans-serif;
            background: #F5E6D3;
            min-height: 100vh;
        }
        
        /* Header Styles */
        .admin-header {
            background: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        .header-content {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
        }
        
        .logo-section {
            display: flex;
            align-items: center;
            gap: 16px;
        }
        
        .admin-logo {
            width: 112px;
            height: 112px;
        }
        
        .title-section {
            display: flex;
            flex-direction: column;
        }
        
        .title-kannada {
            font-family: 'Noto Serif Kannada', serif;
            font-size: 22px;
            font-weight: 700;
            color: #5D4037;
            line-height: 1.2;
        }
        
        .title-english {
            font-family: 'Lexend', sans-serif;
            font-size: 14px;
            font-weight: 600;
            color: #FF9933;
            margin-top: 2px;
        }
        
        .subtitle {
            font-family: 'Outfit', sans-serif;
            font-size: 12px;
            color: #8D6E63;
            margin-top: 4px;
        }
        
        .user-actions {
            display: flex;
            align-items: center;
            gap: 20px;
        }
        
        .welcome-text {
            font-family: 'Outfit', sans-serif;
            color: #5D4037;
            font-weight: 500;
            font-size: 14px;
        }
        
        .btn-logout {
            background: #FF9933;
            color: white;
            border: none;
            padding: 10px 24px;
            border-radius: 50px;
            cursor: pointer;
            text-decoration: none;
            font-family: 'Lexend', sans-serif;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.3s ease;
            display: inline-block;
        }
        
        .btn-logout:hover {
            background: #CC6600;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(255, 153, 51, 0.3);
        }
        
        /* Container */
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 40px 30px;
        }
        
        /* Welcome Card */
        .welcome-card {
            background: white;
            border-radius: 20px;
            padding: 32px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.06);
            margin-bottom: 40px;
        }
        
        .welcome-card h2 {
            font-family: 'Lexend', sans-serif;
            color: #5D4037;
            font-size: 28px;
            margin-bottom: 12px;
        }
        
        .welcome-card p {
            font-family: 'Outfit', sans-serif;
            color: #8D6E63;
            line-height: 1.6;
            font-size: 15px;
        }
        
        /* Dashboard Grid */
        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 24px;
        }
        
        /* Card Styles */
        .admin-card {
            background: white;
            border-radius: 20px;
            padding: 28px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.06);
            transition: all 0.3s ease;
            text-decoration: none;
            color: inherit;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            cursor: pointer;
        }
        
        .admin-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 40px rgba(0,0,0,0.12);
        }
        
        .card-icon {
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, #FF9933 0%, #FFB366 100%);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            font-size: 32px;
        }
        
        .card-title {
            font-family: 'Lexend', sans-serif;
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 12px;
            color: #5D4037;
        }
        
        .card-description {
            font-family: 'Outfit', sans-serif;
            color: #8D6E63;
            line-height: 1.6;
            font-size: 14px;
            flex-grow: 1;
        }
        
        .card-action {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #F5E6D3;
        }
        
        .action-link {
            font-family: 'Outfit', sans-serif;
            color: #FF9933;
            font-weight: 600;
            font-size: 14px;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }
        
        .action-link:after {
            content: '→';
            transition: transform 0.3s ease;
        }
        
        .admin-card:hover .action-link:after {
            transform: translateX(4px);
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .header-content {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .user-actions {
                width: 100%;
                justify-content: space-between;
            }
            
            .dashboard-grid {
                grid-template-columns: 1fr;
            }
            
            .admin-logo {
                width: 56px;
                height: 56px;
            }
            
            .title-kannada {
                font-size: 18px;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="admin-header">
        <div class="header-content">
            <div class="logo-section">
                <img src="../assets/ashrama-logo.png" alt="Sri Aaroodha Tapobhumi Logo" class="admin-logo">
                <div class="title-section">
                    <h1 class="title-kannada">ಶ್ರೀ ಆರೂಢ ತಪೋಭೂಮಿ</h1>
                    <p class="title-english">Sri Aaroodha Tapobhumi</p>
                    <p class="subtitle">Admin Panel | ನಿರ್ವಹಣಾ ಫಲಕ</p>
                </div>
            </div>
            <div class="user-actions">
                <span class="welcome-text">Welcome, <?php echo htmlspecialchars($username); ?></span>
                <a href="logout.php" class="btn-logout">Logout</a>
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <div class="container">
        <!-- Welcome Card -->
        <div class="welcome-card">
            <h2>Dashboard</h2>
            <p>Manage your website content, events, trustees, and gallery from this central dashboard.</p>
        </div>

        <!-- Dashboard Grid -->
        <div class="dashboard-grid">
            <!-- Manage Events -->
            <a href="events.php" class="admin-card">
                <div class="card-icon">📅</div>
                <h3 class="card-title">Manage Events</h3>
                <p class="card-description">Add, edit, or delete upcoming and past events. Keep your devotees informed about celebrations and programs.</p>
                <div class="card-action">
                    <span class="action-link">View All Events</span>
                </div>
            </a>

            <!-- Manage Trustees -->
            <a href="trustees.php" class="admin-card">
                <div class="card-icon">👥</div>
                <h3 class="card-title">Manage Trustees</h3>
                <p class="card-description">Update trustee information, add new members, and manage the trust board details.</p>
                <div class="card-action">
                    <span class="action-link">View All Trustees</span>
                </div>
            </a>

            <!-- Manage Gallery -->
            <a href="gallery.php" class="admin-card">
                <div class="card-icon">🖼️</div>
                <h3 class="card-title">Manage Gallery</h3>
                <p class="card-description">Upload new images, organize photos by category, and manage the ashrama's photo gallery.</p>
                <div class="card-action">
                    <span class="action-link">Upload Images</span>
                </div>
            </a>

            <!-- Manage Videos -->
            <a href="videos.php" class="admin-card">
                <div class="card-icon">🎬</div>
                <h3 class="card-title">Manage Videos</h3>
                <p class="card-description">Add video URLs from YouTube, Vimeo, or direct links. Manage video gallery without uploading large files.</p>
                <div class="card-action">
                    <span class="action-link">Add Videos</span>
                </div>
            </a>

            <!-- Manage Site Images -->
            <a href="site-images.php" class="admin-card">
                <div class="card-icon">🎨</div>
                <h3 class="card-title">Manage Site Images</h3>
                <p class="card-description">Update website images dynamically - hero backgrounds, banners, and section images across all pages.</p>
                <div class="card-action">
                    <span class="action-link">Update Images</span>
                </div>
            </a>

            <!-- View Donations -->
            <a href="donations.php" class="admin-card">
                <div class="card-icon">💰</div>
                <h3 class="card-title">View Donations</h3>
                <p class="card-description">Track all donations received through the website. View donor details and payment records.</p>
                <div class="card-action">
                    <span class="action-link">View Records</span>
                </div>
            </a>

            <!-- Contact Submissions -->
            <a href="contacts.php" class="admin-card">
                <div class="card-icon">📧</div>
                <h3 class="card-title">Contact Submissions</h3>
                <p class="card-description">View and respond to messages submitted through the contact form.</p>
                <div class="card-action">
                    <span class="action-link">View Messages</span>
                </div>
            </a>

            <!-- View Website -->
            <a href="../" class="admin-card" target="_blank">
                <div class="card-icon">🌐</div>
                <h3 class="card-title">View Website</h3>
                <p class="card-description">Open the public website in a new tab to see how your changes appear to visitors.</p>
                <div class="card-action">
                    <span class="action-link">Open Site</span>
                </div>
            </a>
        </div>
    </div>
</body>
</html>
