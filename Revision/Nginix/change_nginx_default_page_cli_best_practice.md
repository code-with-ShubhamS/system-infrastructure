# Change Nginx default page (CLI) — Best practice

This document shows the clean, safe, and production-friendly way to change the default Nginx page using the CLI. It includes commands, a sample `index.html`, testing steps, reasons why you should **not** modify the stock default files/folder, and what can happen if you do.

---

## 1. Create your site folder (recommended)
```bash
sudo mkdir -p /var/www/mywebsite
sudo chown -R $USER:$USER /var/www/mywebsite
```
> Creates a dedicated folder for your site and gives your user ownership so you can edit files without requiring `root` for every change.


## 2. Add your custom `index.html`
Create and open the file:

```bash
nano /var/www/mywebsite/index.html
```

Paste this example and save (Ctrl+O, Enter, Ctrl+X):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>My Custom Nginx Page</title>
  <style>
    body { font-family: Arial, sans-serif; background:#111; color:#fff; display:flex; align-items:center; justify-content:center; height:100vh; margin:0; }
    .box { text-align:center; padding:30px; background:#222; border-radius:8px; box-shadow:0 4px 18px rgba(0,0,0,0.6); }
  </style>
</head>
<body>
  <div class="box">
    <h1>Hello! This is my custom default page 🚀</h1>
    <p>Served using Nginx</p>
  </div>
</body>
</html>
```


## 3. Update the default server block to use your folder
Open the default site config:

```bash
sudo nano /etc/nginx/sites-available/default
```

Find the line that says `root /var/www/html;` and change it to:

```
root /var/www/mywebsite;
index index.html;
```

Save and exit.


## 4. Test the Nginx configuration
Always test before reload:

```bash
sudo nginx -t
```

If output shows `syntax is ok` and `test is successful` continue.


## 5. Reload / restart Nginx
On a system with systemd (regular Linux servers):

```bash
sudo systemctl restart nginx
```

On WSL or systems without systemd, use the service command or nginx signal:

```bash
sudo service nginx restart
# or for a graceful reload
sudo nginx -s reload
```


## 6. Verify in browser
Open:

```
http://localhost
```

You should see your new page.


---

# Why you should *not* modify the default Nginx folder/file directly

1. **Upgrades and package updates can overwrite it**
   - Distribution package updates (apt/yum) often restore or replace default files under `/var/www/html` and the packaged default page. If you modify the distribution-owned default page, your changes may be lost on update.

2. **Separation of concerns**
   - Keeping sites in dedicated folders (`/var/www/mywebsite`) keeps system files separate from your content. This makes deployments, backups, and rollbacks easier.

3. **Easier multi-site management**
   - With separate folders and server blocks (virtual hosts) you can host many sites on one server without mixing files.

4. **Permissions and security**
   - The packaged `/var/www/html` is often owned by `root` or `www-data` with specific permissions. Changing ownership or mixing files can create security or accidental permission issues.

5. **Cleaner configuration and automation**
   - Tools and automation (Ansible, CI/CD, packaging) expect predictable structure. Using your own site folders is more automatable.


---

# What happens if you change the default `index.nginx-debian.html` or `/var/www/html` directly?

- **Short-term:** your page will change immediately and visitors will see your content. This is sometimes OK for one-off quick changes.

- **Medium-term risks:** on system upgrades, the package may overwrite your file or reinstall the default page. You may also forget which files are custom and which are stock, leading to maintenance confusion.

- **Operational risk:** if multiple people/admins expect the default to be standard, modifying it causes surprise. It also makes it harder to manage multiple sites or to restore to a known-good state.

- **Permissions problems:** editing system-owned files from Windows (WSL network share) or without correct root privileges will fail (EPERM). Changing ownership to avoid this can open up security holes.


---

# Extra tips & safe alternatives

- **If you want a fast one-off change:** editing `/var/www/html/index.nginx-debian.html` is the fastest—but keep a copy of your custom file elsewhere so updates don't wipe it.

- **Better:** create your site folder and adjust `/etc/nginx/sites-available/default` (as shown above).

- **Serve many sites:** create new files under `/etc/nginx/sites-available/` and link them into `/etc/nginx/sites-enabled/` with `ln -s`, then reload Nginx.

- **Permission workflow for WSL + VSCode:**
  - Use the Remote - WSL extension (`code .` from WSL) and edit files inside the WSL filesystem.
  - If a file is root-owned, copy it to your home, edit in VS Code, then `sudo mv` it back into place.

- **Backups:** keep a simple `site-backup.tar.gz` of `/var/www/mywebsite` or store your site in a Git repo for easy rollback.


---

## Quick reference commands

```bash
# Create folder and set ownership
sudo mkdir -p /var/www/mywebsite
sudo chown -R $USER:$USER /var/www/mywebsite

# Edit index
nano /var/www/mywebsite/index.html

# Update nginx default server block
sudo nano /etc/nginx/sites-available/default

# Test and reload
sudo nginx -t
sudo systemctl restart nginx   # or: sudo service nginx restart

# If editing as non-root from Windows: copy-edit-move
cp /var/www/html/index.nginx-debian.html ~/index.backup.html
code ~/index.backup.html  # edit in VS Code (WSL)
sudo mv ~/index.backup.html /var/www/html/index.nginx-debian.html

# Restore default (if needed)
sudo rm -rf /var/www/mywebsite
sudo apt reinstall --reinstall nginx
```

---

### Final note
Using a dedicated folder and proper Nginx server blocks keeps your system predictable, safe, and maintainable. Modifying the packaged default file works for quick tests but is fragile for long-term maintenance.


---

*End of document.*

