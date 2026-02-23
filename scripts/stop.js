#!/usr/bin/env node

const { exec } = require('child_process');
const os = require('os');

const isWindows = os.platform() === 'win32';

console.log('========================================');
console.log('  Task Management System - Shutdown');
console.log('========================================');
console.log('');

console.log('[INFO] Stopping servers on ports 3000 and 4200...');

// Kill process on port (cross-platform)
function killPort(port) {
  return new Promise((resolve) => {
    if (isWindows) {
      exec(`netstat -ano | findstr ":${port}"`, (error, stdout) => {
        if (stdout) {
          const lines = stdout.trim().split('\n');
          let found = false;
          lines.forEach((line) => {
            const parts = line.trim().split(/\s+/);
            const pid = parts[parts.length - 1];
            if (pid && !isNaN(pid)) {
              found = true;
              console.log(`[INFO] Stopping process on port ${port} (PID: ${pid})...`);
              exec(`taskkill /PID ${pid} /F`, (error) => {
                if (!error) {
                  console.log(`[SUCCESS] Port ${port} freed.`);
                } else {
                  console.log(`[WARNING] Could not stop process on port ${port}.`);
                }
              });
            }
          });
          if (!found) {
            console.log(`[INFO] No process found on port ${port}.`);
          }
        } else {
          console.log(`[INFO] No process found on port ${port}.`);
        }
        resolve();
      });
    } else {
      exec(`lsof -ti:${port}`, (error, stdout) => {
        if (stdout) {
          const pids = stdout.trim().split('\n');
          pids.forEach((pid) => {
            console.log(`[INFO] Stopping process on port ${port} (PID: ${pid})...`);
            exec(`kill -9 ${pid}`, (error) => {
              if (!error) {
                console.log(`[SUCCESS] Port ${port} freed.`);
              } else {
                console.log(`[WARNING] Could not stop process on port ${port}.`);
              }
            });
          });
        } else {
          console.log(`[INFO] No process found on port ${port}.`);
        }
        resolve();
      });
    }
  });
}

// Main execution
async function main() {
  await killPort(3000);
  await killPort(4200);
  
  console.log('');
  console.log('[SUCCESS] All servers stopped.');
  console.log('');
}

main();
