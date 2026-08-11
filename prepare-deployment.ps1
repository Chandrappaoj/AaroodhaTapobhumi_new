$ErrorActionPreference = "Stop"

# Create Deployment Folder
$deployDir = "DEPLOY_THIS"
if (Test-Path $deployDir) {
    Remove-Item $deployDir -Recurse -Force
}
New-Item -ItemType Directory -Path $deployDir | Out-Null
Write-Host "Created $deployDir folder"

# 1. Copy Frontend (dist content goes to root)
if (Test-Path "dist") {
    Copy-Item "dist\*" -Destination $deployDir -Recurse -Force
    Write-Host "✅ Copied Frontend (React app)"
}
else {
    Write-Error "dist folder not found! Run 'npm run build' first."
}

# 1.5 Copy .htaccess for SPA Routing
if (Test-Path ".htaccess") {
    Copy-Item ".htaccess" -Destination $deployDir
    Write-Host "✅ Copied .htaccess (Fixes 404 Refresh Errors)"
}

# 2. Copy Backend API
$apiDir = "$deployDir\api"
New-Item -ItemType Directory -Path $apiDir | Out-Null
Copy-Item "backend-php\api\*" -Destination $apiDir -Recurse -Force
# Remove db_connect from api if it accidentally got there (it shouldn't be, but just in case)
# Actually, api references ../admin/db_connect.php, so we need admin folder.
Write-Host "✅ Copied Backend API"

# 3. Copy Backend Admin
$adminDir = "$deployDir\admin"
New-Item -ItemType Directory -Path $adminDir | Out-Null
Copy-Item "backend-php\admin\*" -Destination $adminDir -Recurse -Force
Write-Host "✅ Copied Backend Admin Panel"

# 4. Copy Database Dump
if (Test-Path "ashrama_db_full_dump.sql") {
    Copy-Item "ashrama_db_full_dump.sql" -Destination $deployDir
    Write-Host "✅ Copied Database Dump"
}
else {
    Write-Warning "Database dump not found."
}

# 5. Create Uploads Folder (Empty)
$uploadsDir = "$deployDir\uploads"
New-Item -ItemType Directory -Path $uploadsDir | Out-Null
Write-Host "✅ Created uploads folder"

Write-Host "---------------------------------------------------"
Write-Host "🚀 Deployment Package Ready in '$deployDir' folder!"
Write-Host "---------------------------------------------------"
