# MBSNest — HR & Workforce Management Platform

Enterprise-grade human resource and workforce management application: core HR processes, organizational structure, and employee administration across multiple branch locations. Originally built on [Base44](https://base44.com); this repository contains the **complete exported source code**, **full SQL database backups**, and a **Docker deployment** with the app and database as separate images.

---

## Repository structure

```
.
├── docker-compose.yml          # Runs the whole stack (app + db)
├── docker/
│   ├── app.Dockerfile          # Image 1: WorkNest app (node build → nginx + API reverse proxy)
│   ├── db.Dockerfile           # Image 2: PostgreSQL initialized from worknest.sql
│   ├── db-verify.sql           # Post-restore verification (runs on first DB boot)
│   ├── nginx.conf.template     # SPA serving + Base44 backend reverse proxy (envsubst-rendered)
│   └── verify.sh               # End-to-end verification of the running stack (13 checks)
├── docs/
│   └── docker-ci-workflow.yml  # GitHub Actions CI workflow (reference copy — see CI section)
├── backups/
│   ├── worknest.sql            # Full SQL backup: schema (86 tables) + 161 records (original WorkNest)
│   ├── worknest-copy.sql       # Schema-only backup of the WorkNest (Copy) app (empty tables)
│   └── README.md               # Backup details
├── src/                        # Application source
│   ├── pages/                  # All WorkNest modules (HR, payroll, attendance, helpdesk, …)
│   ├── components/             # Shared UI components
│   ├── api/                    # Base44 SDK client
│   └── lib/, hooks/, utils/    # Support libraries
├── base44/                     # Base44 entity definitions
└── package.json                # Vite + React app
```

## The two Docker images

| Image | Base | What it does |
|---|---|---|
| `worknest-app` | `node:20-alpine` → `nginx:1.27-alpine` | Multi-stage build: `npm ci` + `vite build` (with the real Base44 app id baked in), then serves the production bundle with nginx (gzip, SPA fallback, asset caching) and **reverse-proxies `/api` + `/ws-user-apps` to the Base44 backend** on port 80 |
| `worknest-db` | `postgres:16-alpine` | On first boot, automatically restores `backups/worknest.sql` (full schema + all data) and runs a built-in verification that prints record counts to the container log |

## Quickstart

```bash
git clone https://github.com/amitavakarmaxbridgesolution-ui/worknest-copy.git
cd worknest-copy

docker compose up --build
```

- **App:** http://localhost:8080
- **DB:** `localhost:5432` — user `worknest`, password `worknest`, database `worknest`
- The database image's init log prints a restore verification (tables + record counts) on first boot.

### Thorough verification

```bash
./docker/verify.sh
```

13 checks: the app serves (HTTP 200, SPA shell, JS/CSS bundles, route fallback), the app id is baked into the JS bundle, **the Base44 reverse proxy actually forwards `/api` POSTs to the real backend** (the 405-fix regression check), and the database restored completely (86 tables, all key modules' data, referential integrity). Expected output ends with: `Verification complete: 13 passed, 0 failed.`

Verified during packaging (2026-09-04): `npm ci` + `vite build` succeed, production bundle serves correctly, signup/login requests through the reverse proxy reach the real Base44 backend (HTTP 400/200 with Base44 JSON — not 405), and `worknest.sql` restores cleanly (86 tables / 161 records, zero orphaned references).

## Architecture notes

- **Frontend:** Vite + React 18 SPA (all WorkNest modules: employees, payroll, attendance, leave, onboarding/offboarding, helpdesk, assets, performance, and more).
- **Data layer:** the app's runtime data layer is the **Base44 managed backend** (`@base44/sdk`), which handles entities, auth, and functions. The `worknest-db` PostgreSQL image serves the **complete standalone SQL backup** — usable for inspection, reporting, migration to a self-hosted backend, or restoring into any SQL database.
- **To restore the backup anywhere:** `backups/worknest.sql` is standard SQL (quoted identifiers, ANSI types) — `psql -U user -d db -f backups/worknest.sql` restores schema + data into PostgreSQL; it also loads cleanly into SQLite.

## Database backup contents (worknest.sql)

86 tables covering the full HR data model — Company, Branch, Employee, Department, Designation, JobGrade, PayrollRun, Payslip, SalaryStructure, Attendance, LeaveRequest, LeaveBalance, Shift, HelpdeskTicket, Asset, PerformanceReview, ReviewCycle, OnboardingTask, OffboardingRequest, TrainingCourse, and more — with 161 production records (20 employees across 3 branches: Mumbai HQ, Bangalore, Delhi).

## Account-creation 405 fix (2026-09-04)

**Symptom:** deployed app showed `405 Method Not Allowed` (proxy) when creating an account.

**Root causes (both fixed):**
1. **Missing reverse proxy.** The app's Base44 SDK client (`src/api/base44Client.js`) is built with `serverUrl: ''`, so every API call — login, signup, entity CRUD — goes to a **relative** `/api/...` path. In local dev, `@base44/vite-plugin` proxies those to the Base44 backend; in the Docker deployment, nginx was serving static files only, so every API request dead-ended with 405.
2. **Missing app id.** `VITE_BASE44_APP_ID` was not set at build time, so the bundle called `/api/apps/null/...` instead of `/api/apps/<real-id>/...`.

**Fix:**
- `docker/nginx.conf.template` now reverse-proxies `/api/` and `/ws-user-apps/` to the real Base44 backend (`https://app.base44.com` by default, configurable via `BASE44_BACKEND_URL` / `BASE44_BACKEND_HOST` env vars, rendered by nginx's envsubst entrypoint).
- `docker/app.Dockerfile` bakes the real app id into the bundle via build args (`VITE_BASE44_APP_ID`, default `6a911feea78e049e1a1003f4`).
- `docker/verify.sh` gained two regression checks: the app id must be present in the served JS bundle, and `POST /api/...` must be answered by the real Base44 backend (never 405).

**Verified end-to-end** against the real Base44 backend: signup requests through the fixed routing return the backend's own validation/success JSON (e.g. `Password must be at least 8 characters long`, then `200 Registration successful`) instead of `405 Method Not Allowed`.

> Note: self-hosting the frontend still relies on Base44's managed backend for auth/entities — the reverse proxy restores that connection. The PostgreSQL image remains a standalone data copy (see Architecture notes).

## CI / updates

- **GitHub Actions:** a CI workflow (build both images → boot the stack → run `docker/verify.sh` → publish to GHCR) is included as a reference copy at [`docs/docker-ci-workflow.yml`](docs/docker-ci-workflow.yml). Copy its contents to `.github/workflows/docker-ci.yml` via the GitHub UI (or push with a token that has the `workflow` scope) to enable it.
- Source mirrors the original WorkNest app (verified byte-identical on 2026-09-04).
- To refresh: re-export the code via the Base44 export API, re-run the SQL dump, commit and push.
