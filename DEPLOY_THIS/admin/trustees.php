<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: index.php');
    exit();
}

require_once 'db_connect.php';
$stmt = $pdo->query("SELECT * FROM trustees ORDER BY display_order ASC");
$trustees = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Trustees - ಟ್ರಸ್ಟಿಗಳು | Sri Aaroodha Tapobhumi Admin</title>
    
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
        .kannada-text { font-family: 'Noto Sans Kannada', sans-serif; color: #5D4037; font-weight: 500; }
        
        /* Action Buttons */
        .btn-sm { padding: 6px 14px; font-size: 12px; border-radius: 20px; border: none; cursor: pointer; font-family: 'Outfit', sans-serif; font-weight: 500; transition: all 0.2s ease; margin-right: 5px; }
        .btn-edit { background: #007bff; color: white; }
        .btn-edit:hover { background: #0056b3; transform: scale(1.05); }
        .btn-delete { background: #dc3545; color: white; }
        .btn-delete:hover { background: #c82333; transform: scale(1.05); }
        
        /* Modal */
        .modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); z-index: 1000; overflow-y: auto; }
        .modal-content { background: white; width: 90%; max-width: 700px; margin: 50px auto; border-radius: 20px; padding: 32px; max-height: 85vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
        .modal-header { font-family: 'Lexend', sans-serif; font-size: 22px; font-weight: 700; color: #5D4037; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 2px solid #F5E6D3; }
        
        /* Form */
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; margin-bottom: 8px; font-weight: 600; color: #5D4037; font-family: 'Outfit', sans-serif; font-size: 13px; }
        .form-group input, .form-group textarea { width: 100%; padding: 12px 16px; border: 2px solid #F5E6D3; border-radius: 12px; font-size: 14px; font-family: 'Outfit', sans-serif; transition: all 0.3s ease; }
        .form-group input:focus, .form-group textarea:focus { outline: none; border-color: #FF9933; box-shadow: 0 0 0 3px rgba(255, 153, 51, 0.1); }
        .form-group textarea { min-height: 100px; resize: vertical; }
        .modal-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 28px; padding-top: 20px; border-top: 2px solid #F5E6D3; }
        .btn-cancel { background: #8D6E63; }
        .btn-cancel:hover { background: #5D4037; }
        
        /* Responsive */
        @media (max-width: 768px) {
            .header-content { flex-direction: column; gap: 16px; text-align: center; }
            .logo-section { flex-direction: column; }
            .actions { flex-direction: column; gap: 16px; align-items: stretch; }
            .table-container { padding: 16px; }
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
        <h2 class="page-title">Manage Trustees</h2>
        <p class="page-subtitle">ಟ್ರಸ್ಟಿಗಳ ನಿರ್ವಹಣೆ</p>

        <div class="actions">
            <h3 style="font-family: 'Lexend', sans-serif; color: #5D4037; font-size: 18px;">All Trustees</h3>
            <button class="btn" onclick="openAddModal()">+ Add Trustee</button>
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Name (English)</th>
                        <th>Name (Kannada)</th>
                        <th>Position</th>
                        <th>Bio</th>
                        <th>Order</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($trustees as $trustee): ?>
                    <tr>
                        <td><strong><?php echo htmlspecialchars($trustee['name_english']); ?></strong></td>
                        <td><span class="kannada-text"><?php echo htmlspecialchars($trustee['name_kannada'] ?? '-'); ?></span></td>
                        <td><?php echo htmlspecialchars($trustee['position_english']); ?></td>
                        <td><?php echo substr(htmlspecialchars($trustee['bio_english'] ?? ''), 0, 100); ?>...</td>
                        <td><?php echo $trustee['display_order']; ?></td>
                        <td>
                            <button class="btn-sm btn-edit" onclick='editTrustee(<?php echo json_encode($trustee); ?>)'>Edit</button>
                            <button class="btn-sm btn-delete" onclick="deleteTrustee(<?php echo $trustee['id']; ?>)">Delete</button>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Add/Edit Modal -->
    <div id="trusteeModal" class="modal">
        <div class="modal-content">
            <h2 class="modal-header" id="modalTitle">Add Trustee</h2>
            <form id="trusteeForm">
                <input type="hidden" id="trusteeId">
                <div class="form-group">
                    <label>Name (English) *</label>
                    <input type="text" id="name" required>
                </div>
                <div class="form-group">
                    <label>Name (Kannada)</label>
                    <input type="text" id="name_kannada" placeholder="ಹೆಸರು">
                </div>
                <div class="form-group">
                    <label>Position (English) *</label>
                    <input type="text" id="role" required>
                </div>
                <div class="form-group">
                    <label>Position (Kannada)</label>
                    <input type="text" id="role_kannada" placeholder="ಹುದ್ದೆ">
                </div>
                <div class="form-group">
                    <label>Profile Photo</label>
                    <input type="file" id="image" accept="image/*">
                    <p class="help-text" style="font-size: 12px; color: #8D6E63; margin-top: 6px;">Upload a profile photo (JPG, PNG, GIF, WebP)</p>
                </div>
                <div class="form-group">
                    <label>Bio (English)</label>
                    <textarea id="description" rows="3"></textarea>
                </div>
                <div class="form-group">
                    <label>Bio (Kannada)</label>
                    <textarea id="description_kannada" rows="3" placeholder="ವಿವರಣೆ"></textarea>
                </div>
                <div class="form-group">
                    <label>Display Order</label>
                    <input type="number" id="display_order" value="0">
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-cancel" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn">Save</button>
                </div>
            </form>
        </div>
    </div>

    <script>
        const modal = document.getElementById('trusteeModal');
        const form = document.getElementById('trusteeForm');

        function openAddModal() {
            document.getElementById('modalTitle').textContent = 'Add Trustee';
            form.reset();
            document.getElementById('trusteeId').value = '';
            modal.style.display = 'block';
        }

        const trusteeForm = document.getElementById('trusteeForm');
        
        trusteeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const trusteeId = document.getElementById('trusteeId').value;
            const isEdit = trusteeId !== '';
            const imageFile = document.getElementById('image').files[0];
            
            // Use FormData if there's an image, otherwise use JSON
            let requestBody;
            let headers = {};
            
            if (imageFile) {
                // Use FormData for file upload
                const formData = new FormData();
                formData.append('image', imageFile);
                formData.append('name_english', document.getElementById('name').value);
                formData.append('name_kannada', document.getElementById('name_kannada').value);
                formData.append('position_english', document.getElementById('role').value);
                formData.append('position_kannada', document.getElementById('role_kannada').value);
                formData.append('bio_english', document.getElementById('description').value);
                formData.append('bio_kannada', document.getElementById('description_kannada').value);
                formData.append('display_order', document.getElementById('display_order').value);
                if (isEdit) formData.append('id', trusteeId);
                requestBody = formData;
            } else {
                // Use JSON for text-only updates
                const data = {
                    name_english: document.getElementById('name').value,
                    name_kannada: document.getElementById('name_kannada').value,
                    position_english: document.getElementById('role').value,
                    position_kannada: document.getElementById('role_kannada').value,
                    bio_english: document.getElementById('description').value,
                    bio_kannada: document.getElementById('description_kannada').value,
                    display_order: document.getElementById('display_order').value
                };
                requestBody = JSON.stringify(data);
                headers['Content-Type'] = 'application/json';
            }
            
            try {
                // ALWAYS use POST. If ID is present in body/formData, backend treats as UPDATE.
                const url = '../api/admin/trustees.php';
                const method = 'POST';
                
                const response = await fetch(url, {
                    method: method,
                    headers: headers,
                    body: requestBody
                });
                
                const result = await response.json();
                
                if (result.success) {
                    alert(isEdit ? '✓ Trustee updated successfully!' : '✓ Trustee added successfully!');
                    location.reload();
                } else {
                    alert('✗ Error: ' + (result.error || 'Operation failed'));
                }
            } catch (error) {
                console.error('Form submission error:', error);
                alert('✗ Failed to save trustee. Please try again.');
            }
        });

        async function deleteTrustee(id) {
            if (!confirm('Are you sure you want to delete this trustee?')) return;
            
            try {
                const response = await fetch(`../api/admin/trustees.php?id=${id}`, {
                    method: 'DELETE'
                });
                
                const result = await response.json();
                
                if (result.success) {
                    alert('✓ Trustee deleted successfully!');
                    location.reload();
                } else {
                    alert('✗ Error: ' + (result.error || 'Delete failed'));
                }
            } catch (error) {
                console.error('Delete error:', error);
                alert('✗ Delete failed. Please try again.');
            }
        }

        function editTrustee(trustee) {
            document.getElementById('modalTitle').textContent = 'Edit Trustee';
            document.getElementById('trusteeId').value = trustee.id;
            document.getElementById('name').value = trustee.name_english;
            document.getElementById('name_kannada').value = trustee.name_kannada || '';
            document.getElementById('role').value = trustee.position_english;
            document.getElementById('role_kannada').value = trustee.position_kannada || '';
            document.getElementById('description').value = trustee.bio_english || '';
            document.getElementById('description_kannada').value = trustee.bio_kannada || '';
            document.getElementById('display_order').value = trustee.display_order;
            modal.style.display = 'block';
        }

        function closeModal() {
            modal.style.display = 'none';
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                closeModal();
            }
        }
    </script>
</body>
</html>
