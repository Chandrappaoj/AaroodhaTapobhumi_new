# 🚀 Deployment Guide: Sri Aaroodha Tapobhumi to Interserver.net

This guide covers how to deploy your **React Frontend**, **PHP Admin Panel**, and **MySQL Database** to **Interserver.net** (or any cPanel hosting).

---

## ✅ Phase 1: Prepare Your Files (Local)

1.  **Build Frontend:**
    Open your terminal in VS Code and run:
    ```powershell
    npm run build
    ```
    *(This creates a fresh `dist` folder with your latest changes)*

2.  **Backup Database:**
    Open your terminal and run:
    cmd /c "C:\xampp\mysql\bin\mysqldump.exe -u root ashrama_db > ashrama_prod_db.sql"
    ```
    *(Using `cmd /c` ensures standard encoding, avoiding PowerShell's default UTF-16 issue)*

3.  **Create Deployment Package:**
    I have a script for this. Run:
    ```powershell
    powershell -ExecutionPolicy Bypass -File prepare-deployment.ps1
    ```
    This creates a folder **`DEPLOY_THIS`** and zips it into **`DEPLOY_THIS.zip`**.
    
    **What's inside `DEPLOY_THIS.zip`?**
    - `index.html`, `assets/` (Your website)
    - `admin/` (Your admin panel)
    - `api/` (Your backend)
    - `ashrama_db_full_dump.sql` (Your database)

---

## 🌍 Phase 2: Setup Database (Interserver cPanel)

1.  **Login to cPanel** (Interserver usually gives you cPanel access).
2.  Go to **DATABASES** section → Click **MySQL® Database Wizard**.
3.  **Step 1: Create Database**
    - Name: `ashrama` (It will become something like `youruser_ashrama`)
    - Click **Next Step**.
4.  **Step 2: Create User**
    - Username: `admin` (It will become `youruser_admin`)
    - Password: **GeneraTe_A_Str0ng_P@ssw0rd** (Copy this somewhere safe!)
    - Click **Create User**.
5.  **Step 3: Add User to Database**
    - Check **ALL PRIVILEGES**.
    - Click **Next Step**.
    
    ✅ **Note down these 3 things:**
    - Database Name: `youruser_ashrama`
    - Database User: `youruser_admin`
    - Database Password: `YourPassword...`

---

## 📥 Phase 3: Import Database

1.  Go back to cPanel Dashboard.
2.  Click **phpMyAdmin** (under DATABASES).
3.  Click on your new database name (left sidebar).
4.  Click **Import** tab (top menu).
5.  Click **Choose File** and select `ashrama_prod_db.sql` (from Phase 1).
6.  Click **Go** (bottom right).
    *(You will see "Import has been successfully finished" message)*

---

## ☁️ Phase 4: Upload Files

1.  Go to cPanel Dashboard.
2.  Click **File Manager** (under FILES).
3.  Open the **`public_html`** folder.
    *(If there are default files like `default.php` or `cgi-bin`, you can ignore or delete them. `public_html` is your main website root)*.
4.  Click **Upload** (top menu).
5.  Select **`DEPLOY_THIS.zip`** (from Phase 1).
6.  Once 100% complete, go back to File Manager.
7.  Right-click `DEPLOY_THIS.zip` → **Extract**.
8.  **Move Files:**
    - If it extracts into a subfolder (e.g., `DEPLOY_THIS/`), go inside it.
    - **Select All** files.
    - Click **Move**.
    - Change path to: `/public_html/`
    - Click **Move Files**.
    *(Now your `index.html`, `admin`, `api` folders should be directly inside `public_html`)*.

---

## 🔌 Phase 5: Connect Database

1.  In File Manager (`public_html`), open `admin` folder.
2.  Right-click `db_connect.php` → **Edit**.
3.  Update the credentials with what you noted in Phase 2:
    ```php
    $host = 'localhost';             // Usually 'localhost' on cPanel/Interserver
    $dbname = 'youruser_ashrama';    // Your cPanel DB Name
    $username = 'youruser_admin';    // Your cPanel DB User
    $password = 'YourPassword...';   // Your cPanel DB Password
    ```
4.  Click **Save Changes**.

5.  **IMPORANT:** Also update `api/config.php`:
    - Open `api` folder -> right-click `config.php` -> **Edit**.
    - Update the database credentials there as well (DB_NAME, DB_USER, DB_PASS).
    - Save Changes.

---

## 🎉 Done! Verification
Visit your domain (e.g., `www.yourdomain.com`).
- **Website:** Should load correctly.
- **Admin:** `www.yourdomain.com/admin/login.php` (Login: `admin` / `admin123`).

---

# 🔄 Handling Future Updates (Maintenance)

When you make code changes locally and want to update the live server:

### Scenario A: Frontend Changes Only (React Design/Text)
1. Run `npm run build` locally.
2. Go to cPanel **File Manager** → `public_html`.
3. Upload and replace: `index.html` and the `assets` folder.
   *(Delete old `assets` folder first to keep it clean)*.

### Scenario B: Backend Logic Changes (PHP/API)
1. If you changed an API file (e.g., `api/admin/trustees.php`), just upload that specific file to `/public_html/api/admin/`.
2. If you changed Admin UI, upload file to `/public_html/admin/`.

### Scenario C: Database Changes (New Tables/Columns)
1. Export ONLY the structure or the new table from local phpMyAdmin.
2. Import it into live phpMyAdmin.
   *(Avoid dropping/overwriting the live database if you have real user data collected on the site!)*

### Scenario D: "I want to update EVERYTHING" (The big update)
1. **Backup Live Site:** In cPanel, zip your `public_html` content and download it (safety first!).
2. **Local Build:** Run `npm run build` & `prepare-deployment.ps1`.
3. **Upload:** Upload the new `DEPLOY_THIS.zip`.
4. **Extract & Overwrite:** Extract and overwrite existing files.
   *(Your `db_connect.php` might be overwritten, so you'll need to **re-enter the password** in it, OR just don't overwrite `admin/db_connect.php`)*.
