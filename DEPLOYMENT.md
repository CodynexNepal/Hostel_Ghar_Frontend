# Hostel Ghar Frontend — Production Deployment & CI/CD Guide

This document details the automated GitHub Actions deployment pipeline for the **Hostel Ghar Frontend** (`https://hostelghar.com`) hosted on cPanel shared hosting (`server2.bisuphost.com`).

---

## 1. Overview & Architecture

- **Repository:** `https://github.com/CodynexNepal/Hostel_Ghar_Frontend`
- **Production Domain:** `https://hostelghar.com`
- **API Endpoint:** `https://api.hostelghar.com/api`
- **cPanel Server:** `server2.bisuphost.com`
- **cPanel Account:** `hostelgh`
- **Application Directory:** `/home/hostelgh/hostelghar`
- **Node.js Runtime:** 22
- **Deployment Strategy:** Next.js Standalone Build (`output: 'standalone'`)

### Why Next.js Standalone for cPanel?

Building directly on shared hosting often fails due to strict memory (RAM) and CPU limits. With standalone mode:

1. **GitHub Actions** (`ubuntu-latest` with 16GB RAM) handles `npm ci`, linting, unit tests, and production compilation (`npm run build`).
2. Only the standalone runtime, traced dependencies, pre-rendered pages, and `.next/static` assets are packaged and transferred over SSH.
3. Existing `.env`, logs, and user upload directories in `/home/hostelgh/hostelghar` are never overwritten or deleted.
4. An automated backup is created on the server prior to every release, enabling instant automated or manual rollback.

---

## 2. Required GitHub Secrets

Configure these secrets in GitHub repository settings:
**`Settings` → `Secrets and variables` → `Actions` → `New repository secret`**

| Secret Name      | Description                                | Example / Value                          |
| ---------------- | ------------------------------------------ | ---------------------------------------- |
| `CPANEL_HOST`    | cPanel hostname or server IP               | `server2.bisuphost.com`                  |
| `CPANEL_PORT`    | SSH Port assigned by your hosting provider | `22` (or provider's custom SSH port)     |
| `CPANEL_USER`    | cPanel account username                    | `hostelgh`                               |
| `CPANEL_SSH_KEY` | Private SSH Key (ed25519 or RSA PEM)       | `-----BEGIN OPENSSH PRIVATE KEY-----...` |

> **Note on `HOSTELGHAR_FRONTEND`:** If your repository already has the SSH key configured under the secret name `HOSTELGHAR_FRONTEND`, the workflow automatically detects and uses it as a fallback.

---

## 3. SSH Key Generation & cPanel Authorization

### Step 1: Generate an SSH Key Pair Locally

Open your local terminal and generate a dedicated, unencrypted SSH key pair:

```bash
ssh-keygen -t ed25519 -C "github-actions-hostelghar-frontend" -f ./cpanel_deploy_key -N ""
```

This produces two files:

- `cpanel_deploy_key` (Private key — goes to GitHub Secrets)
- `cpanel_deploy_key.pub` (Public key — goes to cPanel)

### Step 2: Authorize Public Key in cPanel

1. Log into cPanel (`server2.bisuphost.com:2083` or via your client area).
2. Go to **Security** → **SSH Access**.
3. Click **Manage SSH Keys** → **Import Key**.
4. Set Key Name to: `hostelghar_deploy_key`.
5. Paste the contents of `cpanel_deploy_key.pub` into the **Paste the public key into the following text box** area.
6. Click **Import**.
7. In the Public Keys list, locate `hostelghar_deploy_key`, click **Manage**, and click **Authorize**.

### Step 3: Add Private Key to GitHub Actions

1. Open the private key file `cpanel_deploy_key` in a text editor and copy the entire text (including `-----BEGIN ...-----` and `-----END ...-----`).
2. In GitHub, go to **Settings** → **Secrets and variables** → **Actions**.
3. Create a secret named `CPANEL_SSH_KEY` and paste the private key.
4. Delete the local `cpanel_deploy_key` and `cpanel_deploy_key.pub` files from your computer.

---

## 4. cPanel "Setup Node.js App" Configuration

In cPanel under **Software** → **Setup Node.js App**:

- **Node.js version:** `22.x`
- **Application mode:** `Production`
- **Application root:** `hostelghar` (which corresponds to `/home/hostelgh/hostelghar`)
- **Application URL:** `hostelghar.com`
- **Application startup file:** `app.js` (or `server.js`)
- **Environment variables:**
  - `NODE_ENV`: `production`
  - `PORT`: `3000` (or leave default, Passenger handles port routing)
  - `NEXT_PUBLIC_API_URL`: `https://api.hostelghar.com/api`
  - `NEXT_PUBLIC_APP_URL`: `https://hostelghar.com`

> **Entrypoint Compatibility:** The repository includes `app.js` which delegates directly to `server.js`. Whether cPanel specifies `app.js` or `server.js` as the startup file, the application will boot reliably.

---

## 5. Deployment Workflow Operation

The GitHub Actions workflow `.github/workflows/deploy.yml`:

1. **Triggers:** Automatically on every push to `main` and via manual trigger (`workflow_dispatch`).
2. **Build Phase:**
   - Installs dependencies using `npm ci`.
   - Runs `npm run lint` and `npm test`.
   - Runs `npm run build` (outputs `.next/standalone/server.js`).
   - Bundles `.next/static`, `public/`, and `app.js` into `deploy-bundle.tar.gz`.
3. **Deploy Phase:**
   - Connects to `server2.bisuphost.com` using the SSH credentials.
   - Creates a timestamped archive of the current release in `/home/hostelgh/hostelghar_backups/`.
   - Selectively synchronizes `.next/`, `node_modules/`, `public/`, and entrypoint files into `/home/hostelgh/hostelghar/`.
   - Preserves all `.env` files, logs, and uploaded files.
   - Triggers application restart via `tmp/restart.txt` and `cloudlinux-selector`.
4. **Health Check & Auto-Rollback:**
   - Sends HTTP requests to `https://hostelghar.com` with retries.
   - If the application does not respond with a healthy HTTP status within 60 seconds, the workflow automatically restores the previous working backup and restarts Passenger.
5. **Security:**
   - Shreds and deletes temporary private key files from the runner in an `always()` post-step.

---

## 6. Manual Rollback Procedure

If you ever need to manually revert to a previous working build:

1. Connect via SSH:
   ```bash
   ssh -p <PORT> hostelgh@server2.bisuphost.com
   ```
2. Check available backups:
   ```bash
   ls -la /home/hostelgh/hostelghar_backups/
   ```
3. Restore the desired backup into the application root:
   ```bash
   tar -xzf /home/hostelgh/hostelghar_backups/backup-YYYYMMDDHHMMSS.tar.gz -C /home/hostelgh/hostelghar
   ```
4. Trigger application restart:
   ```bash
   touch /home/hostelgh/hostelghar/tmp/restart.txt
   ```
   Or if CloudLinux CLI is active:
   ```bash
   cloudlinux-selector restart --json --interpreter nodejs --app-root /home/hostelgh/hostelghar
   ```

---

## 7. Testing & Verification

1. **Verify build locally:**
   ```bash
   npm run build
   node .next/standalone/server.js
   ```
2. **Verify CI manually:**
   Go to **GitHub Actions** → select **CI/CD Pipeline - Hostel Ghar Frontend** → click **Run workflow**.
3. **Verify live production:**
   Visit `https://hostelghar.com` or run:
   ```bash
   curl -I https://hostelghar.com
   ```
