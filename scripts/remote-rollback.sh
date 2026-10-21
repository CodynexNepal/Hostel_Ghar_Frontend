#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/home/hostelgh/hostelghar"
BACKUP_DIR="/home/hostelgh/hostelghar_backups"

LATEST_BACKUP=$(ls -1t "$BACKUP_DIR"/backup-*.tar.gz 2>/dev/null | head -n 1 || echo "")
if [ -n "$LATEST_BACKUP" ] && [ -f "$LATEST_BACKUP" ]; then
  echo "Restoring previous release from $LATEST_BACKUP..."
  tar -xzf "$LATEST_BACKUP" -C "$APP_DIR"
  mkdir -p "$APP_DIR/tmp"
  touch "$APP_DIR/tmp/restart.txt"
  if command -v cloudlinux-selector >/dev/null 2>&1; then
    cloudlinux-selector restart --json --interpreter nodejs --app-root "$APP_DIR" || true
  elif [ -x /usr/sbin/cloudlinux-selector ]; then
    /usr/sbin/cloudlinux-selector restart --json --interpreter nodejs --app-root "$APP_DIR" || true
  elif command -v selectorctl >/dev/null 2>&1; then
    selectorctl --interpreter=nodejs --user=hostelgh --restart-app --app-root="$APP_DIR" || true
  fi
  echo "Rollback restored successfully."
else
  echo "No backup archive found in $BACKUP_DIR."
fi
