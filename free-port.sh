#!/bin/bash

# Free a specific port (default: 3000)
PORT=${1:-3000}

echo "Freeing port $PORT..."

# Find and kill process on port
PID=$(lsof -ti:$PORT 2>/dev/null)

if [ ! -z "$PID" ]; then
    echo "Killing process $PID on port $PORT..."
    kill -9 $PID 2>/dev/null
    if [ $? -eq 0 ]; then
        echo "[SUCCESS] Process $PID terminated."
    else
        echo "[WARNING] Could not kill process $PID."
    fi
else
    echo "No process found on port $PORT."
fi

sleep 1
echo "[SUCCESS] Port $PORT should now be free."
