@echo off
echo ========================================
echo MySQL/MariaDB Aria Recovery Fix
echo ========================================
echo.

echo Step 1: Stopping MySQL...
cd /d C:\xampp
mysql_stop.bat
timeout /t 3 /nobreak >nul

echo.
echo Step 2: Deleting corrupted Aria log files...
del /F /Q "C:\xampp\mysql\data\aria_log.*"

echo.
echo Step 3: Fixing file permissions...
icacls "C:\xampp\mysql\data" /grant Users:F /T >nul 2>&1

echo.
echo Step 4: Starting MySQL...
mysql_start.bat
timeout /t 5 /nobreak >nul

echo.
echo ========================================
echo Fix Complete!
echo ========================================
echo.
echo Please check XAMPP Control Panel to verify MySQL is running.
echo Then try accessing: http://localhost/phpmyadmin
echo.
pause
