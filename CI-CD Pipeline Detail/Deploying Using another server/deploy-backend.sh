#!/usr/bin/env bash

set -e

KEY="$HOME/.ssh/myBackend.pem"
echo "$APP_DIR $SERVER APP_DIR"
ssh -i "$KEY" "$SERVER" \
"APP_DIR='$APP_DIR' PM2_APP_NAME='$PM2_APP_NAME' bash -s" <<'EOF'

set -e
echo "running command"
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
fi

# nvm use 24 || nvm use default   # (commented out)

cd "$APP_DIR"
git pull
npm ci
pm2 reload "$PM2_APP_NAME"
EOF

echo "Deployment done" 