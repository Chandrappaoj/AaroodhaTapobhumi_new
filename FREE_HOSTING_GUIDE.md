# How to Deploy Sri Aaroodha Tapobhumi to Free Hosting

We will use **InfinityFree** (or any similar cPanel host) because it supports PHP and MySQL perfectly for free.

## Phase 1: Get Your Files Ready
I have already prepared a single file for you to upload:
File: `DEPLOY_THIS.zip`
Location: `c:\Users\ADMIN\.gemini\antigravity\playground\axial-kilonova\sriaaroodatapobhomi-main\`

**(This zip contains your React website, API, Admin Panel, and Database!)**

## Phase 2: Create Free Account
1. Go to **[InfinityFree.net](https://infinityfree.net)** and sign up.
2. Click **Create Account**.
3. Choose a **Subdomain** (e.g., `sri-aaroodha-demo.rf.gd`).
4. Finish the setup. It might take 1-2 minutes for the account to activate.

## Phase 3: Setup Database
1. In InfinityFree Client Area, click **Control Panel** (green button).
2. It might ask you to "Approve" permission (click I Approve).
3. In VistaPanel, look for **MySQL Databases** section.
4. **Create New Database**:
   - Database Name: `ashrama` (it will add a prefix like `epiz_34343_ashrama`).
   - Click **Create Database**.
5. **Note Down Credentials**:
   - **MySQL Hostname** (e.g., `sql200.infinityfree.com`)
   - **MySQL User Name** (e.g., `epiz_34343`)
   - **MySQL Password** (Your VPanel password)
   - **Database Name** (e.g., `epiz_34343_ashrama`)

## Phase 4: Import Data
1. In VistaPanel, click **phpMyAdmin**.
2. Click **Connect Now** (or it logs you in automatically).
3. Select your database on the left.
4. Click **Import** tab.
5. Choose File: `ashrama_db_full_dump.sql` (from inside your project folder or unzip `DEPLOY_THIS.zip` locally to find it).
6. Click **Go**.
   *(If you don't find the sql file separately, right-click `DEPLOY_THIS.zip` -> Extract All... to get it)*

## Phase 5: Upload Files
1. In InfinityFree Client Area, click **File Manager**.
2. Open the **`htdocs`** folder.
3. **Delete** the default `index2.html` or `default.php` if present.
4. Click **Upload** icon (up arrow) -> **Zip File**.
5. Select **`DEPLOY_THIS.zip`**.
6. Once uploaded, right-click `DEPLOY_THIS.zip` and select **Extract** (or Unzip).
7. Ensure all files (`index.html`, `assets`, `api`, `admin`) are directly inside `htdocs` (not inside a subfolder).
   - If they extracted into a folder `DEPLOY_THIS`, go inside -> Select All -> Move -> `opt/htdocs/`.

## Phase 6: Connect Database
1. In File Manager, go to **`admin`** folder.
2. Edit **`db_connect.php`**.
3. Update the credentials with the ones you noted in Phase 3:
   ```php
   $host = 'sql200.infinityfree.com'; // Your specific host
   $dbname = 'epiz_34343_ashrama';    // Your specific db name
   $username = 'epiz_34343';          // Your specific username
   $password = 'your_password';       // Your VPanel password
   ```
4. Save & Close.

## Done! 🚀
Visit your website URL (e.g., `sri-aaroodha-demo.rf.gd`).
- Frontend should load instantly.
- Admin panel is at `/admin/login.php` (login: `admin` / `admin123`).
