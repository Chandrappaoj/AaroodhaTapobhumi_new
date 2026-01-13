@echo off
echo ================================================
echo   Updating Events Table Schema
echo ================================================
echo.
echo This will add new bilingual fields to your events table:
echo - title_kn (Kannada title)
echo - location_kn (Kannada location)
echo - description_kn (Kannada description)
echo - is_featured (Featured event flag)
echo.
echo ================================================
echo.

REM Check if MySQL is accessible
where mysql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: MySQL command not found!
    echo.
    echo Please use one of these methods instead:
    echo 1. Open phpMyAdmin
    echo 2. Go to your database (ashrama_db)
    echo 3. Click SQL tab
    echo 4. Copy and paste the contents of: backend-php\sql\update_events_schema.sql
    echo 5. Click Go
    echo.
    pause
    exit /b 1
)

echo Running SQL update...
echo.

mysql -u root -p ashrama_db < backend-php\sql\update_events_schema.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ================================================
    echo   SUCCESS! Database updated successfully!
    echo ================================================
    echo.
    echo Next steps:
    echo 1. Go to admin panel: http://localhost/ashrama-admin/
    echo 2. Click on Events
    echo 3. Add a new event with bilingual fields
    echo 4. Check the website to see it display correctly!
    echo.
) else (
    echo.
    echo ================================================
    echo   ERROR: Database update failed!
    echo ================================================
    echo.
    echo Please try using phpMyAdmin instead:
    echo 1. Open http://localhost/phpmyadmin
    echo 2. Select ashrama_db database
    echo 3. Click SQL tab
    echo 4. Copy contents from: backend-php\sql\update_events_schema.sql
    echo 5. Click Go
    echo.
)

pause
