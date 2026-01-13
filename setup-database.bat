@echo off
echo ========================================
echo Sri Aaroodha Tapobhomi - Database Setup
echo ========================================
echo.
echo This will open phpMyAdmin in your browser.
echo.
echo STEPS TO FOLLOW:
echo 1. Click "New" in left sidebar
echo 2. Database name: ashrama_db
echo 3. Collation: utf8mb4_unicode_ci
echo 4. Click "Create"
echo 5. Click on ashrama_db
echo 6. Click "Import" tab
echo 7. Choose file: backend-php\sql\schema.sql
echo 8. Click "Go"
echo.
echo Press any key to open phpMyAdmin...
pause >nul

start http://localhost/phpmyadmin

echo.
echo After importing, press any key to test the API...
pause >nul

start http://localhost/ashrama-api/api/events.php?type=upcoming

echo.
echo Done! Check if you see JSON data in the browser.
pause
