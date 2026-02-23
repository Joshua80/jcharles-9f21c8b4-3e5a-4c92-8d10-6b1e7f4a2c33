@echo off
echo ========================================
echo   Task Management System - Startup
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed or not in PATH.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed or not in PATH.
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo [INFO] Installing dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install dependencies.
        pause
        exit /b 1
    )
    echo [SUCCESS] Dependencies installed successfully.
    echo.
)

REM Check if .env file exists for API
if not exist "apps\api\.env" (
    echo [WARNING] .env file not found in apps\api\
    echo [INFO] Creating .env file from env.sample...
    if exist "apps\api\env.sample" (
        copy "apps\api\env.sample" "apps\api\.env" >nul
        echo [SUCCESS] .env file created. Please update it with your configuration.
    ) else (
        echo [WARNING] env.sample not found. You may need to create .env manually.
    )
    echo.
)

REM Check if ports are in use
echo [INFO] Checking if ports 3000 and 4200 are available...
netstat -ano | findstr ":3000" >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [WARNING] Port 3000 is already in use. Attempting to free it...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000"') do (
        taskkill /PID %%a /F >nul 2>&1
    )
    timeout /t 2 /nobreak >nul
)

netstat -ano | findstr ":4200" >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [WARNING] Port 4200 is already in use. Attempting to free it...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":4200"') do (
        taskkill /PID %%a /F >nul 2>&1
    )
    timeout /t 2 /nobreak >nul
)

echo.
echo [INFO] Starting API server (port 3000)...
start "API Server" cmd /k "npx nx serve api"
timeout /t 3 /nobreak >nul

echo [INFO] Starting Dashboard server (port 4200)...
start "Dashboard Server" cmd /k "npx nx serve dashboard --host=127.0.0.1"
timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo   Servers are starting...
echo ========================================
echo.
echo API Server:    http://localhost:3000
echo API Docs:      http://localhost:3000/api
echo Dashboard:     http://localhost:4200
echo.
echo Both servers are running in separate windows.
echo Close those windows to stop the servers.
echo.
echo Press any key to exit this window (servers will continue running)...
pause >nul
