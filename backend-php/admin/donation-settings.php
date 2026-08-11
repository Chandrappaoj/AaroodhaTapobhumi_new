<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: index.php');
    exit();
}

require_once 'db_connect.php';

// Fetch current settings
$stmt = $pdo->query("SELECT * FROM donation_settings ORDER BY id ASC LIMIT 1");
$settings = $stmt->fetch();

// If no settings exist yet, create defaults
if (!$settings) {
    $settings = [
        'account_name' => 'Sri Aaroodha Tapobhumi Trust',
        'account_number' => '',
        'ifsc_code' => '',
        'bank_name' => '',
        'upi_id' => '',
        'qr_code' => ''
    ];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Donation Settings | Sri Aaroodha Tapobhumi Admin</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&family=Outfit:wght@400;500;600&display=swap" rel="stylesheet">
    
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Outfit', sans-serif; background: #F5E6D3; min-height: 100vh; }
        
        .admin-header { background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.08); position: sticky; top: 0; z-index: 100; }
        .header-content { max-width: 1400px; margin: 0 auto; padding: 16px 30px; display: flex; justify-content: space-between; align-items: center; }
        .logo-section { display: flex; align-items: center; gap: 12px; }
        .admin-logo { width: 56px; height: 56px; object-fit: contain; }
        .title-section { display: flex; flex-direction: column; }
        .title-english { font-family: 'Lexend', sans-serif; font-size: 16px; font-weight: 600; color: #5D4037; }
        .btn-back { background: #8D6E63; color: white; padding: 8px 20px; border-radius: 50px; text-decoration: none; font-size: 13px; font-weight: 500; transition: all 0.3s ease; border: none; cursor: pointer; }
        .btn-back:hover { background: #5D4037; }
        
        .container { max-width: 800px; margin: 30px auto; padding: 0 30px; }
        .page-title { font-family: 'Lexend', sans-serif; font-size: 24px; font-weight: 700; color: #5D4037; margin-bottom: 24px; }
        
        .settings-card { background: white; border-radius: 20px; padding: 32px; box-shadow: 0 20px 60px rgba(0,0,0,0.1); }
        
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .form-group { margin-bottom: 20px; }
        .form-group.full-width { grid-column: 1 / -1; }
        .form-group label { display: block; margin-bottom: 8px; font-weight: 600; color: #5D4037; font-size: 13px; }
        .form-group input { width: 100%; padding: 12px 16px; border: 2px solid #F5E6D3; border-radius: 12px; font-size: 14px; font-family: 'Outfit', sans-serif; transition: all 0.3s ease; }
        .form-group input:focus { outline: none; border-color: #FF9933; box-shadow: 0 0 0 3px rgba(255, 153, 51, 0.1); }
        
        .qr-preview { margin-top: 12px; max-width: 200px; border-radius: 12px; border: 2px solid #F5E6D3; display: <?php echo $settings['qr_code'] ? 'block' : 'none'; ?>; }
        
        .btn-save { background: #FF9933; color: white; border: none; padding: 14px 32px; border-radius: 50px; cursor: pointer; font-size: 15px; font-weight: 600; font-family: 'Lexend', sans-serif; width: 100%; transition: all 0.3s ease; margin-top: 16px; }
        .btn-save:hover { background: #CC6600; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255, 153, 51, 0.4); }
        
        @media (max-width: 768px) {
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
                    <h1 class="title-english">Donation Settings</h1>
                </div>
            </div>
            <a href="dashboard.php" class="btn-back">← Back</a>
        </div>
    </div>

    <div class="container">
        <h2 class="page-title">Manage Bank & UPI Details</h2>
        
        <div class="settings-card">
            <form id="settingsForm">
                <div class="form-grid">
                    <div class="form-group full-width">
                        <label>Account Name *</label>
                        <input type="text" id="account_name" value="<?php echo htmlspecialchars($settings['account_name']); ?>" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Account Number *</label>
                        <input type="text" id="account_number" value="<?php echo htmlspecialchars($settings['account_number']); ?>" required>
                    </div>
                    
                    <div class="form-group">
                        <label>IFSC Code *</label>
                        <input type="text" id="ifsc_code" value="<?php echo htmlspecialchars($settings['ifsc_code']); ?>" required>
                    </div>
                    
                    <div class="form-group full-width">
                        <label>Bank Name & Branch *</label>
                        <input type="text" id="bank_name" value="<?php echo htmlspecialchars($settings['bank_name']); ?>" required>
                    </div>
                    
                    <div class="form-group full-width">
                        <label>UPI ID *</label>
                        <input type="text" id="upi_id" value="<?php echo htmlspecialchars($settings['upi_id']); ?>" required>
                    </div>
                    
                    <div class="form-group full-width">
                        <label>UPI QR Code Image (Upload to change)</label>
                        <input type="file" id="qr_code" accept="image/jpeg, image/png, image/webp">
                        <img src="<?php echo $settings['qr_code'] ? '..' . $settings['qr_code'] : ''; ?>" alt="QR Preview" class="qr-preview" id="qrPreview">
                    </div>
                </div>
                
                <button type="submit" class="btn-save">Save Settings</button>
            </form>
        </div>
    </div>

    <script>
        const qrInput = document.getElementById('qr_code');
        const qrPreview = document.getElementById('qrPreview');
        
        qrInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    qrPreview.src = e.target.result;
                    qrPreview.style.display = 'block';
                }
                reader.readAsDataURL(this.files[0]);
            }
        });

        document.getElementById('settingsForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = document.querySelector('.btn-save');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Saving...';
            submitBtn.disabled = true;
            
            const formData = new FormData();
            formData.append('account_name', document.getElementById('account_name').value);
            formData.append('account_number', document.getElementById('account_number').value);
            formData.append('ifsc_code', document.getElementById('ifsc_code').value);
            formData.append('bank_name', document.getElementById('bank_name').value);
            formData.append('upi_id', document.getElementById('upi_id').value);
            
            if (qrInput.files[0]) {
                formData.append('qr_code', qrInput.files[0]);
            }
            
            try {
                const response = await fetch('../api/admin/donation-settings.php', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                if (result.success) {
                    alert('✓ Settings saved successfully!');
                    if (result.qr_code_url) {
                        qrPreview.src = '..' + result.qr_code_url;
                    }
                } else {
                    alert('✗ Error: ' + (result.error || 'Failed to save'));
                }
            } catch (error) {
                console.error('Error:', error);
                alert('✗ Network error. Failed to save.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    </script>
</body>
</html>
