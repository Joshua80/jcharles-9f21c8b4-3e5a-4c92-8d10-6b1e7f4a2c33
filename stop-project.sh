#!/bin/bash

echo "========================================"
echo "  Task Management System - Shutdown"
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "[INFO] Stopping servers on ports 3000 and 4200..."

# Function to kill process on port
kill_port() {
    local port=$1
    local pids=$(lsof -ti:$port 2>/dev/null)
    
    if [ ! -z "$pids" ]; then
        for pid in $pids; do
            echo "[INFO] Stopping process on port $port (PID: $pid)..."
            kill -9 $pid 2>/dev/null
            if [ $? -eq 0 ]; then
                echo -e "${GREEN}[SUCCESS] Port $port freed.${NC}"
            else
                echo -e "${YELLOW}[WARNING] Could not stop process on port $port.${NC}"
            fi
        done
    else
        echo "[INFO] No process found on port $port."
    fi
}

# Kill processes on ports
kill_port 3000
kill_port 4200

echo ""
echo -e "${GREEN}[SUCCESS] All servers stopped.${NC}"
echo ""
