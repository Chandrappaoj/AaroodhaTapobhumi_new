# PHP Backend Deployment Guide

## Quick Start

This backend system provides a complete REST API and admin panel for the Sri Siddaroodha Ashrama website.

## What's Included

- ✅ MySQL Database Schema
- ✅ REST API (11 endpoints)
- ✅ Admin Panel
- ✅ Razorpay Payment Integration
- ✅ Contact Form with Email
- ✅ Image Upload System

---

## Step 1: Upload Files to InterServer

### Via FTP (FileZilla):
1. Connect to your InterServer account
2. Navigate to `public_html/`
3. Upload the entire `backend-php` folder contents:
   - `api/` folder → `public_html/api/`
   - `admin/` folder → `public_html/admin/`
   - `sql/` folder → `public_html/sql/`
   - `uploads/` folder → `public_html/uploads/`

---

## Step 2: Create MySQL Database

1. Log in to **cPanel**
2. Go to **MySQL Databases**
3. Create a new database (e.g., `ashrama_db`)
4. Create a database user with a strong password
5. Add the user to the database with **ALL PRIVILEGES**
6. **Note down**: Database name, username, password

---

## Step 3: Import Database Schema

1. In cPanel, open **phpMyAdmin**
2. Select your database (`ashrama_db`)
3. Click **Import** tab
4. Choose file: `sql/schema.sql`
5. Click **Go**
6. Verify tables are created (6 tables total)

---

## Step 4: Configure API

Edit `api/config.php`:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'ashrama_db');          // Your database name
define('DB_USER', 'ashrama_user');        // Your database username
define('DB_PASS', 'your_password_here');  // Your database password

define('RAZORPAY_KEY_ID', 'rzp_test_xxxxx');      // From razorpay.com
define('RAZORPAY_KEY_SECRET', 'your_secret_key'); // From razorpay.com

define('ADMIN_EMAIL', 'info@yourdomain.com');     // Your email
define('SITE_URL', 'https://yourdomain.com');     // Your domain
```

---

## Step 5: Set Up Razorpay

1. Go to [razorpay.com](https://razorpay.com)
2. Create an account (free for testing)
3. Go to **Settings → API Keys**
4. Generate **Test Mode** keys
5. Copy **Key ID** and **Key Secret** to `config.php`

**For Production:**
- Complete KYC verification
- Switch to **Live Mode** keys
- Update `config.php` with live keys

---

## Step 6: Test the API

### Test Events API:
```
https://yourdomain.com/api/events.php?type=upcoming
```

### Test Trustees API:
```
https://yourdomain.com/api/trustees.php
```

You should see JSON responses with sample data.

---

## Step 7: Access Admin Panel

1. Go to: `https://yourdomain.com/admin/`
2. **Default Login:**
   - Username: `admin`
   - Password: `Admin@123`

**⚠️ IMPORTANT: Change this password immediately!**

---

## Step 8: Change Admin Password

After first login, you need to manually update the password in the database:

1. Go to **phpMyAdmin**
2. Select `admin_users` table
3. Click **Edit** on the admin row
4. For `password_hash`, use this PHP code to generate a new hash:

```php
<?php
echo password_hash('YourNewPassword', PASSWORD_DEFAULT);
?>
```

5. Replace the hash in the database

---

## API Endpoints Reference

### Public Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/events.php?type=upcoming` | GET | Get upcoming events |
| `/api/events.php?type=past` | GET | Get past events |
| `/api/trustees.php` | GET | Get all trustees |
| `/api/gallery.php?category=all` | GET | Get gallery images |
| `/api/contact.php` | POST | Submit contact form |
| `/api/payment/create-order.php` | POST | Create Razorpay order |
| `/api/payment/verify.php` | POST | Verify payment |

### Admin Endpoints (Requires Login)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/admin/login.php` | POST | Admin login |
| `/api/admin/events.php` | POST | Create event |
| `/api/admin/events.php?id=X` | PUT | Update event |
| `/api/admin/events.php?id=X` | DELETE | Delete event |
| `/api/admin/trustees.php` | POST | Create trustee |
| `/api/admin/upload.php` | POST | Upload image |

---

## Troubleshooting

### "Database connection failed"
- Check `config.php` credentials
- Verify database exists in cPanel
- Ensure user has privileges

### "CORS error" in React app
- Verify `Access-Control-Allow-Origin` header in `config.php`
- Check that API URL is correct in React app

### "Payment failed"
- Verify Razorpay keys are correct
- Check if using Test Mode keys for testing
- Ensure `curl` is enabled in PHP (check with `phpinfo()`)

### "Upload failed"
- Check `uploads/` folder has write permissions (755)
- Verify file size limits in `php.ini`

---

## Security Checklist

- [ ] Changed default admin password
- [ ] Updated all credentials in `config.php`
- [ ] Set proper file permissions (755 for folders, 644 for files)
- [ ] Enabled HTTPS (SSL certificate)
- [ ] Configured email settings
- [ ] Tested payment flow in Test Mode before going live

---

## Next Steps

1. Update React app to use these APIs
2. Test all functionality
3. Deploy React build to `public_html/`
4. Go live!

---

## Support

For issues, check:
- PHP error logs in cPanel
- Browser console for API errors
- Database query logs in phpMyAdmin

**Default Admin Credentials:**
- Username: `admin`
- Password: `Admin@123` (CHANGE THIS!)
