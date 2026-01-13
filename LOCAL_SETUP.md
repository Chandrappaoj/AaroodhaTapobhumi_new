# 🚀 Quick Start Guide - Local Development

## ✅ What's Already Done

- ✅ Backend files copied to `C:\xampp\htdocs\ashrama-api\`
- ✅ Frontend API URL configured
- ✅ Helper scripts created

---

## 📋 Prerequisites

Make sure these are running in **XAMPP Control Panel**:
- ✅ Apache (green)
- ✅ MySQL (green)

---

## 🗄️ Step 1: Setup Database

### Option A: Using Helper Script (Recommended)
Double-click: **`setup-database.bat`**

This will:
1. Open phpMyAdmin
2. Show you step-by-step instructions
3. Test the API automatically

### Option B: Manual Setup
1. Open: http://localhost/phpmyadmin
2. Click **"New"** → Create database: `ashrama_db`
3. Collation: `utf8mb4_unicode_ci`
4. Click on `ashrama_db`
5. Click **"Import"** tab
6. Choose file: `backend-php\sql\schema.sql`
7. Click **"Go"**

---

## 🔧 Step 2: Configure Backend (Optional)

Edit: `C:\xampp\htdocs\ashrama-api\api\config.php`

**Database settings** (already correct for XAMPP):
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'ashrama_db');
define('DB_USER', 'root');
define('DB_PASS', '');  // Empty for XAMPP
```

**For Razorpay** (optional, for testing donations):
```php
define('RAZORPAY_KEY_ID', 'your_test_key');
define('RAZORPAY_KEY_SECRET', 'your_test_secret');
```

Get test keys from: https://razorpay.com

---

## 🎨 Step 3: Start Development Server

### Option A: Using Helper Script (Recommended)
Double-click: **`start-dev.bat`**

### Option B: Manual Start
```powershell
npm run dev
```

You should see:
```
VITE v5.4.19  ready in XXX ms
➜  Local:   http://localhost:5173/
```

---

## 🌐 Step 4: Open in Browser

**Frontend:** http://localhost:5173

**Test these pages:**
- Home - Should load beautifully
- Events - Should show sample events from database
- Trust - Should show trustees
- Contact - Try submitting the form
- Donate - Payment integration (needs Razorpay keys)

---

## 🔍 Testing Backend API

Open these URLs to test:

**Events API:**
http://localhost/ashrama-api/api/events.php?type=upcoming

**Trustees API:**
http://localhost/ashrama-api/api/trustees.php

**Gallery API:**
http://localhost/ashrama-api/api/gallery.php?category=all

You should see JSON responses.

---

## 🔐 Admin Panel

**URL:** http://localhost/ashrama-api/admin/

**Login:**
- Username: `admin`
- Password: `Admin@123`

**Features:**
- Manage Events
- Manage Trustees
- Upload Images
- View Donations
- View Contact Submissions

---

## 🛠️ Troubleshooting

### Issue: "Database connection failed"
**Fix:**
1. Check MySQL is running in XAMPP (green)
2. Verify database `ashrama_db` exists in phpMyAdmin
3. Check `config.php` has correct credentials

### Issue: "Cannot GET /api/events.php"
**Fix:**
1. Check Apache is running in XAMPP (green)
2. Verify files exist in `C:\xampp\htdocs\ashrama-api\`
3. Test: http://localhost/ashrama-api/api/events.php?type=upcoming

### Issue: "CORS error" in browser
**Fix:**
- Already configured in `config.php`
- Make sure you're using `http://localhost/ashrama-api/api` in `api.ts`

### Issue: Frontend shows blank page
**Fix:**
```powershell
# Clear and reinstall
npm install
npm run dev
```

### Issue: Port 5173 already in use
**Fix:**
```powershell
# Use different port
npm run dev -- --port 3000
```

---

## 📦 Production Build

When ready to deploy:

```powershell
# Build
npm run build

# Test build locally
npm run preview
```

Output will be in `dist/` folder.

---

## 🎯 Development Workflow

**Daily routine:**
1. Start XAMPP (Apache + MySQL)
2. Double-click `start-dev.bat`
3. Open http://localhost:5173
4. Start coding!

**Making changes:**
- Frontend changes auto-reload
- Backend changes need browser refresh
- Database changes are instant

---

## 📁 Important Locations

**Frontend:** Current folder
**Backend:** `C:\xampp\htdocs\ashrama-api\`
**Database:** phpMyAdmin → `ashrama_db`
**Uploads:** `C:\xampp\htdocs\ashrama-api\uploads\`

---

## 🎨 Sample Data Included

**Events:**
- Maha Shivaratri (Feb 26, 2025)
- Guru Purnima (Jul 13, 2025)
- Navaratri (Past event)

**Trustees:**
- Sri Rajendra Kumar (President)
- Smt. Lakshmi Devi (Secretary)
- Sri Venkatesh Rao (Treasurer)
- Sri Mahesh Patil (Trustee)

---

## 📞 Quick Commands

```powershell
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for errors
npm run lint
```

---

## ✅ Verification Checklist

After setup, verify:
- [ ] XAMPP Apache running (green)
- [ ] XAMPP MySQL running (green)
- [ ] Database `ashrama_db` created
- [ ] 6 tables imported (events, trustees, gallery, donations, admin_users, contact_submissions)
- [ ] Backend API responds: http://localhost/ashrama-api/api/events.php?type=upcoming
- [ ] Frontend loads: http://localhost:5173
- [ ] Events page shows data
- [ ] Contact form works
- [ ] Admin panel accessible

---

## 🎉 You're All Set!

Your local development environment is ready. Happy coding!

**Need help?** Check the detailed guide: `local_setup_guide.md`
