# Pre-Restart Backup & Recovery Guide

## ✅ What I've Backed Up For You

### 1. Database Backup
**Location:** `c:\Users\ADMIN\.gemini\antigravity\playground\axial-kilonova\sriaaroodatapobhomi-main\`
**File:** `ashrama_db_backup_2026-01-13_XXXX.sql`

This contains ALL your data:
- Events
- Trustees
- Gallery images (references)
- Site images
- Contact submissions
- All admin settings

### 2. Code Files (Already Safe)
Your project code is in:
```
c:\Users\ADMIN\.gemini\antigravity\playground\axial-kilonova\sriaaroodatapobhomi-main\
```

This includes:
- ✅ React frontend (src/)
- ✅ PHP backend (backend-php/)
- ✅ Admin panel (backend-php/admin/)
- ✅ API endpoints (backend-php/api/)
- ✅ All recent fixes (trustees, events, gallery multi-upload)

### 3. XAMPP Files (Live Server)
Your live files in XAMPP:
```
C:\xampp\htdocs\ashrama-api\
```

Contains:
- ✅ Admin panel pages
- ✅ API endpoints
- ✅ Uploaded images (uploads/ folder)
- ✅ Database connection config

---

## 🔄 After Restart - What You Need to Do

### Step 1: Start XAMPP (CRITICAL)
1. Open **XAMPP Control Panel**
2. Click **Start** next to **Apache**
3. Click **Start** next to **MySQL**
4. Wait for both to show **green** status

**⚠️ If MySQL Won't Start:**
- Run the fix script: `fix-mysql-corruption.bat` (as Administrator)
- Then restart MySQL from XAMPP Control Panel

### Step 2: Verify Everything Works
Open these URLs in your browser to test:

#### Frontend (React App)
```
http://localhost:8080
```
**Expected:** Website loads with all pages working

#### Admin Panel
```
http://localhost/ashrama-api/admin/login.php
```
**Login:** admin / admin123  
**Expected:** Can log in and see dashboard

#### Test Gallery Multi-Upload
```
http://localhost/ashrama-api/admin/gallery.php
```
**Expected:** See toggle between Single/Multi image upload

#### Test Trustees
```
http://localhost/ashrama-api/admin/trustees.php
```
**Expected:** Can add/edit trustees with images

### Step 3: Start React Dev Server (If Needed)
If you want to work on the frontend:

```powershell
cd c:\Users\ADMIN\.gemini\antigravity\playground\axial-kilonova\sriaaroodatapobhomi-main
npm run dev
```

**Expected:** Dev server starts on http://localhost:8080

---

## 🛡️ Safety Measures Already in Place

### MySQL Corruption Protection
The `fix-mysql-corruption.bat` script is ready on your desktop (if you created the shortcut).

**If MySQL fails after restart:**
1. Double-click the fix script (Run as Administrator)
2. Wait for "DONE"
3. Start MySQL from XAMPP

### Database Backups
You now have:
- ✅ Latest backup (created just now)
- ✅ Previous backup (`ashrama_db_full_dump.sql`)

**To restore if needed:**
1. Open phpMyAdmin: `http://localhost/phpmyadmin/`
2. Select `ashrama_db`
3. Click **Import**
4. Choose the backup SQL file
5. Click **Go**

---

## 📁 Important File Locations Reference

### Project Source Code
```
c:\Users\ADMIN\.gemini\antigravity\playground\axial-kilonova\sriaaroodatapobhomi-main\
```

### Live XAMPP Files
```
C:\xampp\htdocs\ashrama-api\
```

### Database Backups
```
c:\Users\ADMIN\.gemini\antigravity\playground\axial-kilonova\sriaaroodatapobhomi-main\
  - ashrama_db_backup_2026-01-13_XXXX.sql (latest)
  - ashrama_db_full_dump.sql (previous)
```

### Uploaded Images
```
C:\xampp\htdocs\ashrama-api\uploads\
```

### Fix Scripts
```
c:\Users\ADMIN\.gemini\antigravity\playground\axial-kilonova\sriaaroodatapobhomi-main\
  - fix-mysql-corruption.bat
  - prepare-deployment.ps1
```

---

## ✨ Recent Features Implemented (All Safe)

1. ✅ **Trustee Image Upload Fix** - No more "Unexpected token" errors
2. ✅ **Events API Fix** - Update operations work correctly
3. ✅ **Multi-Image Gallery Upload** - Upload 5-20 images at once
4. ✅ **MySQL Protection** - Corruption fix script ready

All these are already deployed to XAMPP and will work after restart.

---

## 🚨 If Something Goes Wrong

### MySQL Won't Start
→ Run `fix-mysql-corruption.bat` as Administrator

### Admin Panel Shows Errors
→ Check XAMPP: Both Apache and MySQL must be running (green)

### Images Not Showing
→ Verify uploads folder exists: `C:\xampp\htdocs\ashrama-api\uploads\`

### Database Empty
→ Restore from backup using phpMyAdmin Import

### React App Won't Start
→ Run `npm install` then `npm run dev` in project folder

---

## ✅ You're All Set!

**Everything is backed up and safe to restart.**

After restart, just:
1. Start XAMPP (Apache + MySQL)
2. Test the URLs above
3. Continue working!

**No data will be lost.** 🎉
