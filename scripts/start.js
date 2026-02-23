#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const isWindows = os.platform() === 'win32';

console.log('========================================');
console.log('  Task Management System - Startup');
console.log('========================================');
console.log('');

// Check if Node.js and npm are available
function checkDependencies() {
  return new Promise((resolve, reject) => {
    exec('node --version', (error) => {
      if (error) {
        console.error('[ERROR] Node.js is not installed or not in PATH.');
        console.error('Please install Node.js from https://nodejs.org/');
        reject(error);
        return;
      }
      exec('npm --version', (error) => {
        if (error) {
          console.error('[ERROR] npm is not installed or not in PATH.');
          reject(error);
          return;
        }
        resolve();
      });
    });
  });
}

// Check and install dependencies
function checkNodeModules() {
  return new Promise((resolve) => {
    const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
    if (!fs.existsSync(nodeModulesPath)) {
      console.log('[INFO] Installing dependencies...');
      const install = spawn('npm', ['install'], {
        stdio: 'inherit',
        shell: true,
        cwd: path.join(__dirname, '..'),
      });
      install.on('exit', (code) => {
        if (code === 0) {
          console.log('[SUCCESS] Dependencies installed successfully.');
        } else {
          console.error('[ERROR] Failed to install dependencies.');
          process.exit(1);
        }
        resolve();
      });
    } else {
      resolve();
    }
  });
}

// Check and create .env file
function checkEnvFile() {
  const envPath = path.join(__dirname, '..', 'apps', 'api', '.env');
  const envSamplePath = path.join(__dirname, '..', 'apps', 'api', 'env.sample');
  
  if (!fs.existsSync(envPath)) {
    console.log('[WARNING] .env file not found in apps/api/');
    console.log('[INFO] Creating .env file from env.sample...');
    if (fs.existsSync(envSamplePath)) {
      fs.copyFileSync(envSamplePath, envPath);
      console.log('[SUCCESS] .env file created. Please update it with your configuration.');
    } else {
      console.log('[WARNING] env.sample not found. You may need to create .env manually.');
    }
  }
}

// Kill process on port (cross-platform)
function killPort(port) {
  return new Promise((resolve) => {
    if (isWindows) {
      exec(`netstat -ano | findstr ":${port}"`, (error, stdout) => {
        if (stdout) {
          const lines = stdout.trim().split('\n');
          lines.forEach((line) => {
            const parts = line.trim().split(/\s+/);
            const pid = parts[parts.length - 1];
            if (pid && !isNaN(pid)) {
              exec(`taskkill /PID ${pid} /F`, () => {});
            }
          });
        }
        resolve();
      });
    } else {
      exec(`lsof -ti:${port}`, (error, stdout) => {
        if (stdout) {
          const pids = stdout.trim().split('\n');
          pids.forEach((pid) => {
            exec(`kill -9 ${pid}`, () => {});
          });
        }
        resolve();
      });
    }
  });
}

// Seed database
async function seedDatabase() {
  console.log('');
  console.log('[INFO] Seeding database (if needed)...');
  console.log('[NOTE] Webpack compilation may take 15-30 seconds on first run');
  
  await killPort(3000);
  
  return new Promise((resolve) => {
    const seed = spawn('npx', ['nx', 'run', 'api:seed'], {
      stdio: 'inherit',
      shell: true,
      cwd: path.join(__dirname, '..'),
    });
    
    seed.on('exit', async (code) => {
      await killPort(3000);
      resolve();
    });
  });
}

// Start servers
function startServers() {
  console.log('');
  console.log('[INFO] Starting API server (port 3000)...');
  
  const apiServer = spawn('npx', ['nx', 'serve', 'api'], {
    stdio: 'inherit',
    shell: true,
    cwd: path.join(__dirname, '..'),
    detached: true,
  });
  
  apiServer.unref();
  
  setTimeout(() => {
    console.log('[INFO] Starting Dashboard server (port 4200)...');
    const dashboardServer = spawn('npx', ['nx', 'serve', 'dashboard', '--host=127.0.0.1'], {
      stdio: 'inherit',
      shell: true,
      cwd: path.join(__dirname, '..'),
      detached: true,
    });
    
    dashboardServer.unref();
    
    setTimeout(() => {
      console.log('');
      console.log('========================================');
      console.log('  Servers are starting...');
      console.log('========================================');
      console.log('');
      console.log('API Server:    http://localhost:3000');
      console.log('API Docs:      http://localhost:3000/docs');
      console.log('Dashboard:     http://localhost:4200');
      console.log('');
      console.log('Both servers are running.');
      console.log('To stop servers, run: npm run stop');
      console.log('');
    }, 3000);
  }, 3000);
}

// Main execution
async function main() {
  try {
    await checkDependencies();
    await checkNodeModules();
    checkEnvFile();
    
    console.log('[INFO] Checking if ports 3000 and 4200 are available...');
    await killPort(3000);
    await killPort(4200);
    
    await seedDatabase();
    startServers();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
