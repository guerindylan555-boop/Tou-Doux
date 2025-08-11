#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const bin = require.resolve('@neondatabase/mcp/bin/neon-mcp');

const child = spawn(process.execPath, [bin], {
  stdio: 'inherit',
  env: process.env,
});

child.on('exit', (code) => process.exit(code ?? 0));
