#!/usr/bin/env sh
# Thorough post-deploy verification for the WorkNest docker-compose stack.
# Usage:  docker compose up --build -d && ./docker/verify.sh
set -eu

APP_URL="${APP_URL:-http://localhost:8080}"
DB_CONTAINER="${DB_CONTAINER:-worknest-db}"

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

echo "== 2. Database container =="
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

echo "== 3. Integrity =="
orphans=$(docker exec "$DB_CONTAINER" psql -U worknest -d worknest -tA \
  -c 'SELECT COUNT(*) FROM "Employee" e LEFT JOIN "Branch" b ON e.branch_id = b.id WHERE e.branch_id IS NOT NULL AND b.id IS NULL')
[ "$orphans" = "0" ] && ok "no orphaned employee->branch references" || bad "$orphans orphaned references"

echo ""
echo "Verification complete: $pass passed, $fail failed."
[ "$fail" -eq 0 ]
