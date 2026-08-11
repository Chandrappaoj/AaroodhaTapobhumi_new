<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: index.php');
    exit();
}

require_once 'db_connect.php';

// Fetch all chapters
$stmt = $pdo->query("SELECT * FROM charitre_chapters ORDER BY chapter_number ASC");
$chapters = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Charitre - ಚರಿತ್ರೆ | Sri Aaroodha Tapobhumi Admin</title>
    
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
        .btn-back { background: #8D6E63; color: white; padding: 8px 20px; border-radius: 50px; text-decoration: none; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 500; transition: all 0.3s ease; border: none; cursor: pointer; }
        .btn-back:hover { background: #5D4037; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(93, 64, 55, 0.3); }
        
        /* Container */
        .container { max-width: 1400px; margin: 30px auto; padding: 0 30px; }
        .page-title { font-family: 'Lexend', sans-serif; font-size: 24px; font-weight: 700; color: #5D4037; margin-bottom: 8px; }
        .page-subtitle { font-family: 'Noto Sans Kannada', sans-serif; font-size: 16px; color: #8D6E63; margin-bottom: 24px; }
        .actions { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        
        /* Buttons */
        .btn { background: #FF9933; color: white; border: none; padding: 12px 28px; border-radius: 50px; cursor: pointer; font-size: 14px; font-weight: 600; font-family: 'Lexend', sans-serif; text-decoration: none; display: inline-block; transition: all 0.3s ease; }
        .btn:hover { background: #CC6600; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255, 153, 51, 0.4); }
        
        /* Table */
        .table-container { background: white; border-radius: 16px; padding: 24px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 14px 12px; text-align: left; border-bottom: 1px solid #F5E6D3; }
        th { background: #FFF8F0; font-weight: 600; color: #5D4037; font-family: 'Lexend', sans-serif; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
        td { font-family: 'Outfit', sans-serif; font-size: 14px; color: #333; }
        tr:hover { background: #FFF8F0; }
        .kannada-text { font-family: 'Noto Serif Kannada', serif; color: #5D4037; font-weight: 600; }
        
        /* Action Buttons */
        .btn-sm { padding: 6px 14px; font-size: 12px; border-radius: 20px; border: none; cursor: pointer; font-family: 'Outfit', sans-serif; font-weight: 500; transition: all 0.2s ease; margin-right: 5px; }
        .btn-edit { background: #007bff; color: white; }
        .btn-edit:hover { background: #0056b3; transform: scale(1.05); }
        .btn-delete { background: #dc3545; color: white; }
        .btn-delete:hover { background: #c82333; transform: scale(1.05); }
        
        /* Modal */
        .modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); z-index: 1000; overflow-y: auto; }
        .modal-content { background: white; width: 90%; max-width: 800px; margin: 50px auto; border-radius: 20px; padding: 32px; max-height: 85vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
        .modal-header { font-family: 'Lexend', sans-serif; font-size: 22px; font-weight: 700; color: #5D4037; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 2px solid #F5E6D3; }
        
        /* Form */
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .form-group { margin-bottom: 20px; }
        .form-group.full-width { grid-column: 1 / -1; }
        .form-group label { display: block; margin-bottom: 8px; font-weight: 600; color: #5D4037; font-family: 'Outfit', sans-serif; font-size: 13px; }
        .form-group input, .form-group select { width: 100%; padding: 12px 16px; border: 2px solid #F5E6D3; border-radius: 12px; font-size: 14px; font-family: 'Outfit', sans-serif; transition: all 0.3s ease; }
        .form-group input:focus, .form-group select:focus { outline: none; border-color: #FF9933; box-shadow: 0 0 0 3px rgba(255, 153, 51, 0.1); }
        .help-text { font-size: 12px; color: #8D6E63; margin-top: 6px; }
        .modal-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 28px; padding-top: 20px; border-top: 2px solid #F5E6D3; }
        .btn-cancel { background: #8D6E63; }
        .btn-cancel:hover { background: #5D4037; }
        
        /* Status Badge */
        .badge { padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .badge-active { background: #d4edda; color: #155724; }
        .badge-inactive { background: #f8d7da; color: #721c24; }

        @media (max-width: 768px) {
            .header-content { flex-direction: column; gap: 16px; text-align: center; }
            .logo-section { flex-direction: column; }
            .actions { flex-direction: column; gap: 16px; align-items: stretch; }
            .table-container { padding: 16px; }
            .form-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="admin-header">
        <div class="header-content">
            <div class="logo-section">
                <img src="../assets/ashrama-logo.png" alt="Logo" class="admin-logo">
                <div class="title-section">
                    <h1 class="title-kannada">ಶ್ರೀ ಆರೂಢ ತಪೋಭೂಮಿ</h1>
                    <p class="title-english">Sri Aaroodha Tapobhumi</p>
                    <p class="subtitle">Admin Panel | ನಿರ್ವಹಣಾ ಫಲಕ</p>
                </div>
            </div>
            <a href="dashboard.php" class="btn-back">← Back to Dashboard</a>
        </div>
    </div>

    <div class="container">
        <h2 class="page-title">Manage Charitre Chapters</h2>
        <p class="page-subtitle">ಶ್ರೀ ಸಿದ್ಧಾರೂಢ ಸ್ವಾಮಿ ಚರಿತ್ರೆ ನಿರ್ವಹಣೆ</p>

        <div class="actions">
            <h3 style="font-family: 'Lexend', sans-serif; color: #5D4037; font-size: 18px;">All Chapters</h3>
            <button class="btn" onclick="openAddModal()">+ Add Chapter</button>
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Chapter No</th>
                        <th>Title (Kannada)</th>
                        <th>Audio</th>
                        <th>Cover Image</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if(empty($chapters)): ?>
                        <tr><td colspan="6" style="text-align:center;">No chapters found.</td></tr>
                    <?php else: ?>
                        <?php foreach ($chapters as $chapter): ?>
                        <tr>
                            <td><?php echo $chapter['chapter_number']; ?></td>
                            <td><span class="kannada-text"><?php echo htmlspecialchars($chapter['title_kn']); ?></span></td>
                            <td><?php echo $chapter['audio_file'] ? '✓ Uploaded' : '-'; ?></td>
                            <td><?php echo $chapter['cover_image'] ? '✓ Uploaded' : '-'; ?></td>
                            <td>
                                <span class="badge <?php echo $chapter['is_published'] ? 'badge-active' : 'badge-inactive'; ?>">
                                    <?php echo $chapter['is_published'] ? 'Published' : 'Draft'; ?>
                                </span>
                            </td>
                            <td>
                                <button class="btn-sm btn-edit" onclick='editChapter(<?php echo json_encode($chapter); ?>)'>Edit</button>
                                <button class="btn-sm btn-delete" onclick="deleteChapter(<?php echo $chapter['id']; ?>)">Delete</button>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Add/Edit Modal -->
    <div id="chapterModal" class="modal">
        <div class="modal-content">
            <h2 class="modal-header" id="modalTitle">Add Chapter</h2>
            <form id="chapterForm">
                <input type="hidden" id="chapterId">
                
                <div class="form-grid">
                    <div class="form-group">
                        <label>Chapter Number *</label>
                        <input type="number" id="chapter_number" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Display Order</label>
                        <input type="number" id="display_order" value="0">
                    </div>

                    <div class="form-group full-width">
                        <label>Title (Kannada) *</label>
                        <input type="text" id="title_kn" placeholder="ಅಧ್ಯಾಯ – ೧" required>
                    </div>

                    <div class="form-group full-width">
                        <label>Subtitle (Kannada)</label>
                        <input type="text" id="subtitle_kn" placeholder="ಉಪಶೀರ್ಷಿಕೆ (Optional)">
                    </div>

                    <div class="form-group full-width">
                        <label>Kannada Text File (.txt) <span id="txtHelpText"></span></label>
                        <input type="file" id="content_txt" accept=".txt">
                        <p class="help-text">Upload UTF-8 text file. Paragraph breaks will be preserved.</p>
                    </div>

                    <div class="form-group">
                        <label>Chapter Audio (.mp3)</label>
                        <input type="file" id="audio_file" accept="audio/mpeg">
                        <p class="help-text" id="audioHelpText">Upload narrator audio</p>
                    </div>

                    <div class="form-group">
                        <label>Cover Image</label>
                        <input type="file" id="cover_image" accept="image/*">
                        <p class="help-text" id="imageHelpText">Upload banner/cover image</p>
                    </div>

                    <div class="form-group">
                        <label>Status</label>
                        <select id="is_published">
                            <option value="1">Published</option>
                            <option value="0">Draft</option>
                        </select>
                    </div>
                </div>

                <div class="modal-actions">
                    <button type="button" class="btn btn-cancel" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn">Save Chapter</button>
                </div>
            </form>
        </div>
    </div>

    <script>
        const modal = document.getElementById('chapterModal');
        const form = document.getElementById('chapterForm');

        function openAddModal() {
            document.getElementById('modalTitle').textContent = 'Add Chapter';
            form.reset();
            document.getElementById('chapterId').value = '';
            document.getElementById('txtHelpText').textContent = '* Required';
            document.getElementById('content_txt').required = true;
            modal.style.display = 'block';
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const chapterId = document.getElementById('chapterId').value;
            const isEdit = chapterId !== '';
            
            const formData = new FormData();
            if (isEdit) formData.append('id', chapterId);
            
            formData.append('chapter_number', document.getElementById('chapter_number').value);
            formData.append('title_kn', document.getElementById('title_kn').value);
            formData.append('subtitle_kn', document.getElementById('subtitle_kn').value);
            formData.append('display_order', document.getElementById('display_order').value);
            formData.append('is_published', document.getElementById('is_published').value);
            
            const txtFile = document.getElementById('content_txt').files[0];
            if (txtFile) formData.append('content_txt', txtFile);
            
            const audioFile = document.getElementById('audio_file').files[0];
            if (audioFile) formData.append('audio_file', audioFile);
            
            const imageFile = document.getElementById('cover_image').files[0];
            if (imageFile) formData.append('cover_image', imageFile);

            try {
                const response = await fetch('../api/admin/charitre.php', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                if (result.success) {
                    alert(isEdit ? '✓ Chapter updated successfully!' : '✓ Chapter added successfully!');
                    location.reload();
                } else {
                    alert('✗ Error: ' + (result.error || 'Operation failed'));
                }
            } catch (error) {
                console.error('Error:', error);
                alert('✗ Failed to save chapter. Please try again.');
            }
        });

        async function deleteChapter(id) {
            if (!confirm('Are you sure you want to delete this chapter? This cannot be undone.')) return;
            
            try {
                const response = await fetch(`../api/admin/charitre.php?id=${id}`, {
                    method: 'DELETE'
                });
                
                const result = await response.json();
                if (result.success) {
                    alert('✓ Chapter deleted successfully!');
                    location.reload();
                } else {
                    alert('✗ Error: ' + (result.error || 'Delete failed'));
                }
            } catch (error) {
                console.error('Delete error:', error);
                alert('✗ Delete failed. Please try again.');
            }
        }

        function editChapter(chapter) {
            document.getElementById('modalTitle').textContent = 'Edit Chapter';
            document.getElementById('chapterId').value = chapter.id;
            document.getElementById('chapter_number').value = chapter.chapter_number;
            document.getElementById('title_kn').value = chapter.title_kn;
            document.getElementById('subtitle_kn').value = chapter.subtitle_kn || '';
            document.getElementById('display_order').value = chapter.display_order;
            document.getElementById('is_published').value = chapter.is_published;
            
            document.getElementById('txtHelpText').textContent = '(Leave empty to keep existing text)';
            document.getElementById('content_txt').required = false;
            
            modal.style.display = 'block';
        }

        function closeModal() {
            modal.style.display = 'none';
        }

        window.onclick = function(event) {
            if (event.target == modal) closeModal();
        }
    </script>
</body>
</html>
