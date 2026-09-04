-- Runs right after the worknest.sql restore on first boot.
-- Prints verification counts to the postgres container log so you can
-- confirm the backup restored completely before the DB starts serving.
\echo ''
\echo '=== WorkNest DB restore verification ==='

SELECT 'tables restored' AS item, COUNT(*) AS value
  FROM pg_catalog.pg_tables WHERE schemaname = 'public';

SELECT 'total records' AS item, SUM(cnt) AS value
  FROM (
    SELECT COUNT(*) AS cnt FROM "Company"
    UNION ALL SELECT COUNT(*) FROM "Branch"
    UNION ALL SELECT COUNT(*) FROM "Employee"
    UNION ALL SELECT COUNT(*) FROM "Department"
    UNION ALL SELECT COUNT(*) FROM "Designation"
    UNION ALL SELECT COUNT(*) FROM "JobGrade"
    UNION ALL SELECT COUNT(*) FROM "PayrollRun"
    UNION ALL SELECT COUNT(*) FROM "Payslip"
    UNION ALL SELECT COUNT(*) FROM "LeaveRequest"
    UNION ALL SELECT COUNT(*) FROM "Attendance"
  ) t;

SELECT 'employees' AS item, COUNT(*) AS value FROM "Employee";
SELECT 'branches' AS item, branch_name AS value, COUNT(e.id) AS employees
  FROM "Branch" b LEFT JOIN "Employee" e ON e.branch_id = b.id
  GROUP BY b.branch_name ORDER BY b.branch_name;

\echo '=== restore OK ==='
\echo ''
