<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: index.php');
    exit();
}

require_once 'db_connect.php';
$stmt = $pdo->query("SELECT * FROM gallery ORDER BY id DESC");
$images = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Gallery - ಗ್ಯಾಲರಿ | Sri Aaroodha Tapobhumi Admin</title>
    
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
        
        /* Buttons */
        .btn { background: #FF9933; color: white; border: none; padding: 12px 28px; border-radius: 50px; cursor: pointer; font-size: 14px; font-weight: 600; font-family: 'Lexend', sans-serif; transition: all 0.3s ease; }
        .btn:hover { background: #CC6600; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255, 153, 51, 0.4); }
        
        /* Gallery Grid */
        .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }
        .gallery-item { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.08); transition: all 0.3s ease; }
        .gallery-item:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
        .gallery-item img { width: 100%; height: 220px; object-fit: cover; }
        .gallery-info { padding: 16px; }
        .gallery-info strong { font-family: 'Lexend', sans-serif; color: #5D4037; font-size: 15px; }
        .kannada-text { font-family: 'Noto Sans Kannada', sans-serif; color: #8D6E63; font-size: 13px; display: block; margin-top: 4px; }
        .category-badge { display: inline-block; padding: 4px 12px; background: #FFF8F0; color: #FF9933; border-radius: 12px; font-size: 11px; font-weight: 600; margin-top: 8px; }
        .gallery-actions { display: flex; gap: 8px; margin-top: 12px; }
        .btn-sm { padding: 6px 14px; font-size: 12px; border-radius: 20px; border: none; cursor: pointer; font-family: 'Outfit', sans-serif; font-weight: 500; transition: all 0.2s ease; }
        .btn-delete { background: #dc3545; color: white; }
        .btn-delete:hover { background: #c82333; transform: scale(1.05); }
        
        /* Upload Form */
        .upload-form { background: white; padding: 28px; border-radius: 16px; margin-bottom: 32px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); }
        .form-title { font-family: 'Lexend', sans-serif; font-size: 20px; font-weight: 700; color: #5D4037; margin-bottom: 20px; }
        .form-group { margin-bottom: 18px; }
        .form-group label { display: block; margin-bottom: 8px; font-weight: 600; color: #5D4037; font-family: 'Outfit', sans-serif; font-size: 13px; }
        .form-group input, .form-group select { width: 100%; padding: 12px 16px; border: 2px solid #F5E6D3; border-radius: 12px; font-size: 14px; font-family: 'Outfit', sans-serif; transition: all 0.3s ease; }
        .form-group input:focus, .form-group select:focus { outline: none; border-color: #FF9933; box-shadow: 0 0 0 3px rgba(255, 153, 51, 0.1); }
        
        /* Responsive */
        @media (max-width: 768px) {
            .header-content { flex-direction: column; gap: 16px; text-align: center; }
            .logo-section { flex-direction: column; }
            .gallery-grid { grid-template-columns: 1fr; }
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
        <h2 class="page-title">Manage Gallery</h2>
        <p class="page-subtitle">ಗ್ಯಾಲರಿ ನಿರ್ವಹಣೆ</p>

        <div class="upload-form">
            <h3 class="form-title">Upload New Image</h3>
            <form id="uploadForm" enctype="multipart/form-data">
                <div class="form-group">
                    <label>Select Image *</label>
                    <input type="file" id="image" name="image" accept="image/*" required>
                </div>
                <div class="form-group">
                    <label>Title (English)</label>
                    <input type="text" id="title" name="title">
                </div>
                <div class="form-group">
                    <label>Title (Kannada)</label>
                    <input type="text" id="title_kannada" name="title_kannada" placeholder="ಶೀರ್ಷಿಕೆ">
                </div>
                <div class="form-group">
                    <label>Category</label>
                    <select id="category" name="category">
                        <option value="events">Events</option>
                        <option value="ashrama">Ashrama</option>
                        <option value="festivals">Festivals</option>
                        <option value="seva">Seva Activities</option>
                    </select>
                </div>
                <button type="submit" class="btn">Upload Image</button>
            </form>
        </div>

        <h3 style="font-family: 'Lexend', sans-serif; color: #5D4037; font-size: 18px; margin-bottom: 20px;">Gallery Images (<?php echo count($images); ?>)</h3>
        <div class="gallery-grid">
            <?php foreach ($images as $image): ?>
            <div class="gallery-item">
                <img src="<?php echo htmlspecialchars($image['image_url']); ?>" alt="<?php echo htmlspecialchars($image['title_english'] ?: $image['title_kannada'] ?: 'Gallery Image'); ?>">
                <div class="gallery-info">
                    <strong><?php echo htmlspecialchars($image['title_english'] ?: $image['title_kannada'] ?: 'Untitled'); ?></strong>
                    <span class="kannada-text"><?php echo htmlspecialchars($image['title_kannada'] ?? ''); ?></span>
                    <span class="category-badge"><?php echo htmlspecialchars($image['category']); ?></span>
                    <div class="gallery-actions">
                        <button class="btn-sm btn-delete" onclick="deleteImage(<?php echo $image['id']; ?>)">Delete</button>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>


    <script>
        const uploadForm = document.getElementById('uploadForm');
        
        uploadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(uploadForm);
            const submitBtn = uploadForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            try {
                submitBtn.textContent = 'Uploading...';
                submitBtn.disabled = true;
                
                const response = await fetch('../api/admin/gallery.php', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    alert('✓ Image uploaded successfully!');
                    uploadForm.reset();
                    location.reload(); // Reload to show new image
                } else {
                    alert('✗ Error: ' + (result.error || 'Upload failed'));
                }
            } catch (error) {
                console.error('Upload error:', error);
                alert('✗ Upload failed. Please try again.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
        
        async function deleteImage(id) {
            if (!confirm('Are you sure you want to delete this image?')) return;
            
            try {
                const response = await fetch(`../api/admin/gallery.php?id=${id}`, {
                    method: 'DELETE'
                });
                
                const result = await response.json();
                
                if (result.success) {
                    alert('✓ Image deleted successfully!');
                    location.reload();
                } else {
                    alert('✗ Error: ' + (result.error || 'Delete failed'));
                }
            } catch (error) {
                console.error('Delete error:', error);
                alert('✗ Delete failed. Please try again.');
            }
        }
    </script>
</body>
</html>
