<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: index.php');
    exit();
}

require_once 'db_connect.php';
$stmt = $pdo->query("SELECT * FROM site_images ORDER BY id DESC");
$images = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Site Images - ಸೈಟ್ ಚಿತ್ರಗಳು | Sri Aaroodha Tapobhumi Admin</title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+Kannada:wght@400;600;700&family=Noto+Sans+Kannada:wght@400;500;600&family=Lexend:wght@400;500;600;700&family=Outfit:wght@400;500;600&display=swap" rel="stylesheet">
    
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Outfit', sans-serif; background: #F5E6D3; min-height: 100vh; }
        
        /* Admin Header */
        .admin-header { background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.08); position: sticky; top: 0; z-index: 100; }
        .header-content { max-width: 1400px; margin: 0 auto; padding: 16px 30px; display: flex; justify-content: space-between; align-items: center; }
        .logo-section { display: flex; align-items: center; gap: 12px; }
        .admin-logo { width: 56px; height: 56px; object-fit: contain; }
        .title-section { display: flex; flex-direction: column; }
        .title-kannada { font-family: 'Noto Serif Kannada', serif; font-size: 20px; font-weight: 700; color: #5D4037; line-height: 1.2; }
        .title-english { font-family: 'Lexend', sans-serif; font-size: 13px; font-weight: 600; color: #FF9933; line-height: 1.3; }
        .subtitle { font-family: 'Outfit', sans-serif; font-size: 11px; color: #8D6E63; margin-top: 2px; }
        .btn-back { background: #8D6E63; color: white; padding: 8px 20px; border-radius: 50px; text-decoration: none; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 500; transition: all 0.3s ease; }
        .btn-back:hover { background: #5D4037; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(93, 64, 55, 0.3); }
        
        /* Container */
        .container { max-width: 1400px; margin: 30px auto; padding: 0 30px; }
        .page-title { font-family: 'Lexend', sans-serif; font-size: 24px; font-weight: 700; color: #5D4037; margin-bottom: 8px; }
        .page-subtitle { font-family: 'Noto Sans Kannada', sans-serif; font-size: 16px; color: #8D6E63; margin-bottom: 24px; }
        
        /* Info Box */
        .info-box { background: white; padding: 20px; border-radius: 16px; margin-bottom: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); border-left: 4px solid #FF9933; }
        .info-box p { color: #5D4037; line-height: 1.6; }
        
        /* Image Grid */
        .image-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
        .image-card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.08); transition: all 0.3s ease; }
        .image-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
        .image-preview { width: 100%; height: 200px; object-fit: cover; background: #f0f0f0; }
        .image-info { padding: 16px; }
        .image-label { font-family: 'Lexend', sans-serif; font-weight: 600; color: #5D4037; font-size: 15px; margin-bottom: 8px; }
        .image-key { font-family: 'Outfit', sans-serif; font-size: 12px; color: #8D6E63; background: #FFF8F0; padding: 4px 8px; border-radius: 6px; display: inline-block; }
        .btn { background: #FF9933; color: white; border: none; padding: 8px 16px; border-radius: 20px; cursor: pointer; font-size: 12px; font-weight: 600; font-family: 'Lexend', sans-serif; transition: all 0.3s ease; margin-top: 12px; }
        .btn:hover { background: #CC6600; transform: translateY(-2px); }
        
        /* Responsive */
        @media (max-width: 768px) {
            .header-content { flex-direction: column; gap: 16px; text-align: center; }
            .logo-section { flex-direction: column; }
            .image-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <!-- Admin Header -->
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
            <div class="header-actions">
                <a href="dashboard.php" class="btn-back">← Back to Dashboard</a>
            </div>
        </div>
    </div>

    <div class="container">
        <h2 class="page-title">Site Images Management</h2>
        <p class="page-subtitle">ಸೈಟ್ ಚಿತ್ರಗಳ ನಿರ್ವಹಣೆ</p>

        <div class="info-box">
            <p><strong>ℹ️ About Site Images:</strong> These are dynamic images used across the website (hero banners, section backgrounds, etc.). Each image has a unique key that identifies where it's used on the site.</p>
        </div>

        <div class="image-grid">
            <?php foreach ($images as $image): ?>
            <div class="image-card">
                <img src="<?php echo htmlspecialchars($image['image_url']); ?>" alt="<?php echo htmlspecialchars($image['image_key']); ?>" class="image-preview">
                <div class="image-info">
                    <div class="image-label"><?php echo ucwords(str_replace('_', ' ', $image['image_key'])); ?></div>
                    <div class="image-key">Key: <?php echo htmlspecialchars($image['image_key']); ?></div>
                    <button class="btn" onclick="updateImage('<?php echo $image['image_key']; ?>')">Update Image</button>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>

    <script>
        function updateImage(key) {
            alert('Update functionality for: ' + key + '\nTo be implemented with file upload modal');
        }
    </script>
</body>
</html>
