#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/home/hostelgh/hostelghar"
BACKUP_DIR="/home/hostelgh/hostelghar_backups"
TMP_DIR="/home/hostelgh/tmp_ci_deploy"

mkdir -p "$BACKUP_DIR" "$APP_DIR"

# ── A. Backup Current Active Release ──────────────────────────
if [ -f "$APP_DIR/server.js" ] || [ -d "$APP_DIR/.next" ]; then
  TIMESTAMP=$(date +%Y%m%d%H%M%S)
  BACKUP_FILE="$BACKUP_DIR/backup-${TIMESTAMP}.tar.gz"
  echo "Creating backup of current active deployment: $BACKUP_FILE"
  tar -czf "$BACKUP_FILE" -C "$APP_DIR" \
    --exclude="./tmp" \
    --exclude="./.env*" \
    --exclude="./uploads" \
    --exclude="*.log" \
    server.js app.js package.json .next node_modules public 2>/dev/null || true

  # Retain only the last 3 backups to conserve disk quota and inodes
  cd "$BACKUP_DIR"
  ls -1t backup-*.tar.gz 2>/dev/null | tail -n +4 | xargs -r rm -f
fi

# ── B. Extract New Build in Isolated Directory ────────────────
echo "Extracting new standalone build..."
mkdir -p "$TMP_DIR/extracted"
tar -xzf "$TMP_DIR/deploy-bundle.tar.gz" -C "$TMP_DIR/extracted"

# ── C. Safe Component Synchronization ────────────────────────
# We selectively sync application assets, NEVER wiping .env, logs, or uploads.
echo "Syncing standalone runtime..."
mkdir -p "$APP_DIR/.next"
rsync -a --delete "$TMP_DIR/extracted/.next/" "$APP_DIR/.next/"

mkdir -p "$APP_DIR/node_modules"
rsync -a --delete "$TMP_DIR/extracted/node_modules/" "$APP_DIR/node_modules/"

if [ -d "$TMP_DIR/extracted/public" ]; then
  mkdir -p "$APP_DIR/public"
  rsync -a "$TMP_DIR/extracted/public/" "$APP_DIR/public/"
fi

cp "$TMP_DIR/extracted/server.js" "$APP_DIR/server.js"
cp "$TMP_DIR/extracted/package.json" "$APP_DIR/package.json"
if [ -f "$TMP_DIR/extracted/app.js" ]; then
  cp "$TMP_DIR/extracted/app.js" "$APP_DIR/app.js"
fi

# Clean up temporary upload files
rm -rf "$TMP_DIR"

# ── D. Restart Application ────────────────────────────────────
echo "Triggering cPanel application restart..."
mkdir -p "$APP_DIR/tmp"
touch "$APP_DIR/tmp/restart.txt"

# Invoke CloudLinux selectorctl / cloudlinux-selector if available
if command -v cloudlinux-selector >/dev/null 2>&1; then
  cloudlinux-selector restart --json --interpreter nodejs --app-root "$APP_DIR" || true
elif [ -x /usr/sbin/cloudlinux-selector ]; then
  /usr/sbin/cloudlinux-selector restart --json --interpreter nodejs --app-root "$APP_DIR" || true
elif command -v selectorctl >/dev/null 2>&1; then
  selectorctl --interpreter=nodejs --user=hostelgh --restart-app --app-root="$APP_DIR" || true
fi

echo "Deployment files synchronized and restart signal sent."

