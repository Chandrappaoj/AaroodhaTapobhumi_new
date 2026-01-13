@echo off
echo ==========================================
echo    MySQL Corruption Fix Tool for XAMPP
echo ==========================================
echo.
echo This script effectively fixes "Future log sequence number" errors
echo by removing corrupted InnoDB log files so they can be recreated.
echo.

echo 1. Stopping any running MySQL processes...
taskkill /F /IM mysqld.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo.
echo 2. Navigate to Data Directory...
cd /d "C:\xampp\mysql\data"
if %errorlevel% neq 0 (
    echo ERROR: Could not find C:\xampp\mysql\data
    echo Please verify your XAMPP installation path.
    pause
    exit /b
)

echo.
echo 3. Archiving corrupted log files...

if exist ib_logfile0 (
    ren ib_logfile0 ib_logfile0.bak.%random%
    echo - Archived ib_logfile0
) else (
    echo - ib_logfile0 not found (already removed?)
)

if exist ib_logfile1 (
    ren ib_logfile1 ib_logfile1.bak.%random%
    echo - Archived ib_logfile1
) else (
    echo - ib_logfile1 not found (already removed?)
)

echo.
echo ==========================================
echo    DONE!
echo ==========================================
echo.
echo Please go to XAMPP Control Panel and click "Start" next to MySQL.
echo It should start successfully now.
echo.
pause
