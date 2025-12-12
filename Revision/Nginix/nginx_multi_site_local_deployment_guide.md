# 🚀 Nginx Multi‑Site Local Deployment Guide (Node + Static)
This guide combines **two important topics** into one clean document:
1. **How to set up multiple websites locally** (Node.js + static HTML) using Nginx
2. **Why you should NOT modify the main Nginx config file**, and what to do instead

This is the best‑practice method for real servers **and** for local testing.

---

# 📌 Part 1 — How to Set Up Two Local Websites Using Nginx
We will deploy:
- **Site 1 (Node.js app)** at: `site1.local`
- **Site 2 (Static HTML)** at: `site2.local`

Both sites will be completely independent with their own UI and folder.

---

## ✅ Step 1 — Install required tools
```bash
sudo apt update
sudo apt install -y nginx nodejs npm curl
sudo npm install -g pm2   # optional but recommended
```
**What this does:**
- Installs Nginx (server), Node.js, npm, curl
- Installs PM2 (Node process manager) so your Node app keeps running

---

## ✅ Step 2 — Create site folders
```bash
sudo mkdir -p /var/www/site1.local
sudo mkdir -p /var/www/site2.local/html
sudo chown -R $USER:$USER /var/www/site1.local /var/www/site2.local
```
**Why `/var/www`?**
It is the Linux convention for storing website files. Tools, scripts, and documentation expect this.

For local use: you *may* use `~/projects/…` instead.

---

## ✅ Step 3 — Add static site (site2)
```bash
cat > /var/www/site2.local/html/index.html <<'HTML'
<!doctype html>
<html>
<head><meta charset="utf-8"><title>Site 2</title></head>
<body style="font-family:Arial;background:#111;color:#fff;text-align:center;padding-top:70px;">
  <h1>Site 2 — Static HTML</h1>
  <p>Served by Nginx from /var/www/site2.local/html</p>
</body>
</html>
HTML
```
---

## ✅ Step 4 — Create Node.js app (site1)
```bash
cd /var/www/site1.local

cat > package.json <<'JSON'
{
  "name": "site1",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": { "start": "node app.js" },
  "dependencies": { "express": "^4.18.2" }
}
JSON

cat > app.js <<'NODE'
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('<h1>Site 1 — Node App</h1><p>Proxied through Nginx.</p>');
});

app.listen(port, () => console.log(`Site1 running on port ${port}`));
NODE

npm install
```
---

## ✅ Step 5 — Run Node app (local)
### Option A — using PM2
```bash
cd /var/www/site1.local
pm2 start app.js --name site1
pm2 save
```
### Option B — quick run
```bash
nohup node app.js > site1.out 2>&1 &
```
---

## ✅ Step 6 — Create Nginx server blocks
### 📌 Site1: `/etc/nginx/sites-available/site1.local`
```nginx
server {
    listen 80;
    server_name site1.local;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 📌 Site2: `/etc/nginx/sites-available/site2.local`
```nginx
server {
    listen 80;
    server_name site2.local;

    root /var/www/site2.local/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```
---

## ✅ Step 7 — Enable the sites
```bash
sudo ln -s /etc/nginx/sites-available/site1.local /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/site2.local /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
```
**Why?**  
Nginx uses `sites-enabled` to know which sites are active. Symlinks make it easy to enable/disable sites.

---

## ✅ Step 8 — Test and reload Nginx
```bash
sudo nginx -t
sudo systemctl reload nginx   # or: sudo service nginx restart
```
---

## ✅ Step 9 — Map domains locally
Edit Windows hosts (if using browser on Windows):  
`C:\Windows\System32\drivers\etc\hosts`

Or on WSL/Linux: `/etc/hosts`.

Add:
```
127.0.0.1   site1.local
127.0.0.1   site2.local
```
Now open in browser:
- http://site1.local
- http://site2.local

---

# 📌 Part 2 — Why You Should NOT Modify `nginx.conf`
Many beginners think they must put all website settings inside:
```
/etc/nginx/nginx.conf
```
**This is WRONG.** Here’s why.

---

## ❌ 1. You will break global Nginx config
`nginx.conf` controls:
- worker processes
- logging
- global http settings
- performance tuning
- gzip, keepalive, event loops

If you put site configs here, you risk:
- syntax errors	affecting entire server
- Nginx refusing to start
- complicated debugging

---

## ❌ 2. You cannot manage multiple websites cleanly
If everything is inside one big file:
- You cannot disable a site easily
- You cannot swap site configs
- Hard to see which block belongs to which site
- Deploying multiple domains becomes messy

---

## ❌ 3. Updates and scripts expect the default structure
Ubuntu/Debian Nginx uses:
```
/etc/nginx/nginx.conf
/etc/nginx/sites-available/
/etc/nginx/sites-enabled/
```
If you break this structure, automated tools (Certbot, monitoring, deploy scripts) will fail.

---

# ✔️ Correct Way: Use Separate Server Block Files
Example:
```
/etc/nginx/sites-available/site1.local
/etc/nginx/sites-available/site2.local
```
Then enable:
```bash
sudo ln -s /etc/nginx/sites-available/site1.local /etc/nginx/sites-enabled/
```
This is clean, modular, and supports unlimited websites.

---

# 🎯 Final Summary
- **YES**, you must change Nginx config,  
  **but NEVER edit `nginx.conf` for websites**.
- Each site gets its own file in `sites-available`.
- Node site = reverse proxy to port 3000.  
- Static site = served directly.
- Hosts file maps `.local` domains.
- This setup works the same locally and in production.

---

If you want, I can also add:
✅ HTTPS for local using mkcert  
✅ Diagram of request flow  
✅ Deployment-ready folder structure

Just tell me!

