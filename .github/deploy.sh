#!/usr/bin/env bash
###############################################################################
# deploy.sh â€” on-server deployment helper for Hostel Ghar Frontend (cPanel).
#
# This script is executed over SSH by the GitHub Actions workflow after the
# deployment archive (`deploy-stage.tar.gz`) has been uploaded to the server.
#
# Environment variables (set by the workflow's SSH command prefix):
#   PROJECT_DIR       Production application directory (default: /home/hostelgh/hostelghar)
#   APP_NAME          cPanel application slug (default: hostelghar)
#   PRODUCTION_URL    Public URL used for the final health check (default: https://hostelghar.com)
#   SKIP_RESTART      "true" to skip the restart step (default: "false")
#   RESTART_METHOD    "cpanel-uapi" or "manual" (default: cpanel-uapi)
#   CPANEL_USER       cPanel username (used by the restart step)
#   CPANEL_HOST       cPanel hostname (used by the restart step)
#   CPANEL_PASSWORD_B64  base64-encoded cPanel password (optional)
#   CPANEL_TOKEN_B64     base64-encoded cPanel API token (optional)
#
# The deployment archive is expected at /tmp/deploy-stage.tar.gz (uploaded by
# the GitHub Actions workflow).  Entries inside the archive are relative paths
# (no top-level directory), so `tar -xzf` extracts straight into $PROJECT_DIR.
###############################################################################

set -euo pipefail

PROJECT_DIR="${PROJECT_DIR:-/home/hostelgh/hostelghar}"
APP_NAME="${APP_NAME:-hostelghar}"
PRODUCTION_URL="${PRODUCTION_URL:-https://hostelghar.com}"
SKIP_RESTART="${SKIP_RESTART:-false}"
RESTART_METHOD="${RESTART_METHOD:-cpanel-uapi}"
TAR_PATH="${TAR_PATH:-/tmp/deploy-stage.tar.gz}"

# Optional base64 credentials for the cPanel restart step.
CPANEL_PASSWORD_B64="${CPANEL_PASSWORD_B64:-}"
CPANEL_TOKEN_B64="${CPANEL_TOKEN_B64:-}"

log() { echo "[deploy] $*"; }
warn() { echo "[deploy][WARN] $*" >&2; }
fail() { echo "[deploy][ERROR] $*" >&2; exit 1; }

# --- Decodes a base64 credential supplied by the workflow ----------------------
decode_b64() {
  local var_name="$1"
  local value="${!var_name}"
  if [ -n "${value}" ]; then
    printf '%s' "${value}" | base64 -d 2>/dev/null || true
  fi
}

if [ -n "${CPANEL_PASSWORD_B64:-}" ]; then
  CPANEL_PASSWORD="$(decode_b64 CPANEL_PASSWORD_B64)"
fi
if [ -n "${CPANEL_TOKEN_B64:-}" ]; then
  CPANEL_TOKEN="$(decode_b64 CPANEL_TOKEN_B64)"
fi

# --- 1. Preconditions --------------------------------------------------------
log "Production application directory : ${PROJECT_DIR}"
log "cPanel application slug          : ${APP_NAME}"
log "Public URL                       : ${PRODUCTION_URL}"

if [ ! -f "${TAR_PATH}" ]; then
  fail "Deployment archive not found: ${TAR_PATH} (workflow upload step may have failed)"
fi
if [ ! -d "${PROJECT_DIR}" ]; then
  fail "Production application directory does not exist: ${PROJECT_DIR}"
fi

# --- 2. Backup ---------------------------------------------------------------
# A full snapshot of the previous state.  Everything the deploy touches is
# captured here, so rollback is a simple restore of this archive.
TIMESTAMP="$(date +%Y%m%d%H%M%S)"
BACKUP_DIR="${PROJECT_DIR}.deploy-backup-${TIMESTAMP}"
log "Creating backup of ${PROJECT_DIR} at ${BACKUP_DIR}.tar.gz"
if ! tar -czf "${BACKUP_DIR}.tar.gz" -C "$(dirname "${PROJECT_DIR}")" "$(basename "${PROJECT_DIR}")"; then
  fail "Backup creation failed"
fi
log "Backup written to ${BACKUP_DIR}.tar.gz (store/archive it to keep the server tidy)"

# --- 3. Extract the new files into the production directory ------------------
log "Extracting deployment archive into ${PROJECT_DIR} ..."
if ! tar -xzf "${TAR_PATH}" -C "${PROJECT_DIR}"; then
  fail "Extraction of ${TAR_PATH} into ${PROJECT_DIR} failed"
fi

# --- 4. Verify the extracted files -------------------------------------------
for f in server.js package.json node_modules .next public .next/static; do
  if [ ! -e "${PROJECT_DIR}/${f}" ]; then
    fail "Missing expected deployment file after extraction: ${PROJECT_DIR}/${f}"
  fi
done
log "Deployment files verified."

# --- 5. Restart the application ----------------------------------------------
if [ "${SKIP_RESTART}" = "true" ]; then
  warn "Restart skipped (SKIP_RESTART=true)."
elif [ "${RESTART_METHOD}" = "manual" ]; then
  warn "Restart method is manual: no automatic restart performed."
  print_manual_restart_instructions
elif [ "${RESTART_METHOD}" = "cpanel-uapi" ]; then
  restart_via_cpanel_uapi
else
  warn "Unknown RESTART_METHOD '${RESTART_METHOD}': no restart performed."
fi

log "Deployment complete."

###############################################################################
# cPanel restart helpers ------------------------------------------------------
###############################################################################

print_manual_restart_instructions() {
  log "Manual restart instructions (cPanel / Websites & Apps):"
  log "  1. Open cPanel for '${CPANEL_USER}' at https://${CPANEL_HOST}"
  log "  2. Open 'Websites & Apps' (Meridian) and select application '${APP_NAME}'."
  log "  3. Click 'Restart' (or 'Redeploy' if configuration/environment changes apply)."
  log "  4. Alternatively, call the cPanel UAPI from a shell with cPanel credentials:"
  log "     curl -sS -u '${CPANEL_USER}:${CPANEL_PASSWORD}' \\"
  log "       'https://${CPANEL_HOST}:2083/uapi/WebApp/restart?name=${APP_NAME}'"
  log "  5. Verify the app answers on ${PRODUCTION_URL}."
}

get_uapi_status() {
  # Prints the numeric `result.status` from the UAPI JSON response, or 0.
  printf '%s' "${resp}" | node -e '
    let d = "";
    process.stdin.on("data", function (c) { d += c; });
    process.stdin.on("end", function () {
      try { console.log(JSON.parse(d).result.status); } catch (e) { console.log("0"); }
    });
  ' 2>/dev/null || echo "0"
}

restart_via_cpanel_uapi() {
  log "RESTART_METHOD=cpanel-uapi: requesting WebApp::restart for '${APP_NAME}' ..."
  local url="https://${CPANEL_HOST}:2083/uapi/WebApp/restart?name=${APP_NAME}"
  local auth=""

  if [ -n "${CPANEL_TOKEN:-}" ]; then
    auth="Authorization: Bearer ${CPANEL_TOKEN}"
  elif [ -n "${CPANEL_PASSWORD:-}" ]; then
    auth="Authorization: Basic $(printf '%s:%s' "${CPANEL_USER}" "${CPANEL_PASSWORD}" | base64)"
  else
    warn "No cPanel credentials (CPANEL_PASSWORD or CPANEL_TOKEN) for automatic restart."
    print_manual_restart_instructions
    return 0
  fi

  local resp status
  resp="$(curl -fsS -X GET "${url}" -H "${auth}" --max-time 30 2>/dev/null)" || {
    warn "cPanel UAPI request failed (curl exit non-zero): ${url}"
    return 0
  }
  status="$(get_uapi_status)"

  if [ "${status}" = "1" ]; then
    log "cPanel restart requested successfully (result.status=1)."
    return 0
  fi

  warn "cPanel UAPI request returned status != 1: ${resp}"
  print_manual_restart_instructions
  return 0
}


# --- 5. Restart the application ----------------------------------------------
if [ "${SKIP_RESTART}" = "true" ]; then
  warn "Restart skipped (SKIP_RESTART=true)."
elif [ "${RESTART_METHOD}" = "manual" ]; then
  warn "Restart method is manual: no automatic restart performed."
elif [ "${RESTART_METHOD}" = "cpanel-uapi" ]; then
  restart_via_cpanel_uapi
else
  warn "Unknown RESTART_METHOD '${RESTART_METHOD}': no restart performed."
fi

log "Deployment complete."
