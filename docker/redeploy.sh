#!/usr/bin/env sh
# One-command redeploy for the WorkNest/MBSNest docker-compose stack.
#
# Fixes the #1 cause of "still seeing 405 after pulling the fix":
#   `docker compose up -d` does NOT rebuild an image that already exists,
#   so the old (pre-fix) container keeps running. This script forces a
#   from-scratch rebuild of the app image, records the git commit + build
#   time in /deploy-info.json, restarts the stack, and verifies everything.
#
# Usage (on the server):  ./docker/redeploy.sh
set -eu
cd "$(dirname "$0")/.."

APP_URL="${APP_URL:-http://localhost:8080}"

export GIT_COMMIT
export BUILD_DATE
GIT_COMMIT=$(git rev-parse --short HEAD)
BUILD_DATE=$(date -u +%Y-%m-%dT%H:%M:%SZ)

echo "==> Pulling latest code"
git pull --ff-only

echo "==> Stopping old stack"
docker compose down

echo "==> Rebuilding app image from scratch ($GIT_COMMIT @ $BUILD_DATE)"
docker compose build --no-cache app

echo "==> Starting stack"
docker compose up -d --build

echo "==> Waiting for app to serve (up to 90s)"
timeout 90 sh -c "until curl -sf \"$APP_URL/\" >/dev/null 2>&1; do sleep 3; done" \
  || { echo "app did not come up — last logs:"; docker compose logs --tail 30 app; exit 1; }

echo "==> Running verification suite (includes the 405-signup proxy checks)"
./docker/verify.sh

echo ""
echo "Deployment info:"
curl -s "$APP_URL/deploy-info.json"; echo
