# WorkNest — HR & Workforce Management Platform

Enterprise-grade human resource and workforce management application: core HR processes, organizational structure, and employee administration across multiple branch locations. Originally built on [Base44](https://base44.com); this repository contains the **complete exported source code**, **full SQL database backups**, and a **Docker deployment** with the app and database as separate images.

---

## Repository structure

```
.
├── docker-compose.yml          # Runs the whole stack (app + db)
├── docker/
│   ├── app.Dockerfile          # Image 1: WorkNest app (node build → nginx)
│   ├── db.Dockerfile           # Image 2: PostgreSQL initialized from worknest.sql
│   ├── db-verify.sql           # Post-restore verification (runs on first DB boot)
│   ├── nginx.conf              # SPA serving config
│   └── verify.sh               # End-to-end verification of the running stack
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
| `worknest-app` | `node:20-alpine` → `nginx:1.27-alpine` | Multi-stage build: `npm ci` + `vite build`, then serves the production bundle with nginx (gzip, SPA fallback, asset caching) on port 80 |
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

Checks that the app serves (HTTP 200, SPA shell, JS/CSS bundles, route fallback) and that the database restored completely (86 tables, all key modules' data, referential integrity). Expected output ends with: `Verification complete: N passed, 0 failed.`

Verified locally during packaging (2026-09-04): `npm ci` + `vite build` succeed, production bundle serves correctly, and `worknest.sql` restores cleanly (86 tables / 161 records, zero orphaned references).

## Architecture notes

- **Frontend:** Vite + React 18 SPA (all WorkNest modules: employees, payroll, attendance, leave, onboarding/offboarding, helpdesk, assets, performance, and more).
- **Data layer:** the app's runtime data layer is the **Base44 managed backend** (`@base44/sdk`), which handles entities, auth, and functions. The `worknest-db` PostgreSQL image serves the **complete standalone SQL backup** — usable for inspection, reporting, migration to a self-hosted backend, or restoring into any SQL database.
- **To restore the backup anywhere:** `backups/worknest.sql` is standard SQL (quoted identifiers, ANSI types) — `psql -U user -d db -f backups/worknest.sql` restores schema + data into PostgreSQL; it also loads cleanly into SQLite.

## Database backup contents (worknest.sql)

86 tables covering the full HR data model — Company, Branch, Employee, Department, Designation, JobGrade, PayrollRun, Payslip, SalaryStructure, Attendance, LeaveRequest, LeaveBalance, Shift, HelpdeskTicket, Asset, PerformanceReview, ReviewCycle, OnboardingTask, OffboardingRequest, TrainingCourse, and more — with 161 production records (20 employees across 3 branches: Mumbai HQ, Bangalore, Delhi).

## CI / updates

- Source mirrors the original WorkNest app (verified byte-identical on 2026-09-04).
- To refresh: re-export the code via the Base44 export API, re-run the SQL dump, commit and push.
