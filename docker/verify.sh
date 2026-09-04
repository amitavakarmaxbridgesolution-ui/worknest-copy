#!/usr/bin/env sh
# Thorough post-deploy verification for the WorkNest docker-compose stack.
# Usage:  docker compose up --build -d && ./docker/verify.sh
set -eu

APP_URL="${APP_URL:-http://localhost:8080}"
DB_CONTAINER="${DB_CONTAINER:-worknest-db}"
BASE44_APP_ID="${BASE44_APP_ID:-6a911feea78e049e1a1003f4}"

pass=0; fail=0
ok()   { pass=$((pass+1)); echo "  PASS: $1"; }
bad()  { fail=$((fail+1)); echo "  FAIL: $1"; }

echo "== 1. Application container =="
code=$(curl -s -o /dev/null -w "%{http_code}" "$APP_URL/")
[ "$code" = "200" ] && ok "app responds 200 on $APP_URL/" || bad "app responded $code"

html=$(curl -s "$APP_URL/")
echo "$html" | grep -q 'id="root"' && ok "SPA root element present" || bad "SPA root element missing"

js=$(echo "$html" | grep -o 'assets/index-[^"]*\.js' | head -1)
css=$(echo "$html" | grep -o 'assets/index-[^"]*\.css' | head -1)
[ -n "$js" ] && [ "$(curl -s -o /dev/null -w "%{http_code}" "$APP_URL/$js")" = "200" ] \
  && ok "JS bundle served ($js)" || bad "JS bundle not served"
[ -n "$css" ] && [ "$(curl -s -o /dev/null -w "%{http_code}" "$APP_URL/$css")" = "200" ] \
  && ok "CSS bundle served ($css)" || bad "CSS bundle not served"

# SPA fallback: any client-side route must return the app shell
[ "$(curl -s -o /dev/null -w "%{http_code}" "$APP_URL/dashboard")" = "200" ] \
  && ok "SPA fallback works (/dashboard returns app shell)" || bad "SPA fallback broken"

# The bundle must be built with the real Base44 app id baked in
# (VITE_BASE44_APP_ID). If it is missing, the SDK calls /api/apps/null/... and
# every auth/data request fails.
curl -s "$APP_URL/$js" | grep -q "$BASE44_APP_ID" \
  && ok "app id baked into JS bundle ($BASE44_APP_ID)" \
  || bad "app id NOT found in JS bundle — rebuild with VITE_BASE44_APP_ID"

echo "== 2. Base44 backend reverse proxy (the 405 signup fix) =="
# The frontend calls relative /api/... paths. The nginx reverse proxy must
# forward them to the real Base44 backend — a static-only server answers
# POST /api/... with 405 Method Not Allowed, which is exactly what broke
# account creation before this proxy existed. We probe a POST to the register
# endpoint: anything other than 405/404 means we reached the real backend
# (a 200/400 response with a JSON body comes from Base44 itself).
code=$(curl -s -o /dev/null -w "%{http_code}" -X POST \
  -H "Content-Type: application/json" \
  "$APP_URL/api/apps/$BASE44_APP_ID/auth/login")
case "$code" in
  200|400|401|403) ok "POST /api/... is proxied to the Base44 backend (HTTP $code)" ;;
  405|404) bad "POST /api/... answered $code — reverse proxy NOT working (this is the 405 signup bug)" ;;
  *) bad "POST /api/... answered $code — check the reverse proxy and BASE44_BACKEND_URL" ;;
esac

# The proxied response must be real Base44 JSON, not the SPA shell
body=$(curl -s -X POST -H "Content-Type: application/json" \
  "$APP_URL/api/apps/$BASE44_APP_ID/auth/login")
echo "$body" | grep -q "error_type\|access_token\|detail" \
  && ok "API responses come from the Base44 backend (JSON body, not SPA shell)" \
  || bad "API response is not Base44 JSON — got: $(echo "$body" | head -c 80)"

echo "== 3. Database container =="
tables=$(docker exec "$DB_CONTAINER" psql -U worknest -d worknest -tA \
  -c "SELECT COUNT(*) FROM pg_catalog.pg_tables WHERE schemaname='public'")
[ "$tables" -ge 80 ] && ok "schema restored ($tables tables)" || bad "expected ~86 tables, got $tables"

records=$(docker exec "$DB_CONTAINER" psql -U worknest -d worknest -tA \
  -c 'SELECT COUNT(*) FROM "Employee"')
[ "$records" -ge 20 ] && ok "Employee data restored ($records rows)" || bad "Employee rows: $records"

branches=$(docker exec "$DB_CONTAINER" psql -U worknest -d worknest -tA \
  -c 'SELECT COUNT(*) FROM "Branch"')
[ "$branches" -ge 3 ] && ok "Branch data restored ($branches rows)" || bad "Branch rows: $branches"

total=$(docker exec "$DB_CONTAINER" psql -U worknest -d worknest -tA \
  -c 'SELECT COUNT(*) FROM "PayrollRun"')
[ "$total" -ge 1 ] && ok "Payroll data restored ($total rows)" || bad "PayrollRun rows: $total"

echo "== 4. Integrity =="
orphans=$(docker exec "$DB_CONTAINER" psql -U worknest -d worknest -tA \
  -c 'SELECT COUNT(*) FROM "Employee" e LEFT JOIN "Branch" b ON e.branch_id = b.id WHERE e.branch_id IS NOT NULL AND b.id IS NULL')
[ "$orphans" = "0" ] && ok "no orphaned employee->branch references" || bad "$orphans orphaned references"

echo ""
echo "Verification complete: $pass passed, $fail failed."
[ "$fail" -eq 0 ]
