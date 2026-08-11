<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: index.php');
    exit();
}

require_once 'db_connect.php';
// Fetch all events
$stmt = $pdo->query("SELECT * FROM events ORDER BY event_date DESC");
$events = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Events - ಕಾರ್ಯಕ್ರಮಗಳು | Sri Aaroodha Tapobhumi Admin</title>
    
    <!-- Google Fonts -->
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
            background: #F5E6D3;
            min-height: 100vh;
        }
        
        /* Admin Header */
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
            padding: 16px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo-section {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .admin-logo {
            width: 56px;
            height: 56px;
            object-fit: contain;
        }
        
        .title-section {
            display: flex;
            flex-direction: column;
        }
        
        .title-kannada {
            font-family: 'Noto Serif Kannada', serif;
            font-size: 20px;
            font-weight: 700;
            color: #5D4037;
            line-height: 1.2;
        }
        
        .title-english {
            font-family: 'Lexend', sans-serif;
            font-size: 13px;
            font-weight: 600;
            color: #FF9933;
            line-height: 1.3;
        }
        
        .subtitle {
            font-family: 'Outfit', sans-serif;
            font-size: 11px;
            color: #8D6E63;
            margin-top: 2px;
        }
        
        .header-actions {
            display: flex;
            gap: 12px;
            align-items: center;
        }
        
        .btn-back {
            background: #8D6E63;
            color: white;
            padding: 8px 20px;
            border-radius: 50px;
            text-decoration: none;
            font-family: 'Outfit', sans-serif;
            font-size: 13px;
            font-weight: 500;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
        }
        
        .btn-back:hover {
            background: #5D4037;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(93, 64, 55, 0.3);
        }
        
        /* Container */
        .container { 
            max-width: 1400px; 
            margin: 30px auto; 
            padding: 0 30px; 
        }
        
        /* Page Title */
        .page-title {
            font-family: 'Lexend', sans-serif;
            font-size: 24px;
            font-weight: 700;
            color: #5D4037;
            margin-bottom: 8px;
        }
        
        .page-subtitle {
            font-family: 'Noto Sans Kannada', sans-serif;
            font-size: 16px;
            color: #8D6E63;
            margin-bottom: 24px;
        }
        
        /* Actions Bar */
        .actions { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            margin-bottom: 24px; 
        }
        
        /* Buttons */
        .btn { 
            background: #FF9933; 
            color: white; 
            border: none; 
            padding: 12px 28px; 
            border-radius: 50px; 
            cursor: pointer; 
            font-size: 14px;
            font-weight: 600;
            font-family: 'Lexend', sans-serif;
            text-decoration: none; 
            display: inline-block;
            transition: all 0.3s ease;
        }
        
        .btn:hover { 
            background: #CC6600;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 153, 51, 0.4);
        }
        
        /* Table Container */
        .table-container { 
            background: white; 
            border-radius: 16px; 
            padding: 24px; 
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
            overflow-x: auto; 
        }
        
        table { 
            width: 100%; 
            border-collapse: collapse; 
        }
        
        th, td { 
            padding: 14px 12px; 
            text-align: left; 
            border-bottom: 1px solid #F5E6D3; 
        }
        
        th { 
            background: #FFF8F0; 
            font-weight: 600; 
            color: #5D4037;
            font-family: 'Lexend', sans-serif;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        td {
            font-family: 'Outfit', sans-serif;
            font-size: 14px;
            color: #333;
        }
        
        tr:hover {
            background: #FFF8F0;
        }
        
        .kannada-text {
            font-family: 'Noto Sans Kannada', sans-serif;
            color: #5D4037;
            font-weight: 500;
        }
        
        /* Badges */
        .badge { 
            padding: 4px 10px; 
            border-radius: 12px; 
            font-size: 11px;
            font-weight: 600;
            font-family: 'Outfit', sans-serif;
        }
        
        .badge-upcoming { 
            background: #d4edda; 
            color: #155724; 
        }
        
        .badge-past { 
            background: #f8d7da; 
            color: #721c24; 
        }
        
        /* Action Buttons */
        .action-btns { 
            display: flex; 
            gap: 8px; 
        }
        
        .btn-sm { 
            padding: 6px 14px; 
            font-size: 12px; 
            border-radius: 20px; 
            border: none; 
            cursor: pointer; 
            text-decoration: none;
            font-family: 'Outfit', sans-serif;
            font-weight: 500;
            transition: all 0.2s ease;
        }
        
        .btn-edit { 
            background: #007bff; 
            color: white; 
        }
        
        .btn-edit:hover {
            background: #0056b3;
            transform: scale(1.05);
        }
        
        .btn-delete { 
            background: #dc3545; 
            color: white; 
        }
        
        .btn-delete:hover {
            background: #c82333;
            transform: scale(1.05);
        }
        
        /* Modal */
        .modal { 
            display: none; 
            position: fixed; 
            top: 0; 
            left: 0; 
            width: 100%; 
            height: 100%; 
            background: rgba(0,0,0,0.6);
            backdrop-filter: blur(4px);
            z-index: 1000;
            overflow-y: auto;
        }
        
        .modal-content { 
            background: white; 
            width: 90%; 
            max-width: 700px; 
            margin: 50px auto; 
            border-radius: 20px; 
            padding: 32px; 
            max-height: 85vh; 
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        
        .modal-header {
            font-family: 'Lexend', sans-serif;
            font-size: 22px;
            font-weight: 700;
            color: #5D4037;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 2px solid #F5E6D3;
        }
        
        /* Form Groups */
        .form-group { 
            margin-bottom: 20px; 
        }
        
        .form-group label { 
            display: block; 
            margin-bottom: 8px; 
            font-weight: 600; 
            color: #5D4037;
            font-family: 'Outfit', sans-serif;
            font-size: 13px;
        }
        
        .form-group input, 
        .form-group textarea,
        .form-group select { 
            width: 100%; 
            padding: 12px 16px; 
            border: 2px solid #F5E6D3; 
            border-radius: 12px; 
            font-size: 14px;
            font-family: 'Outfit', sans-serif;
            transition: all 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
            outline: none;
            border-color: #FF9933;
            box-shadow: 0 0 0 3px rgba(255, 153, 51, 0.1);
        }
        
        .form-group textarea { 
            min-height: 100px; 
            resize: vertical;
            font-family: 'Outfit', sans-serif;
        }
        
        .form-row { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 16px; 
        }
        
        .modal-actions { 
            display: flex; 
            gap: 12px; 
            justify-content: flex-end; 
            margin-top: 28px;
            padding-top: 20px;
            border-top: 2px solid #F5E6D3;
        }
        
        .btn-cancel { 
            background: #8D6E63;
        }
        
        .btn-cancel:hover {
            background: #5D4037;
        }
        
        .help-text { 
            font-size: 12px; 
            color: #8D6E63; 
            margin-top: 6px;
            font-family: 'Outfit', sans-serif;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .header-content {
                flex-direction: column;
                gap: 16px;
                text-align: center;
            }
            
            .logo-section {
                flex-direction: column;
            }
            
            .form-row {
                grid-template-columns: 1fr;
            }
            
            .actions {
                flex-direction: column;
                gap: 16px;
                align-items: stretch;
            }
            
            .table-container {
                padding: 16px;
            }
        }
        
        .section-title { 
            font-size: 15px; 
            font-weight: 600; 
            font-family: 'Lexend', sans-serif;
            color: #FF9933; 
            margin: 24px 0 12px 0; 
            padding-bottom: 8px;
            border-bottom: 2px solid #F5E6D3;
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
        <h2 class="page-title">Manage Events</h2>
        <p class="page-subtitle">ಕಾರ್ಯಕ್ರಮಗಳ ನಿರ್ವಹಣೆ</p>

        <div class="actions">
            <h3 style="font-family: 'Lexend', sans-serif; color: #5D4037; font-size: 18px;">All Events</h3>
            <button class="btn" onclick="openAddModal()">+ Add New Event</button>
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($events as $event): ?>
                    <tr>
                        <td>
                            <strong><?php echo htmlspecialchars($event['title_english'] ?: $event['title_kannada']); ?></strong>
                            <br><small class="kannada-text"><?php echo htmlspecialchars($event['title_kannada'] ?? ''); ?></small>
                        </td>
                        <td><?php echo htmlspecialchars($event['event_date']); ?></td>
                        <td><?php echo htmlspecialchars($event['event_time'] ?? '-'); ?></td>
                        <td>
                            <?php if ($event['location_kannada']): ?>
                                <span class="kannada-text"><?php echo htmlspecialchars($event['location_kannada']); ?></span><br>
                                <small><?php echo htmlspecialchars($event['location_english'] ?? ''); ?></small>
                            <?php else: ?>
                                <?php echo htmlspecialchars($event['location_english'] ?? '-'); ?>
                            <?php endif; ?>
                        </td>
                        <td>
                            <?php 
                            $isPast = strtotime($event['event_date']) < strtotime('today');
                            ?>
                            <span class="badge <?php echo $isPast ? 'badge-past' : 'badge-upcoming'; ?>">
                                <?php echo $isPast ? 'Past' : 'Upcoming'; ?>
                            </span>
                        </td>
                        <td>
                            <div class="action-btns">
                                <button class="btn-sm btn-edit" onclick='editEvent(<?php echo json_encode($event); ?>)'>Edit</button>
                                <button class="btn-sm btn-delete" onclick="deleteEvent(<?php echo $event['id']; ?>)">Delete</button>
                            </div>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Add/Edit Modal -->
    <div id="eventModal" class="modal">
        <div class="modal-content">
            <h2 class="modal-header" id="modalTitle">Add New Event</h2>
            <form id="eventForm">
                <input type="hidden" id="eventId" name="id">
                
                <div class="section-title">📝 Event Titles</div>
                <div class="form-group">
                    <label>Title (Kannada) * <span style="color: #FF9933;">ಕನ್ನಡ ಶೀರ್ಷಿಕೆ</span></label>
                    <input type="text" id="title_kn" name="title_kn" required placeholder="ಉದಾ: ಮಹಾ ಶಿವರಾತ್ರಿ ಆಚರಣೆ">
                    <div class="help-text">This will appear larger on the website</div>
                </div>

                <div class="form-group">
                    <label>Title (English) *</label>
                    <input type="text" id="title" name="title" required placeholder="e.g., Maha Shivaratri Celebration">
                    <div class="help-text">This will appear smaller below Kannada title</div>
                </div>


                <div class="section-title">📅 Date & Time</div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Event Date * <span style="font-size: 11px; color: #8D6E63;">(YYYY-MM-DD)</span></label>
                        <input type="date" id="date" name="date" required>
                        <div class="help-text">Select the event date from calendar</div>
                    </div>

                    <div class="form-group">
                        <label>Time</label>
                        <input type="time" id="time" name="time" placeholder="e.g., 18:00">
                    </div>
                </div>

                <div class="section-title">📍 Location</div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Location (Kannada)</label>
                        <input type="text" id="location_kn" name="location_kn" placeholder="ಉದಾ: ಮುಖ್ಯ ದೇವಾಲಯ ಮಂದಿರ">
                    </div>

                    <div class="form-group">
                        <label>Location (English)</label>
                        <input type="text" id="location" name="location" placeholder="e.g., Main Temple Hall">
                    </div>
                </div>

                <div class="section-title">📄 Description</div>
                <div class="form-group">
                    <label>Description (Kannada)</label>
                    <textarea id="description_kn" name="description_kn" placeholder="ಕನ್ನಡದಲ್ಲಿ ವಿವರಣೆ..."></textarea>
                </div>

                <div class="form-group">
                    <label>Description (English)</label>
                    <textarea id="description" name="description" placeholder="Description in English..."></textarea>
                </div>

                <div class="modal-actions">
                    <button type="button" class="btn btn-cancel" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn">Save Event</button>
                </div>
            </form>
        </div>
    </div>

    <script>
        const modal = document.getElementById('eventModal');
        const form = document.getElementById('eventForm');

        function openAddModal() {
            document.getElementById('modalTitle').textContent = 'Add New Event';
            form.reset();
            document.getElementById('eventId').value = '';
            modal.style.display = 'block';
        }

        function editEvent(event) {
            document.getElementById('modalTitle').textContent = 'Edit Event';
            document.getElementById('eventId').value = event.id;
            
            // Map Database Columns (title_english) to Form Fields
            document.getElementById('title').value = event.title_english || event.title || '';
            document.getElementById('title_kn').value = event.title_kannada || event.title_kn || '';
            
            document.getElementById('date').value = event.event_date || event.date || '';
            document.getElementById('time').value = event.event_time || event.time || '';
            
            document.getElementById('location').value = event.location_english || event.location || '';
            document.getElementById('location_kn').value = event.location_kannada || event.location_kn || '';
            
            document.getElementById('description').value = event.description_english || event.description || '';
            document.getElementById('description_kn').value = event.description_kannada || event.description_kn || '';
            
            modal.style.display = 'block';
        }

        function closeModal() {
            modal.style.display = 'none';
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = {
                title: formData.get('title'),
                title_kn: formData.get('title_kn'),
                date: formData.get('date'),
                time: formData.get('time'),
                location: formData.get('location'),
                location_kn: formData.get('location_kn'),
                description: formData.get('description'),
                description_kn: formData.get('description_kn')
            };

            const eventId = document.getElementById('eventId').value;
            const url = eventId 
                ? `../api/admin/events.php?id=${eventId}`
                : '../api/admin/events.php';
            const method = eventId ? 'PUT' : 'POST';

            try {
                const response = await fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                
                if (response.ok) {
                    alert(result.message);
                    location.reload();
                } else {
                    alert('Error: ' + result.error);
                }
            } catch (error) {
                alert('Network error: ' + error.message);
            }
        });

        async function deleteEvent(id) {
            if (!confirm('Are you sure you want to delete this event?')) return;

            try {
                const response = await fetch(`../api/admin/events.php?id=${id}`, {
                    method: 'DELETE'
                });

                const result = await response.json();
                
                if (response.ok) {
                    alert(result.message);
                    location.reload();
                } else {
                    alert('Error: ' + result.error);
                }
            } catch (error) {
                alert('Network error: ' + error.message);
            }
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            if (event.target == modal) {
                closeModal();
            }
        }
    </script>
</body>
</html>
