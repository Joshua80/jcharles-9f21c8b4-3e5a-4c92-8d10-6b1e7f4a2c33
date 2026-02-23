#!/bin/bash

echo "========================================"
echo "  Task Management System - Startup"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}[ERROR] Node.js is not installed or not in PATH.${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}[ERROR] npm is not installed or not in PATH.${NC}"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "[INFO] Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}[ERROR] Failed to install dependencies.${NC}"
        exit 1
    fi
    echo -e "${GREEN}[SUCCESS] Dependencies installed successfully.${NC}"
    echo ""
fi

# Check if .env file exists for API
if [ ! -f "apps/api/.env" ]; then
    echo -e "${YELLOW}[WARNING] .env file not found in apps/api/${NC}"
    echo "[INFO] Creating .env file from env.sample..."
    if [ -f "apps/api/env.sample" ]; then
        cp "apps/api/env.sample" "apps/api/.env"
        echo -e "${GREEN}[SUCCESS] .env file created. Please update it with your configuration.${NC}"
    else
        echo -e "${YELLOW}[WARNING] env.sample not found. You may need to create .env manually.${NC}"
    fi
    echo ""
fi

# Function to kill process on port
kill_port() {
    local port=$1
    local pid=$(lsof -ti:$port 2>/dev/null)
    if [ ! -z "$pid" ]; then
        echo "[WARNING] Port $port is already in use. Attempting to free it..."
        kill -9 $pid 2>/dev/null
        sleep 2
    fi
}

# Check and free ports
echo "[INFO] Checking if ports 3000 and 4200 are available..."
kill_port 3000
kill_port 4200

# Seed the database
echo ""
echo "[INFO] Seeding database with initial data..."
kill_port 3000
echo "[INFO] Running database seeder..."
if npx nx run api:seed; then
    echo -e "${GREEN}[SUCCESS] Database seeding completed.${NC}"
else
    echo -e "${YELLOW}[WARNING] Seeder may have failed, but continuing...${NC}"
fi
kill_port 3000
sleep 1

# Start servers in background
echo ""
echo "[INFO] Starting API server (port 3000)..."
npx nx serve api > /dev/null 2>&1 &
API_PID=$!
sleep 3

echo "[INFO] Starting Dashboard server (port 4200)..."
npx nx serve dashboard --host=127.0.0.1 > /dev/null 2>&1 &
DASHBOARD_PID=$!
sleep 3

echo ""
echo "========================================"
echo "  Servers are starting..."
echo "========================================"
echo ""
echo "API Server:    http://localhost:3000"
echo "API Docs:      http://localhost:3000/docs"
echo "Dashboard:     http://localhost:4200"
echo ""
echo "Server PIDs:"
echo "  - API: $API_PID"
echo "  - Dashboard: $DASHBOARD_PID"
echo ""
echo "To stop servers, run: ./stop-project.sh"
echo "Or kill processes: kill $API_PID $DASHBOARD_PID"
echo ""
