@echo off
echo ========================================
echo   Task Management System - Shutdown
echo ========================================
echo.

echo [INFO] Stopping servers on ports 3000 and 4200...

REM Kill processes on port 3000
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000"') do (
    echo [INFO] Stopping process on port 3000 (PID: %%a)...
    taskkill /PID %%a /F >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo [SUCCESS] Port 3000 freed.
    ) else (
        echo [WARNING] Could not stop process on port 3000.
    )
)

REM Kill processes on port 4200
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":4200"') do (
    echo [INFO] Stopping process on port 4200 (PID: %%a)...
    taskkill /PID %%a /F >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo [SUCCESS] Port 4200 freed.
    ) else (
        echo [WARNING] Could not stop process on port 4200.
    )
)

echo.
echo [SUCCESS] All servers stopped.
echo.
pause
