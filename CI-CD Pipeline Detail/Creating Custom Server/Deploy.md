# 🚀 Custom CI/CD Server Documentation

This repository documents a **fully custom CI/CD pipeline** built **without GitHub Actions**.  
The system uses **GitHub Webhooks**, a **custom Node.js CI/CD server**, and **secure SSH-based deployment** to deploy applications on a target server.

---

## 📌 Overview

**Goal:**  
Automatically test and deploy a Node.js application when code is pushed to GitHub.

**Key Highlights:**
- No GitHub Actions
- Custom webhook server
- Secure SSH-based deployment
- Test-first, deploy-only-on-success
- Email notifications on failure

---

## 🏗 Architecture Flow

GitHub Push Event
↓
GitHub Webhook
↓
Custom CI/CD Server (Server A)
↓
Run Tests (test.sh)
↓
SSH into App Server (Server B)
↓
Deploy Application (deploy.sh)
↓
Restart App using PM2
---

## 🧩 Components

### 1️⃣ GitHub Repository
- Source code hosted on GitHub
- Webhook configured for `push` events

---

### 2️⃣ Custom CI/CD Server (Server A)
- Node.js server listening for GitHub webhooks
- Verifies webhook signature
- Executes CI/CD logic
- Runs test scripts
- SSH into deployment server

---

### 3️⃣ Application Server (Server B)
- Hosts the production application
- Receives SSH commands
- Pulls latest code
- Installs dependencies
- Restarts application using PM2

---

## 🔐 Environment Variables (`.env`)

Create a `.env` file in the **CI/CD Server (Server A)** root.

```env
# ===============================
# GitHub Webhook Configuration
# ===============================
GITHUB_WEBHOOK_SECRET=your_github_webhook_secret

# ===============================
# Server Configuration
# ===============================
PORT=9000
NODE_ENV=production

# ===============================
# ===============================
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=example@gmail.com
SMTP_PASS=app_password
ALERT_EMAIL=admin@example.com

GITHUB_WEBHOOK_SECRET=this_is_my_secret
SSH_KEY="$HOME/.ssh/myBackend.pem"
SERVER=ubuntu@xx.xx.xx.xx
APP_DIR=/home/ubuntu/nodeJsBackend/backend
PM2_APP_NAME=app

EMAIL_USER=example@gmail.com
EMAIL_PASS=app_password
EMAIL_TO=adminEmail@gmail.com
```