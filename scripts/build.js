// This script is used by Vercel to build the application
// It combines both frontend and backend builds

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

async function build() {
  console.log('Starting build process...');
  
  try {
    // Build frontend
    console.log('Building frontend...');
    await execAsync('vite build');
    console.log('Frontend build completed.');
    
    // Build backend
    console.log('Building backend...');
    await execAsync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist');
    console.log('Backend build completed.');
    
    console.log('Build process completed successfully.');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();