<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: index.php');
    exit();
}

require_once 'db_connect.php';
$stmt = $pdo->query("SELECT * FROM videos ORDER BY id DESC");
$videos = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Videos - ವೀಡಿಯೊಗಳು | Sri Aaroodha Tapobhumi Admin</title>
    
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
        
        /* Video Grid */
        .video-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
        .video-item { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.08); transition: all 0.3s ease; }
        .video-item:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
        .video-thumbnail { width: 100%; height: 200px; object-fit: cover; background: #000; }
        .video-info { padding: 16px; }
        .video-info strong { font-family: 'Lexend', sans-serif; color: #5D4037; font-size: 15px; }
        .kannada-text { font-family: 'Noto Sans Kannada', sans-serif; color: #8D6E63; font-size: 13px; display: block; margin-top: 4px; }
        .video-actions { display: flex; gap: 8px; margin-top: 12px; }
        .btn-sm { padding: 6px 14px; font-size: 12px; border-radius: 20px; border: none; cursor: pointer; font-family: 'Outfit', sans-serif; font-weight: 500; transition: all 0.2s ease; text-decoration: none; }
        .btn-view { background: #0066cc; color: white; }
        .btn-view:hover { background: #0052a3; transform: scale(1.05); }
        .btn-delete { background: #dc3545; color: white; }
        .btn-delete:hover { background: #c82333; transform: scale(1.05); }
        
        /* Upload Form */
        .upload-form { background: white; padding: 28px; border-radius: 16px; margin-bottom: 32px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); }
        .form-title { font-family: 'Lexend', sans-serif; font-size: 20px; font-weight: 700; color: #5D4037; margin-bottom: 20px; }
        .form-group { margin-bottom: 18px; }
        .form-group label { display: block; margin-bottom: 8px; font-weight: 600; color: #5D4037; font-family: 'Outfit', sans-serif; font-size: 13px; }
        .form-group input, .form-group textarea { width: 100%; padding: 12px 16px; border: 2px solid #F5E6D3; border-radius: 12px; font-size: 14px; font-family: 'Outfit', sans-serif; transition: all 0.3s ease; }
        .form-group input:focus, .form-group textarea:focus { outline: none; border-color: #FF9933; box-shadow: 0 0 0 3px rgba(255, 153, 51, 0.1); }
        .form-group textarea { min-height: 80px; resize: vertical; }
        .help-text { font-size: 12px; color: #8D6E63; margin-top: 6px; }
        
        /* Responsive */
        @media (max-width: 768px) {
            .header-content { flex-direction: column; gap: 16px; text-align: center; }
            .logo-section { flex-direction: column; }
            .video-grid { grid-template-columns: 1fr; }
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
        <h2 class="page-title">Manage Videos</h2>
        <p class="page-subtitle">ವೀಡಿಯೊಗಳ ನಿರ್ವಹಣೆ</p>

        <div class="upload-form">
            <h3 class="form-title">Add New Video</h3>
            <form id="videoForm">
                <div class="form-group">
                    <label>YouTube Video URL *</label>
                    <input type="url" id="video_url" name="video_url" placeholder="https://www.youtube.com/watch?v=..." required>
                    <p class="help-text">Paste the full YouTube video URL</p>
                </div>
                <div class="form-group">
                    <label>Title (Kannada)</label>
                    <input type="text" id="title_kn" name="title_kn" placeholder="ಶ್ರೀ ಸಿದ್ಧರೂಢ ಸ್ವಾಮೀಜಿ - ಪ್ರವಚನ">
                </div>
                <div class="form-group">
                    <label>Title (English)</label>
                    <input type="text" id="title_en" name="title_en" placeholder="Sri Siddhaaroodha Swamiji - Pravachana">
                </div>
                <div class="form-group">
                    <label>Description (Optional)</label>
                    <textarea id="description" name="description" placeholder="Brief description of the video..."></textarea>
                </div>
                <button type="submit" class="btn">Add Video</button>
            </form>
        </div>

        <h3 style="font-family: 'Lexend', sans-serif; color: #5D4037; font-size: 18px; margin-bottom: 20px;">Videos (<?php echo count($videos); ?>)</h3>
        <div class="video-grid">
            <?php foreach ($videos as $video): 
                // Extract YouTube video ID
                $videoId = '';
                if (preg_match('/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/', $video['video_url'], $matches)) {
                    $videoId = $matches[1];
                }
                $thumbnail = $videoId ? "https://img.youtube.com/vi/{$videoId}/mqdefault.jpg" : '';
            ?>
            <div class="video-item">
                <?php if ($thumbnail): ?>
                    <img src="<?php echo $thumbnail; ?>" alt="Video thumbnail" class="video-thumbnail">
                <?php else: ?>
                    <div class="video-thumbnail" style="background: #333; display: flex; align-items: center; justify-content: center; color: white;">
                        No Thumbnail
                    </div>
                <?php endif; ?>
                <div class="video-info">
                    <strong><?php echo htmlspecialchars($video['title_english'] ?: $video['title_kannada'] ?: 'Untitled'); ?></strong>
                    <span class="kannada-text"><?php echo htmlspecialchars($video['title_kannada'] ?? ''); ?></span>
                    <?php if ($video['description_english'] || $video['description_kannada']): ?>
                        <p style="font-size: 13px; margin-top: 8px; color: #555;">
                            <?php echo htmlspecialchars(substr($video['description_english'] ?: $video['description_kannada'], 0, 100)); ?>...
                        </p>
                    <?php endif; ?>
                    <div class="video-actions">
                        <a href="<?php echo htmlspecialchars($video['video_url']); ?>" target="_blank" class="btn-sm btn-view">View</a>
                        <button class="btn-sm btn-delete" onclick="deleteVideo(<?php echo $video['id']; ?>)">Delete</button>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>


    <script>
        const videoForm = document.getElementById('videoForm');
        
        videoForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(videoForm);
            const submitBtn = videoForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            const data = {
                video_url: formData.get('video_url'),
                title_kn: formData.get('title_kn'),
                title_en: formData.get('title_en'),
                description: formData.get('description')
            };
            
            try {
                submitBtn.textContent = 'Adding...';
                submitBtn.disabled = true;
                
                const response = await fetch('../api/admin/videos.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    alert('✓ Video added successfully!');
                    videoForm.reset();
                    location.reload(); // Reload to show new video
                } else {
                    alert('✗ Error: ' + (result.error || 'Failed to add video'));
                }
            } catch (error) {
                console.error('Add video error:', error);
                alert('✗ Failed to add video. Please try again.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
        
        async function deleteVideo(id) {
            if (!confirm('Are you sure you want to delete this video?')) return;
            
            try {
                const response = await fetch(`../api/admin/videos.php?id=${id}`, {
                    method: 'DELETE'
                });
                
                const result = await response.json();
                
                if (result.success) {
                    alert('✓ Video deleted successfully!');
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

