#!/usr/bin/env bash
set -e

KEY="$HOME/.ssh/myBackend.pem"
SERVER="ubuntu@174.129.85.139"
APP_DIR="/home/ubuntu/mybackend"
PM2_APP_NAME="node-backend"

ssh -i "$KEY" "$SERVER" << 'EOF'
set -e

export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
fi

# nvm use 24 || nvm use default   # (commented out)

cd "/home/ubuntu/mybackend"

npm ci
pm2 restart "node-backend"
EOF
