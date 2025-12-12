
## 1. Initial access — log in as root (Hostinger VPS)

---

### Deploy Application on VPS — Runbook

This runbook is a step-by-step guide to set up a VPS, install required services, deploy a Next.js app, and secure the server.



```bash
ssh root@YOUR_SERVER_IP
# or, if using a custom port:
ssh -p 22 root@YOUR_SERVER_IP
```

## 2. Update system & install base tools (as root)

Update packages and install essential tools:

- Anything that is SYSTEM-WIDE or a SERVICE → install as root
- Anything that is APP-LEVEL or PROCESS-LEVEL → run as NON-ROOT user
```bash
apt update && apt upgrade -y

apt install -y \
  nginx \
  git \
  curl \
  Mongodb
  nodejs 
```

These tools are installed as root because they are global system services/utilities.

## 3. Install Node.js (system level, as root)

Use NodeSource for a modern Node version:
### https://nodejs.org/en/download


```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

node -v
npm -v
```

Node.js is installed system-wide, but the app will run under the `shubham` user.


## 4. Install MongoDB (system level, as root) If required 
https://github.com/code-with-ShubhamS/system-infrastructure/Install-MongoDB-On_VPS.md

## 5. Create a non-root user for daily work

Create a user (example: `shubham`) and give it `sudo` access:

```bash
adduser shubham
# follow prompts to set a strong password

usermod -aG sudo shubham

# verify
id shubham
```
Test sudo access:
```
su - deploy
sudo -v
exit
```
Why: running app-level tasks under a non-root user limits blast radius if something goes wrong.

## 6. Configure SSH key login for the new user which we created in step 3

4.1 Generate SSH key on your local machine (if needed):
if you don't set password than you need to set the key in local and copy public key and do 4.2 steps
```bash
ssh-keygen -t ed25519 -C "vps-main-key"
# press Enter for defaults

cat ~/.ssh/id_ed25519.pub
# copy the public key
```

4.2 Add the public key to `shubham` on the VPS (as root):

```bash
su - shubham

mkdir -p ~/.ssh
chmod 700 ~/.ssh

nano ~/.ssh/authorized_keys
# paste the public key

chmod 600 ~/.ssh/authorized_keys
```

Test login from your local machine:

```bash
ssh shubham@YOUR_SERVER_IP
# or: ssh -p 22 shubham@YOUR_SERVER_IP
```

You should be able to log in using the SSH key (no password).


## 7. Harden SSH — disable direct root login

Log in as `shubham` and escalate to root when needed:

```bash
ssh shubham@YOUR_SERVER_IP
sudo -i
```

Edit `/etc/ssh/sshd_config` and ensure these settings:

```text
Port 22                      # change later if you want a custom port
PermitRootLogin no           # disable direct root SSH login  !imp
PasswordAuthentication no    # only allow key-based auth !imp
PubkeyAuthentication yes
AllowUsers shubham           # restrict SSH to this user
MaxAuthTries 3               # limit brute-force attempts
LoginGraceTime 30
```

Restart SSH:

```bash
systemctl restart ssh
```

From now on: root cannot SSH directly; `shubham` logs in with an SSH key and can escalate with `sudo -i`.

## 8. Configure UFW firewall as root 

```bash
# 1. Allow SSH FIRST
sudo ufw allow OpenSSH
# OR explicitly
# sudo ufw allow 22/tcp

# 2. Allow web traffic
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# 3. Enable firewall
sudo ufw enable

# 4. Verify
sudo ufw status verbose

```
### 🚪 Exit Server

```bash
exit
```


## 9 Deploy the Application 

1. Push your project to a private repo.
2. Create SSH key on vps server:

```bash
ssh-keygen -t ed25519 -C "you@example.com"
cat ~/.ssh/id_ed25519.pub
```

3. Paste key in GitHub > Settings > Deploy Keys.
4. Clone repo:

```bash
git clone git@github.com:username/repo.git
cd YOUR_REPO
nano .env
By using curl -i localhost:3000 check that it was running or not and than stop it.
---

```bash
ssh shubham@YOUR_SERVER_IP

# (optional) confirm node/npm are available
node -v
npm -v
```

## 10 Running Application using pm2 cluster
- zero downtime while deploying and reloading application.
- Better handling of traffic spikes
- Easy horizontal scaling (no redeploy).
  You can scale without touching code:
- 2+ cores → cluster is recommended.
- In-memory cache → inconsistent data

``` bash
# install PM2 globally (as user)
npm install -g pm2
pm2 -v
cd ~/apps/REPO

# Build (only needed when you update code):
npm install
npm run build

# Option A (recommended): auto = number of CPU cores
pm2 start npm --name "next-app" -i max -- start -- -p 3000

# Option B: fixed number of instances (example 2)
pm2 start npm --name "next-app" -i 2 -- start -- -p 3000

# Check:
pm2 status
pm2 logs next-app --lines 200


# Enable PM2 startup (auto start after reboot)
pm2 startup
# Copy the printed command and run it (it will need sudo), example:
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u shubham --hp /home/shubham

# Save current process list
pm2 save

✅ Now your cluster workers auto-start after reboot.

# Useful cluster commands
# reload all workers with near-zero downtime
pm2 reload next-app

# scale up/down (cluster only)
pm2 scale next-app 4
pm2 scale next-app 2

# restart
pm2 restart next-app

```

## 11 Configure Nginx reverse proxy (as root)

Create an Nginx server block to forward public traffic to the app:

```bash
sudo nano /etc/nginx/sites-available/yourdomain.com
```

Example Nginx config:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Disable the default site (optional) and enable the new site:

```bash
sudo rm /etc/nginx/sites-enabled/default 2>/dev/null || true
sudo ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/yourdomain.com

sudo nginx -t  it will show sucessfull test if you ngnix is set properly
sudo systemctl.reload nginx
```

Now `http://yourdomain.com` will proxy to the app at `127.0.0.1:3000`.

## 14 Point Your Domain

Login to your domain registrar > DNS Management:

```
Type    Name    Value             TTl 
A       @       YOUR_SERVER_IP    14400
A       www     YOUR_SERVER_IP    300
AAAA    @       YOUR_IPV6         14400
AAAA    www     YOUR_IPV6
```

## 13. Enable HTTPS with Let’s Encrypt (Certbot)

13.1 Install Certbot Nginx plugin:

Used snap to apply ssl its a new way do deploy application
https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal

sudo apt update
sudo apt install snapd

- Remove certbot-auto and any Certbot OS package
sudo apt-get remove certbot
- Install Certbot
sudo snap install --classic certbot
- Prepare the Certbot command
sudo ln -s /snap/bin/certbot /usr/bin/certbot
- Run this command to get a certificate and have Certbot edit your nginx configuration automatically to serve it, turning on HTTPS access in a single step.
sudo certbot --nginx
- Test automatic renewal
sudo certbot renew --dry-run

The command to renew certbot is installed in one of the following locations:

/etc/crontab/
/etc/cron.*/*
systemctl list-timers


## 14. Final structure & why it is safe

What runs as root:

- OS and package management
- Nginx (system service)
- mongod (system service)
- UFW, SSH, base utilities

What runs as non-root (`shubham`):

- Next.js application
- PM2 process manager
- Git operations and app-level configuration

Security benefits:

- Direct root SSH disabled
- SSH key authentication only
- Firewall locked down to minimal public ports (22, 80, 443)
- MongoDB accessible only from localhost
- Node app proxied behind Nginx (not directly exposed)
- SSL enforced via Let’s Encrypt
- PM2 provides process management and startup recovery

This setup reduces risk by restricting permissions, limiting exposed services, and clearly separating system and application responsibilities.


# Now i am sujjesting you to go to these two url if you want something in detail 
1. https://github.com/GreatStackDev/notes/blob/main/Deploy_MERN_on_VPS.md
2. https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal