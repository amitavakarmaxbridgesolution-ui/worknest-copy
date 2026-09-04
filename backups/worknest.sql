-- ============================================================
-- Complete database backup (Base44 app 6a911feea78e049e1a1003f4)
-- Base44 app id: 6a911feea78e049e1a1003f4
-- Generated: 2026-09-04 06:56:03 UTC
-- Includes: schema (DDL) + all records (INSERTs) per entity
-- ============================================================

-- ------------------------------------------------------------
-- Entity: StatutoryConfig  (4 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "StatutoryConfig";
CREATE TABLE "StatutoryConfig" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "category" TEXT,
  "name" TEXT,
  "config" TEXT,
  "effective_date" TEXT,
  "version" NUMERIC,
  "config_source" TEXT,
  "status" TEXT
);

INSERT INTO "StatutoryConfig" ("id", "created_date", "updated_date", "created_by", "category", "name", "config", "effective_date", "version", "config_source", "status") VALUES ('6a93cbae8d9fcb7ab4773f00', '2026-08-30T06:20:30.693000', '2026-08-30T06:20:30.693000', NULL, 'PF', 'EPF Standard 2026', '{"employee_rate":0.12,"employer_rate":0.12,"wage_ceiling":15000,"edli_rate":0.005}', '2026-04-01', 1.0, 'EPF Act 1952', 'active');
INSERT INTO "StatutoryConfig" ("id", "created_date", "updated_date", "created_by", "category", "name", "config", "effective_date", "version", "config_source", "status") VALUES ('6a93cbae8d9fcb7ab4773f01', '2026-08-30T06:20:30.693000', '2026-08-30T06:20:30.693000', NULL, 'PT', 'Professional Tax Maharashtra', '{"slabs":[{"max":5000,"amt":0},{"max":10000,"amt":175},{"max":0,"amt":200}]}', '2026-04-01', 1.0, 'State PT Act', 'active');
INSERT INTO "StatutoryConfig" ("id", "created_date", "updated_date", "created_by", "category", "name", "config", "effective_date", "version", "config_source", "status") VALUES ('6a93cbae8d9fcb7ab4773f02', '2026-08-30T06:20:30.693000', '2026-08-30T06:20:30.693000', NULL, 'TDS', 'TDS New Regime 2026-27', '{"slabs":[{"max":300000,"rate":0},{"max":700000,"rate":0.05},{"max":1000000,"rate":0.1},{"max":0,"rate":0.3}],"standard_deduction":75000}', '2026-04-01', 1.0, 'Income Tax Act, Finance Act 2026', 'active');
INSERT INTO "StatutoryConfig" ("id", "created_date", "updated_date", "created_by", "category", "name", "config", "effective_date", "version", "config_source", "status") VALUES ('6a93cbae8d9fcb7ab4773f03', '2026-08-30T06:20:30.693000', '2026-08-30T06:20:30.693000', NULL, 'Gratuity', 'Gratuity Act 1972', '{"rate":15,"max_months":40,"threshold_days":240}', '2026-04-01', 1.0, 'Payment of Gratuity Act 1972', 'active');

-- ------------------------------------------------------------
-- Entity: Attendance  (2 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Attendance";
CREATE TABLE "Attendance" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "employee_email" TEXT,
  "employee_id" TEXT,
  "date" TEXT,
  "check_in" TEXT,
  "check_out" TEXT,
  "status" TEXT,
  "shift_id" TEXT,
  "notes" TEXT,
  "latitude" TEXT,
  "longitude" TEXT,
  "overtime_hours" NUMERIC
);

INSERT INTO "Attendance" ("id", "created_date", "updated_date", "created_by", "employee_email", "employee_id", "date", "check_in", "check_out", "status", "shift_id", "notes", "latitude", "longitude", "overtime_hours") VALUES ('6a9123c307a2642ff7471d9b', '2026-08-28T05:59:31.909000', '2026-08-28T05:59:31.909000', NULL, 'employee@demo.com', '6a9121a143ae589d52872b21', '2026-08-28', '2026-08-28T05:59:31.827Z', NULL, 'present', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "Attendance" ("id", "created_date", "updated_date", "created_by", "employee_email", "employee_id", "date", "check_in", "check_out", "status", "shift_id", "notes", "latitude", "longitude", "overtime_hours") VALUES ('6a9123c307a2642ff7471d9c', '2026-08-28T05:59:31.909000', '2026-08-28T05:59:31.909000', NULL, 'employee@demo.com', '6a9121a143ae589d52872b21', '2026-08-27', '2026-08-27T05:59:31.827Z', '2026-08-27T14:59:31.827Z', 'present', NULL, NULL, NULL, NULL, 1.0);

-- ------------------------------------------------------------
-- Entity: AttendancePolicy  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "AttendancePolicy";
CREATE TABLE "AttendancePolicy" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "branch_id" TEXT,
  "name" TEXT,
  "late_grace_minutes" NUMERIC,
  "half_day_hours" NUMERIC,
  "overtime_threshold_hours" NUMERIC,
  "status" TEXT
);

INSERT INTO "AttendancePolicy" ("id", "created_date", "updated_date", "created_by", "branch_id", "name", "late_grace_minutes", "half_day_hours", "overtime_threshold_hours", "status") VALUES ('6a9123c417f8937c2e380270', '2026-08-28T05:59:32.404000', '2026-08-28T05:59:32.404000', NULL, '6a91219f428f44a0610a5677', 'Standard', 15.0, 4.0, 9.0, 'active');

-- ------------------------------------------------------------
-- Entity: PayrollRun  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "PayrollRun";
CREATE TABLE "PayrollRun" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "payroll_period_id" TEXT,
  "employee_email" TEXT,
  "employee_id" TEXT,
  "gross" NUMERIC,
  "deductions" NUMERIC,
  "loan_deduction" NUMERIC,
  "advance_deduction" NUMERIC,
  "net_pay" NUMERIC,
  "status" TEXT
);

INSERT INTO "PayrollRun" ("id", "created_date", "updated_date", "created_by", "payroll_period_id", "employee_email", "employee_id", "gross", "deductions", "loan_deduction", "advance_deduction", "net_pay", "status") VALUES ('6a9123c5c566ce538dbcdff8', '2026-08-28T05:59:33.217000', '2026-08-28T05:59:33.217000', NULL, '6a9123c524b97aca99a43184', 'employee@demo.com', '6a9121a143ae589d52872b21', 50000.0, 6200.0, 2000.0, 0.0, 41800.0, 'published');

-- ------------------------------------------------------------
-- Entity: AssetRequest  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "AssetRequest";
CREATE TABLE "AssetRequest" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "employee_email" TEXT,
  "employee_id" TEXT,
  "asset_id" TEXT,
  "request_date" TEXT,
  "status" TEXT
);

INSERT INTO "AssetRequest" ("id", "created_date", "updated_date", "created_by", "employee_email", "employee_id", "asset_id", "request_date", "status") VALUES ('6a9123cca8eee443bbf4479a', '2026-08-28T05:59:40.297000', '2026-08-28T05:59:40.297000', NULL, 'employee@demo.com', '6a9121a143ae589d52872b21', '6a9123cca7193e62a4fbf32c', '2026-08-25', 'pending');

-- ------------------------------------------------------------
-- Entity: BenefitEnrollment  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "BenefitEnrollment";
CREATE TABLE "BenefitEnrollment" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "employee_email" TEXT,
  "employee_id" TEXT,
  "benefit_plan_id" TEXT,
  "enrolled_date" TEXT,
  "status" TEXT
);

INSERT INTO "BenefitEnrollment" ("id", "created_date", "updated_date", "created_by", "employee_email", "employee_id", "benefit_plan_id", "enrolled_date", "status") VALUES ('6a9123c80b078a446196f9ba', '2026-08-28T05:59:36.246000', '2026-08-28T05:59:36.246000', NULL, 'employee@demo.com', '6a9121a143ae589d52872b21', '6a9123c6b5b3c8f955e68cdc', '2026-04-01', 'enrolled');

-- ------------------------------------------------------------
-- Entity: MeetingActionItem  (2 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "MeetingActionItem";
CREATE TABLE "MeetingActionItem" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "meeting_id" TEXT,
  "assignee_email" TEXT,
  "description" TEXT,
  "due_date" TEXT,
  "status" TEXT
);

INSERT INTO "MeetingActionItem" ("id", "created_date", "updated_date", "created_by", "meeting_id", "assignee_email", "description", "due_date", "status") VALUES ('6a93cbb04ba629cb36a3ce9a', '2026-08-30T06:20:32.998000', '2026-08-30T06:20:32.998000', NULL, '6a93cbb0eb44deef1f5d2521', 'employee@demo.com', 'Finalize API documentation', '2026-09-10', 'open');
INSERT INTO "MeetingActionItem" ("id", "created_date", "updated_date", "created_by", "meeting_id", "assignee_email", "description", "due_date", "status") VALUES ('6a93cbb04ba629cb36a3ce9b', '2026-08-30T06:20:32.998000', '2026-08-30T06:20:32.998000', NULL, '6a93cbb0eb44deef1f5d2521', 'manager@demo.com', 'Share sprint metrics', '2026-09-08', 'open');

-- ------------------------------------------------------------
-- Entity: TrainingSession  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "TrainingSession";
CREATE TABLE "TrainingSession" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "course_id" TEXT,
  "start_date" TEXT,
  "end_date" TEXT,
  "trainer" TEXT,
  "status" TEXT
);

INSERT INTO "TrainingSession" ("id", "created_date", "updated_date", "created_by", "course_id", "start_date", "end_date", "trainer", "status") VALUES ('6a9123cbd95e657628618e7d', '2026-08-28T05:59:39.277000', '2026-08-28T05:59:39.277000', NULL, '6a9123cbc9c283a41be9676a', '2026-09-01', '2026-09-15', 'Sara Joseph', 'scheduled');

-- ------------------------------------------------------------
-- Entity: Asset  (2 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Asset";
CREATE TABLE "Asset" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "name" TEXT,
  "category_id" TEXT,
  "vendor_id" TEXT,
  "serial" TEXT,
  "purchase_date" TEXT,
  "value" NUMERIC,
  "warranty_expiry" TEXT,
  "status" TEXT
);

INSERT INTO "Asset" ("id", "created_date", "updated_date", "created_by", "name", "category_id", "vendor_id", "serial", "purchase_date", "value", "warranty_expiry", "status") VALUES ('6a9123cc51cb84da5bf012a4', '2026-08-28T05:59:40.161000', '2026-08-28T05:59:40.161000', NULL, 'Dell Monitor 24', '6a9123cb52bcb38d0405de53', '6a9123cb1162736294376e65', 'DL-MON-002', '2026-05-01', 15000.0, '2028-05-01', 'allocated');
INSERT INTO "Asset" ("id", "created_date", "updated_date", "created_by", "name", "category_id", "vendor_id", "serial", "purchase_date", "value", "warranty_expiry", "status") VALUES ('6a9123cca7193e62a4fbf32c', '2026-08-28T05:59:40.011000', '2026-08-28T05:59:40.011000', NULL, 'Dell Latitude 5440', '6a9123cb52bcb38d0405de53', '6a9123cb1162736294376e65', 'DL-5440-001', '2026-05-01', 90000.0, '2029-05-01', 'available');

-- ------------------------------------------------------------
-- Entity: Project  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Project";
CREATE TABLE "Project" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "client_id" TEXT,
  "name" TEXT,
  "manager_id" TEXT,
  "start_date" TEXT,
  "end_date" TEXT,
  "budget" NUMERIC,
  "status" TEXT
);

INSERT INTO "Project" ("id", "created_date", "updated_date", "created_by", "client_id", "name", "manager_id", "start_date", "end_date", "budget", "status") VALUES ('6a9123c97102b87bcf98c1c7', '2026-08-28T05:59:37.179000', '2026-08-28T05:59:37.179000', NULL, '6a9123c825f0c812ccfc5d26', 'Website Revamp', '6a9121a0a049227f284f22cb', '2026-06-01', '2026-12-31', 2000000.0, 'active');

-- ------------------------------------------------------------
-- Entity: BenefitPlan  (2 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "BenefitPlan";
CREATE TABLE "BenefitPlan" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "name" TEXT,
  "type" TEXT,
  "provider" TEXT,
  "description" TEXT,
  "status" TEXT
);

INSERT INTO "BenefitPlan" ("id", "created_date", "updated_date", "created_by", "name", "type", "provider", "description", "status") VALUES ('6a9123c6b5b3c8f955e68cdc', '2026-08-28T05:59:34.421000', '2026-08-28T05:59:34.421000', NULL, 'Group Health Insurance', 'health', 'Star Health', 'Family floater 5L', 'active');
INSERT INTO "BenefitPlan" ("id", "created_date", "updated_date", "created_by", "name", "type", "provider", "description", "status") VALUES ('6a9123c6b5b3c8f955e68cdd', '2026-08-28T05:59:34.421000', '2026-08-28T05:59:34.421000', NULL, 'Group Term Life', 'insurance', 'LIC', 'Term cover 10L', 'active');

-- ------------------------------------------------------------
-- Entity: SalaryStructure  (2 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "SalaryStructure";
CREATE TABLE "SalaryStructure" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "name" TEXT,
  "base_salary" NUMERIC,
  "components" TEXT,
  "employer_pf_type" TEXT,
  "employer_pf_value" NUMERIC,
  "employer_esi_type" TEXT,
  "employer_esi_value" NUMERIC,
  "status" TEXT
);

INSERT INTO "SalaryStructure" ("id", "created_date", "updated_date", "created_by", "name", "base_salary", "components", "employer_pf_type", "employer_pf_value", "employer_esi_type", "employer_esi_value", "status") VALUES ('6a9123c412daf92eb0a94e72', '2026-08-28T05:59:32.748000', '2026-08-28T05:59:32.748000', NULL, 'Standard', 50000.0, '[{"code":"HRA","value":10000}]', NULL, NULL, NULL, NULL, 'active');
INSERT INTO "SalaryStructure" ("id", "created_date", "updated_date", "created_by", "name", "base_salary", "components", "employer_pf_type", "employer_pf_value", "employer_esi_type", "employer_esi_value", "status") VALUES ('6a9568461fdb688ba16d4281', '2026-08-31T11:40:54.875000', '2026-09-01T10:30:06.077000', NULL, 'Standard2', 6000.0, '[{"name":"Basic","code":"basic","type":"earning","calc_type":"percentage","value":100},{"name":"HRA","code":"hra","type":"earning","calc_type":"percentage","value":50},{"name":"Medical Allowance","code":"medical","type":"earning","calc_type":"percentage","value":12},{"name":"Conveyance","code":"conveyance","type":"earning","calc_type":"percentage","value":15},{"name":"Washing Allowance","code":"washing","type":"earning","calc_type":"percentage","value":10},{"name":"Special Allowance","code":"special","type":"earning","calc_type":"fixed","value":4160},{"name":"Previous Adjustments","code":"prev_adj","type":"earning","calc_type":"fixed","value":0},{"name":"Add: Variable Pay","code":"add_var","type":"earning","calc_type":"fixed","value":0},{"name":"PF","code":"pf","type":"deduction","calc_type":"percentage","value":12},{"name":"ESI","code":"esi","type":"deduction","calc_type":"percentage","value":0.75},{"name":"Professional Tax","code":"pt","type":"deduction","calc_type":"fixed","value":200},{"name":"Mediclaim","code":"mediclaim","type":"deduction","calc_type":"fixed","value":0},{"name":"TDS","code":"tds","type":"deduction","calc_type":"fixed","value":0},{"name":"Advance","code":"advance","type":"deduction","calc_type":"fixed","value":0},{"name":"Less: Variable Pay","code":"less_var","type":"deduction","calc_type":"fixed","value":0}]', 'percentage', 13.0, 'percentage', 3.25, 'active');

-- ------------------------------------------------------------
-- Entity: Policy  (3 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Policy";
CREATE TABLE "Policy" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "title" TEXT,
  "category" TEXT,
  "content" TEXT,
  "file_url" TEXT,
  "version" TEXT,
  "audience" TEXT,
  "department_id" TEXT,
  "status" TEXT
);

INSERT INTO "Policy" ("id", "created_date", "updated_date", "created_by", "title", "category", "content", "file_url", "version", "audience", "department_id", "status") VALUES ('6a93cbb2052cba82adee6208', '2026-08-30T06:20:34.082000', '2026-08-30T06:20:34.082000', NULL, 'Leave Policy 2026', 'Policy', 'Employees are entitled to 20 annual, 8 casual and 10 sick leaves per year. Carry-forward up to 5 days.', NULL, '2.0', 'all', NULL, 'active');
INSERT INTO "Policy" ("id", "created_date", "updated_date", "created_by", "title", "category", "content", "file_url", "version", "audience", "department_id", "status") VALUES ('6a93cbb2052cba82adee6209', '2026-08-30T06:20:34.082000', '2026-08-30T06:20:34.082000', NULL, 'Remote Work SOP', 'SOP', 'Remote work is permitted up to 2 days per week with prior manager approval.', NULL, '1.1', 'all', NULL, 'active');
INSERT INTO "Policy" ("id", "created_date", "updated_date", "created_by", "title", "category", "content", "file_url", "version", "audience", "department_id", "status") VALUES ('6a93cbb2052cba82adee620a', '2026-08-30T06:20:34.082000', '2026-08-30T06:20:34.082000', NULL, 'Offer Letter Template', 'Template', 'Dear {{employee_name}}, We are pleased to offer you the role of {{designation}}...', NULL, '1.0', 'all', NULL, 'active');

-- ------------------------------------------------------------
-- Entity: HelpdeskCategory  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "HelpdeskCategory";
CREATE TABLE "HelpdeskCategory" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "name" TEXT,
  "department_id" TEXT,
  "sla_hours" NUMERIC,
  "status" TEXT
);

INSERT INTO "HelpdeskCategory" ("id", "created_date", "updated_date", "created_by", "name", "department_id", "sla_hours", "status") VALUES ('6a93cbb11aa7904cdf9f1df1', '2026-08-30T06:20:33.143000', '2026-08-30T06:20:33.143000', NULL, 'IT Support', '6a9121a0f233ffb9844e4e93', 8.0, 'active');

-- ------------------------------------------------------------
-- Entity: LeavePolicy  (0 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "LeavePolicy";
CREATE TABLE "LeavePolicy" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "leave_type_id" TEXT,
  "branch_id" TEXT,
  "accrual_rate" NUMERIC,
  "max_per_year" NUMERIC,
  "status" TEXT
);


-- ------------------------------------------------------------
-- Entity: JobRequisition  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "JobRequisition";
CREATE TABLE "JobRequisition" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "department_id" TEXT,
  "title" TEXT,
  "headcount" NUMERIC,
  "description" TEXT,
  "status" TEXT
);

INSERT INTO "JobRequisition" ("id", "created_date", "updated_date", "created_by", "department_id", "title", "headcount", "description", "status") VALUES ('6a9123c9be4a6e236bab3eb3', '2026-08-28T05:59:37.537000', '2026-08-28T05:59:37.537000', NULL, '6a9121a0f233ffb9844e4e93', 'Senior Software Engineer', 2.0, 'Backend engineer', 'open');

-- ------------------------------------------------------------
-- Entity: LeaveBalance  (4 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "LeaveBalance";
CREATE TABLE "LeaveBalance" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "employee_email" TEXT,
  "employee_id" TEXT,
  "leave_type_id" TEXT,
  "balance" NUMERIC,
  "used" NUMERIC,
  "carried" NUMERIC
);

INSERT INTO "LeaveBalance" ("id", "created_date", "updated_date", "created_by", "employee_email", "employee_id", "leave_type_id", "balance", "used", "carried") VALUES ('6a9123c31ce4f4107fadee44', '2026-08-28T05:59:31.606000', '2026-08-28T05:59:31.606000', NULL, 'employee@demo.com', '6a9121a143ae589d52872b21', '6a9123c3fd5111be87ebe5ab', 20.0, 2.0, 0.0);
INSERT INTO "LeaveBalance" ("id", "created_date", "updated_date", "created_by", "employee_email", "employee_id", "leave_type_id", "balance", "used", "carried") VALUES ('6a9123c31ce4f4107fadee45', '2026-08-28T05:59:31.606000', '2026-08-28T05:59:31.606000', NULL, 'employee@demo.com', '6a9121a143ae589d52872b21', '6a9123c3fd5111be87ebe5ac', 8.0, 1.0, 0.0);
INSERT INTO "LeaveBalance" ("id", "created_date", "updated_date", "created_by", "employee_email", "employee_id", "leave_type_id", "balance", "used", "carried") VALUES ('6a9123c31ce4f4107fadee46', '2026-08-28T05:59:31.606000', '2026-08-28T05:59:31.606000', NULL, 'employee@demo.com', '6a9121a143ae589d52872b21', '6a9123c3fd5111be87ebe5ad', 10.0, 0.0, 0.0);
INSERT INTO "LeaveBalance" ("id", "created_date", "updated_date", "created_by", "employee_email", "employee_id", "leave_type_id", "balance", "used", "carried") VALUES ('6a9123c31ce4f4107fadee47', '2026-08-28T05:59:31.606000', '2026-08-28T05:59:31.606000', NULL, 'manager@demo.com', '6a9121a0a049227f284f22cb', '6a9123c3fd5111be87ebe5ab', 20.0, 5.0, 0.0);

-- ------------------------------------------------------------
-- Entity: Employee  (20 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Employee";
CREATE TABLE "Employee" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "employee_code" TEXT,
  "first_name" TEXT,
  "middle_name" TEXT,
  "last_name" TEXT,
  "preferred_name" TEXT,
  "date_of_birth" TEXT,
  "gender" TEXT,
  "personal_email" TEXT,
  "work_email" TEXT,
  "phone" TEXT,
  "emergency_contact" TEXT,
  "date_of_joining" TEXT,
  "employment_status" TEXT,
  "employment_type" TEXT,
  "role" TEXT,
  "branch_id" TEXT,
  "department_id" TEXT,
  "team_id" TEXT,
  "designation_id" TEXT,
  "job_grade_id" TEXT,
  "manager_id" TEXT,
  "profile_photo" TEXT,
  "status" TEXT
);

INSERT INTO "Employee" ("id", "created_date", "updated_date", "created_by", "employee_code", "first_name", "middle_name", "last_name", "preferred_name", "date_of_birth", "gender", "personal_email", "work_email", "phone", "emergency_contact", "date_of_joining", "employment_status", "employment_type", "role", "branch_id", "department_id", "team_id", "designation_id", "job_grade_id", "manager_id", "profile_photo", "status") VALUES ('6a9121a0a049227f284f22ca', '2026-08-28T05:50:24.657000', '2026-08-28T05:50:24.657000', NULL, 'EMP001', 'Vikram', NULL, 'Rao', NULL, NULL, 'Male', 'vikram.personal@gmail.com', 'admin@demo.com', '+91 90000 00001', NULL, '2018-04-01', 'Active', 'Full-time', NULL, '6a91219f428f44a0610a5677', '6a9121a0f233ffb9844e4e93', NULL, '6a9121a0bb94e2a0925759ac', '6a9121a09c00633bce76d909', NULL, NULL, 'active');
INSERT INTO "Employee" ("id", "created_date", "updated_date", "created_by", "employee_code", "first_name", "middle_name", "last_name", "preferred_name", "date_of_birth", "gender", "personal_email", "work_email", "phone", "emergency_contact", "date_of_joining", "employment_status", "employment_type", "role", "branch_id", "department_id", "team_id", "designation_id", "job_grade_id", "manager_id", "profile_photo", "status") VALUES ('6a9121a0a049227f284f22cb', '2026-08-28T05:50:24.657000', '2026-08-28T05:50:24.876000', NULL, 'EMP002', 'Aisha', NULL, 'Khan', NULL, NULL, 'Female', 'aisha.k@gmail.com', 'manager@demo.com', '+91 90000 00002', NULL, '2019-06-15', 'Active', 'Full-time', NULL, '6a91219f428f44a0610a5677', '6a9121a0f233ffb9844e4e93', NULL, '6a9121a0bb94e2a0925759ad', '6a9121a09c00633bce76d907', '6a9121a0a049227f284f22ca', NULL, 'active');
INSERT INTO "Employee" ("id", "created_date", "updated_date", "created_by", "employee_code", "first_name", "middle_name", "last_name", "preferred_name", "date_of_birth", "gender", "personal_email", "work_email", "phone", "emergency_contact", "date_of_joining", "employment_status", "employment_type", "role", "branch_id", "department_id", "team_id", "designation_id", "job_grade_id", "manager_id", "profile_photo", "status") VALUES ('6a9121a0a049227f284f22cc', '2026-08-28T05:50:24.657000', '2026-08-28T05:50:24.876000', NULL, 'EMP003', 'Rahul', NULL, 'Verma', NULL, NULL, 'Male', NULL, 'rahul@worknest.com', '+91 90000 00003', NULL, '2019-08-20', 'Active', 'Full-time', NULL, '6a91219f428f44a0610a5678', '6a9121a0f233ffb9844e4e96', NULL, '6a9121a0bb94e2a0925759ad', '6a9121a09c00633bce76d907', '6a9121a0a049227f284f22ca', NULL, 'active');
INSERT INTO "Employee" ("id", "created_date", "updated_date", "created_by", "employee_code", "first_name", "middle_name", "last_name", "preferred_name", "date_of_birth", "gender", "personal_email", "work_email", "phone", "emergency_contact", "date_of_joining", "employment_status", "employment_type", "role", "branch_id", "department_id", "team_id", "designation_id", "job_grade_id", "manager_id", "profile_photo", "status") VALUES ('6a9121a0a049227f284f22cd', '2026-08-28T05:50:24.657000', '2026-08-28T05:50:24.876000', NULL, 'EMP004', 'Neha', NULL, 'Singh', NULL, NULL, 'Female', NULL, 'neha@worknest.com', '+91 90000 00004', NULL, '2020-01-10', 'Active', 'Full-time', NULL, '6a91219f428f44a0610a5677', '6a9121a0f233ffb9844e4e95', NULL, '6a9121a0bb94e2a0925759b0', '6a9121a09c00633bce76d907', '6a9121a0a049227f284f22ca', NULL, 'active');
INSERT INTO "Employee" ("id", "created_date", "updated_date", "created_by", "employee_code", "first_name", "middle_name", "last_name", "preferred_name", "date_of_birth", "gender", "personal_email", "work_email", "phone", "emergency_contact", "date_of_joining", "employment_status", "employment_type", "role", "branch_id", "department_id", "team_id", "designation_id", "job_grade_id", "manager_id", "profile_photo", "status") VALUES ('6a9121a143ae589d52872b14', '2026-08-28T05:50:25.237000', '2026-08-28T05:50:25.237000', NULL, 'EMP005', 'Arjun', NULL, 'Mehta', NULL, NULL, 'Male', NULL, 'arjun@worknest.com', '+91 90000 00005', NULL, '2020-07-01', 'Active', 'Full-time', NULL, '6a91219f428f44a0610a5677', '6a9121a0f233ffb9844e4e93', '6a9121a1a5a42c79a3ff82cf', '6a9121a0bb94e2a0925759ae', '6a9121a09c00633bce76d906', '6a9121a0a049227f284f22cb', NULL, 'active');
INSERT INTO "Employee" ("id", "created_date", "updated_date", "created_by", "employee_code", "first_name", "middle_name", "last_name", "preferred_name", "date_of_birth", "gender", "personal_email", "work_email", "phone", "emergency_contact", "date_of_joining", "employment_status", "employment_type", "role", "branch_id", "department_id", "team_id", "designation_id", "job_grade_id", "manager_id", "profile_photo", "status") VALUES ('6a9121a143ae589d52872b15', '2026-08-28T05:50:25.237000', '2026-08-28T05:50:25.237000', NULL, 'EMP006', 'Sara', NULL, 'Joseph', NULL, NULL, 'Female', NULL, 'sara@worknest.com', '+91 90000 00006', NULL, '2020-09-15', 'Active', 'Full-time', NULL, '6a91219f428f44a0610a5677', '6a9121a0f233ffb9844e4e93', '6a9121a1a5a42c79a3ff82d0', '6a9121a0bb94e2a0925759ae', '6a9121a09c00633bce76d906', '6a9121a0a049227f284f22cb', NULL, 'active');
INSERT INTO "Employee" ("id", "created_date", "updated_date", "created_by", "employee_code", "first_name", "middle_name", "last_name", "preferred_name", "date_of_birth", "gender", "personal_email", "work_email", "phone", "emergency_contact", "date_of_joining", "employment_status", "employment_type", "role", "branch_id", "department_id", "team_id", "designation_id", "job_grade_id", "manager_id", "profile_photo", "status") VALUES ('6a9121a143ae589d52872b16', '2026-08-28T05:50:25.237000', '2026-08-28T05:50:25.237000', NULL, 'EMP007', 'Karan', NULL, 'Malhotra', NULL, NULL, 'Male', NULL, 'karan@worknest.com', '+91 90000 00007', NULL, '2021-02-01', 'Active', 'Full-time', NULL, '6a91219f428f44a0610a5677', '6a9121a0f233ffb9844e4e93', '6a9121a1a5a42c79a3ff82d1', '6a9121a0bb94e2a0925759af', '6a9121a09c00633bce76d906', '6a9121a0a049227f284f22cb', NULL, 'active');
INSERT INTO "Employee" ("id", "created_date", "updated_date", "created_by", "employee_code", "first_name", "middle_name", "last_name", "preferred_name", "date_of_birth", "gender", "personal_email", "work_email", "phone", "emergency_contact", "date_of_joining", "employment_status", "employment_type", "role", "branch_id", "department_id", "team_id", "designation_id", "job_grade_id", "manager_id", "profile_photo", "status") VALUES ('6a9121a143ae589d52872b17', '2026-08-28T05:50:25.237000', '2026-08-28T05:50:25.237000', NULL, 'EMP008', 'Priya', NULL, 'Nair', NULL, NULL, 'Female', NULL, 'priya@worknest.com', '+91 90000 00008', NULL, '2021-03-20', 'Active', 'Full-time', NULL, '6a91219f428f44a0610a5677', '6a9121a0f233ffb9844e4e93', '6a9121a1a5a42c79a3ff82cf', '6a9121a0bb94e2a0925759af', '6a9121a09c00633bce76d906', '6a9121a0a049227f284f22cb', NULL, 'active');
INSERT INTO "Employee" ("id", "created_date", "updated_date", "created_by", "employee_code", "first_name", "middle_name", "last_name", "preferred_name", "date_of_birth", "gender", "personal_email", "work_email", "phone", "emergency_contact", "date_of_joining", "employment_status", "employment_type", "role", "branch_id", "department_id", "team_id", "designation_id", "job_grade_id", "manager_id", "profile_photo", "status") VALUES ('6a9121a143ae589d52872b18', '2026-08-28T05:50:25.237000', '2026-08-28T05:50:25.237000', NULL, 'EMP009', 'Dev', NULL, 'Patel', NULL, NULL, 'Male', NULL, 'dev@worknest.com', '+91 90000 00009', NULL, '2021-05-11', 'Active', 'Full-time', NULL, '6a91219f428f44a0610a5677', '6a9121a0f233ffb9844e4e93', '6a9121a1a5a42c79a3ff82d0', '6a9121a0bb94e2a0925759af', '6a9121a09c00633bce76d906', '6a9121a0a049227f284f22cb', NULL, 'active');
INSERT INTO "Employee" ("id", "created_date", "updated_date", "created_by", "employee_code", "first_name", "middle_name", "last_name", "preferred_name", "date_of_birth", "gender", "personal_email", "work_email", "phone", "emergency_contact", "date_of_joining", "employment_status", "employment_type", "role", "branch_id", "department_id", "team_id", "designation_id", "job_grade_id", "manager_id", "profile_photo", "status") VALUES ('6a9121a143ae589d52872b19', '2026-08-28T05:50:25.238000', '2026-08-28T05:50:25.238000', NULL, 'EMP010', 'Meera', NULL, 'Iyer', NULL, NULL, 'Female', NULL, 'meera@worknest.com', '+91 90000 00010', NULL, '2021-06-01', 'Active', 'Full-time', NULL, '6a91219f428f44a0610a5677', '6a9121a0f233ffb9844e4e94', NULL, '6a9121a0bb94e2a0925759af', '6a9121a09c00633bce76d906', '6a9121a0a049227f284f22ca', NULL, 'active');
INSERT INTO "Employee" ("id", "created_date", "updated_date", "created_by", "employee_code", "first_name", "middle_name", "last_name", "preferred_name", "date_of_birth", "gender", "personal_email", "work_email", "phone", "emergency_contact", "date_of_joining", "employment_status", "employment_type", "role", "branch_id", "department_id", "team_id", "designation_id", "job_grade_id", "manager_id", "profile_photo", "status") VALUES ('6a9121a143ae589d52872b1a', '2026-08-28T05:50:25.238000', '2026-08-31T06:13:17.566000', NULL, 'EMP011', 'Rohit', NULL, 'Sharma', NULL, NULL, 'Male', NULL, 'rohit@worknest.com', '+91 90000 00011', NULL, '2021-07-15', 'Active', 'Full-time', 'Employee', '6a91219f428f44a0610a5677', '6a9121a0f233ffb9844e4e93', NULL, '6a9121a0bb94e2a0925759af', '6a9121a09c00633bce76d906', '6a9121a0a049227f284f22cd', NULL, 'active');
INSERT INTO "Employee" ("id", "created_date", "updated_date", "created_by", "employee_code", "first_name", "middle_name", "last_name", "preferred_name", "date_of_birth", "gender", "personal_email", "work_email", "phone", "emergency_contact", "date_of_joining", "employment_status", "employment_type", "role", "branch_id", "department_id", "team_id", "designation_id", "job_grade_id", "manager_id", "profile_photo", "status") VALUES ('6a9121a143ae589d52872b1b', '2026-08-28T05:50:25.238000', '2026-08-28T05:50:25.238000', NULL, 'EMP012', 'Anita', NULL, 'Desai', NULL, NULL, 'Female', NULL, 'anita@worknest.com', '+91 90000 00012', NULL, '2021-08-01', 'Active', 'Full-time', NULL, '6a91219f428f44a0610a5677', '6a9121a0f233ffb9844e4e95', NULL, '6a9121a0bb94e2a0925759af', '6a9121a09c00633bce76d906', '6a9121a0a049227f284f22cd', NULL, 'active');
INSERT INTO "Employee" ("id", "created_date", "updated_date", "created_by", "employee_code", "first_name", "middle_name", "last_name", "preferred_name", "date_of_birth", "gender", "personal_email", "work_email", "phone", "emergency_contact", "date_of_joining", "employment_status", "employment_type", "role", "branch_id", "department_id", "team_id", "designation_id", "job_grade_id", "manager_id", "profile_photo", "status") VALUES ('6a9121a143ae589d52872b1c', '2026-08-28T05:50:25.238000', '2026-08-28T05:50:25.238000', NULL, 'EMP013', 'Sam', NULL, 'Thomas', NULL, NULL, 'Male', NULL, 'sam@worknest.com', '+91 90000 00013', NULL, '2021-09-10', 'Active', 'Full-time', NULL, '6a91219f428f44a0610a5678', '6a9121a0f233ffb9844e4e96', NULL, '6a9121a0bb94e2a0925759b1', '6a9121a09c00633bce76d906', '6a9121a0a049227f284f22cc', NULL, 'active');
INSERT INTO "Employee" ("id", "created_date", "updated_date", "created_by", "employee_code", "first_name", "middle_name", "last_name", "preferred_name", "date_of_birth", "gender", "personal_email", "work_email", "phone", "emergency_contact", "date_of_joining", "employment_status", "employment_type", "role", "branch_id", "department_id", "team_id", "designation_id", "job_grade_id", "manager_id", "profile_photo", "status") VALUES ('6a9121a143ae589d52872b1d', '2026-08-28T05:50:25.238000', '2026-08-28T05:50:25.238000', NULL, 'EMP014', 'Leena', NULL, 'Fernandes', NULL, NULL, 'Female', NULL, 'leena@worknest.com', '+91 90000 00014', NULL, '2021-10-05', 'Active', 'Full-time', NULL, '6a91219f428f44a0610a5678', '6a9121a0f233ffb9844e4e96', NULL, '6a9121a0bb94e2a0925759b1', '6a9121a09c00633bce76d906', '6a9121a0a049227f284f22cc', NULL, 'active');
INSERT INTO "Employee" ("id", "created_date", "updated_date", "created_by", "employee_code", "first_name", "middle_name", "last_name", "preferred_name", "date_of_birth", "gender", "personal_email", "work_email", "phone", "emergency_contact", "date_of_joining", "employment_status", "employment_type", "role", "branch_id", "department_id", "team_id", "designation_id", "job_grade_id", "manager_id", "profile_photo", "status") VALUES ('6a9121a143ae589d52872b1e', '2026-08-28T05:50:25.238000', '2026-08-28T05:50:25.238000', NULL, 'EMP015', 'Imran', NULL, 'Sheikh', NULL, NULL, 'Male', NULL, 'imran@worknest.com', '+91 90000 00015', NULL, '2021-11-20', 'Active', 'Full-time', NULL, '6a91219f428f44a0610a5678', '6a9121a0f233ffb9844e4e96', NULL, '6a9121a0bb94e2a0925759b1', '6a9121a09c00633bce76d906', '6a9121a0a049227f284f22cc', NULL, 'active');
INSERT INTO "Employee" ("id", "created_date", "updated_date", "created_by", "employee_code", "first_name", "middle_name", "last_name", "preferred_name", "date_of_birth", "gender", "personal_email", "work_email", "phone", "emergency_contact", "date_of_joining", "employment_status", "employment_type", "role", "branch_id", "department_id", "team_id", "designation_id", "job_grade_id", "manager_id", "profile_photo", "status") VALUES ('6a9121a143ae589d52872b1f', '2026-08-28T05:50:25.238000', '2026-08-28T05:50:25.238000', NULL, 'EMP016', 'Pooja', NULL, 'Bhat', NULL, NULL, 'Female', NULL, 'pooja@worknest.com', '+91 90000 00016', NULL, '2022-01-12', 'Active', 'Full-time', NULL, '6a91219f428f44a0610a5679', '6a9121a0f233ffb9844e4e97', NULL, '6a9121a0bb94e2a0925759af', '6a9121a09c00633bce76d906', '6a9121a0a049227f284f22ca', NULL, 'active');
INSERT INTO "Employee" ("id", "created_date", "updated_date", "created_by", "employee_code", "first_name", "middle_name", "last_name", "preferred_name", "date_of_birth", "gender", "personal_email", "work_email", "phone", "emergency_contact", "date_of_joining", "employment_status", "employment_type", "role", "branch_id", "department_id", "team_id", "designation_id", "job_grade_id", "manager_id", "profile_photo", "status") VALUES ('6a9121a143ae589d52872b20', '2026-08-28T05:50:25.238000', '2026-08-28T05:50:25.238000', NULL, 'EMP017', 'Nikhil', NULL, 'Gupta', NULL, NULL, 'Male', NULL, 'nikhil@worknest.com', '+91 90000 00017', NULL, '2022-02-01', 'Active', 'Full-time', NULL, '6a91219f428f44a0610a5679', '6a9121a0f233ffb9844e4e97', NULL, '6a9121a0bb94e2a0925759af', '6a9121a09c00633bce76d906', '6a9121a0a049227f284f22ca', NULL, 'active');
INSERT INTO "Employee" ("id", "created_date", "updated_date", "created_by", "employee_code", "first_name", "middle_name", "last_name", "preferred_name", "date_of_birth", "gender", "personal_email", "work_email", "phone", "emergency_contact", "date_of_joining", "employment_status", "employment_type", "role", "branch_id", "department_id", "team_id", "designation_id", "job_grade_id", "manager_id", "profile_photo", "status") VALUES ('6a9121a143ae589d52872b21', '2026-08-28T05:50:25.238000', '2026-08-28T05:50:25.238000', NULL, 'EMP018', 'Zara', NULL, 'Ali', NULL, NULL, 'Female', NULL, 'employee@demo.com', '+91 90000 00018', NULL, '2022-03-15', 'Active', 'Full-time', NULL, '6a91219f428f44a0610a5677', '6a9121a0f233ffb9844e4e93', '6a9121a1a5a42c79a3ff82cf', '6a9121a0bb94e2a0925759af', '6a9121a09c00633bce76d90a', '6a9121a0a049227f284f22cb', NULL, 'active');
INSERT INTO "Employee" ("id", "created_date", "updated_date", "created_by", "employee_code", "first_name", "middle_name", "last_name", "preferred_name", "date_of_birth", "gender", "personal_email", "work_email", "phone", "emergency_contact", "date_of_joining", "employment_status", "employment_type", "role", "branch_id", "department_id", "team_id", "designation_id", "job_grade_id", "manager_id", "profile_photo", "status") VALUES ('6a9121a143ae589d52872b22', '2026-08-28T05:50:25.238000', '2026-08-28T05:50:25.238000', NULL, 'EMP019', 'Yash', NULL, 'Agarwal', NULL, NULL, 'Male', NULL, 'yash@worknest.com', '+91 90000 00019', NULL, '2022-04-10', 'Onboarding', 'Intern', NULL, '6a91219f428f44a0610a5677', '6a9121a0f233ffb9844e4e93', '6a9121a1a5a42c79a3ff82d0', '6a9121a0bb94e2a0925759af', '6a9121a09c00633bce76d90a', '6a9121a0a049227f284f22cb', NULL, 'active');
INSERT INTO "Employee" ("id", "created_date", "updated_date", "created_by", "employee_code", "first_name", "middle_name", "last_name", "preferred_name", "date_of_birth", "gender", "personal_email", "work_email", "phone", "emergency_contact", "date_of_joining", "employment_status", "employment_type", "role", "branch_id", "department_id", "team_id", "designation_id", "job_grade_id", "manager_id", "profile_photo", "status") VALUES ('6a9121a143ae589d52872b23', '2026-08-28T05:50:25.238000', '2026-08-28T05:50:25.238000', NULL, 'EMP020', 'Tara', NULL, 'Menon', NULL, NULL, 'Female', NULL, 'tara@worknest.com', '+91 90000 00020', NULL, '2022-05-01', 'Resigned', 'Full-time', NULL, '6a91219f428f44a0610a5677', '6a9121a0f233ffb9844e4e94', NULL, '6a9121a0bb94e2a0925759af', '6a9121a09c00633bce76d906', '6a9121a0a049227f284f22ca', NULL, 'inactive');

-- ------------------------------------------------------------
-- Entity: PulseResponse  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "PulseResponse";
CREATE TABLE "PulseResponse" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "survey_id" TEXT,
  "employee_email" TEXT,
  "answers" TEXT,
  "submitted_at" TEXT
);

INSERT INTO "PulseResponse" ("id", "created_date", "updated_date", "created_by", "survey_id", "employee_email", "answers", "submitted_at") VALUES ('6a93cbb0056a2fe5a63d66d1', '2026-08-30T06:20:32.019000', '2026-08-30T06:20:32.019000', NULL, '6a93cbafc6f8eb8bad1cfbf8', 'employee@demo.com', '{"How satisfied are you with your role?":4,"Do you feel valued?":5,"Any blockers?":"none"}', '2026-08-30T06:20:31.925Z');

-- ------------------------------------------------------------
-- Entity: Branch  (3 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Branch";
CREATE TABLE "Branch" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "company_id" TEXT,
  "branch_code" TEXT,
  "branch_name" TEXT,
  "head_office" TEXT,
  "contact_person" TEXT,
  "email" TEXT,
  "phone" TEXT,
  "address" TEXT,
  "city" TEXT,
  "state" TEXT,
  "country" TEXT,
  "postal_code" TEXT,
  "timezone" TEXT,
  "status" TEXT
);

INSERT INTO "Branch" ("id", "created_date", "updated_date", "created_by", "company_id", "branch_code", "branch_name", "head_office", "contact_person", "email", "phone", "address", "city", "state", "country", "postal_code", "timezone", "status") VALUES ('6a91219f428f44a0610a5677', '2026-08-28T05:50:23.840000', '2026-08-28T05:50:23.840000', NULL, '6a91219fa66d9f7294906f6b', 'HO-MUM', 'Mumbai HQ', 'yes', 'Aisha Khan', 'mumbai@worknest.com', '+91 22 4000 1000', NULL, 'Mumbai', 'Maharashtra', 'India', '400069', 'Asia/Kolkata', 'active');
INSERT INTO "Branch" ("id", "created_date", "updated_date", "created_by", "company_id", "branch_code", "branch_name", "head_office", "contact_person", "email", "phone", "address", "city", "state", "country", "postal_code", "timezone", "status") VALUES ('6a91219f428f44a0610a5678', '2026-08-28T05:50:23.840000', '2026-08-28T05:50:23.840000', NULL, '6a91219fa66d9f7294906f6b', 'BLR-01', 'Bangalore', 'no', 'Rahul Verma', 'bangalore@worknest.com', '+91 80 5000 2000', NULL, 'Bangalore', 'Karnataka', 'India', '560001', 'Asia/Kolkata', 'active');
INSERT INTO "Branch" ("id", "created_date", "updated_date", "created_by", "company_id", "branch_code", "branch_name", "head_office", "contact_person", "email", "phone", "address", "city", "state", "country", "postal_code", "timezone", "status") VALUES ('6a91219f428f44a0610a5679', '2026-08-28T05:50:23.840000', '2026-08-28T05:50:23.840000', NULL, '6a91219fa66d9f7294906f6b', 'DEL-01', 'Delhi', 'no', 'Neha Singh', 'delhi@worknest.com', '+91 11 6000 3000', NULL, 'New Delhi', 'Delhi', 'India', '110001', 'Asia/Kolkata', 'active');

-- ------------------------------------------------------------
-- Entity: AssetCategory  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "AssetCategory";
CREATE TABLE "AssetCategory" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "name" TEXT,
  "description" TEXT,
  "status" TEXT
);

INSERT INTO "AssetCategory" ("id", "created_date", "updated_date", "created_by", "name", "description", "status") VALUES ('6a9123cb52bcb38d0405de53', '2026-08-28T05:59:39.720000', '2026-08-28T05:59:39.720000', NULL, 'IT Hardware', NULL, 'active');

-- ------------------------------------------------------------
-- Entity: Enrollment  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Enrollment";
CREATE TABLE "Enrollment" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "employee_email" TEXT,
  "employee_id" TEXT,
  "session_id" TEXT,
  "status" TEXT,
  "certificate_url" TEXT
);

INSERT INTO "Enrollment" ("id", "created_date", "updated_date", "created_by", "employee_email", "employee_id", "session_id", "status", "certificate_url") VALUES ('6a9123cb004cba4761e997e3', '2026-08-28T05:59:39.555000', '2026-08-28T05:59:39.555000', NULL, 'manager@demo.com', '6a9121a0a049227f284f22cb', '6a9123cbd95e657628618e7d', 'enrolled', NULL);

-- ------------------------------------------------------------
-- Entity: AppSetting  (6 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "AppSetting";
CREATE TABLE "AppSetting" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "key" TEXT,
  "value" TEXT,
  "category" TEXT
);

INSERT INTO "AppSetting" ("id", "created_date", "updated_date", "created_by", "key", "value", "category") VALUES ('6a9121a3c0f87a19136dffb0', '2026-08-28T05:50:27.191000', '2026-08-28T06:23:26.414000', NULL, 'company_legal_name', 'Maxbridge Solution', 'Company');
INSERT INTO "AppSetting" ("id", "created_date", "updated_date", "created_by", "key", "value", "category") VALUES ('6a9121a3c0f87a19136dffb1', '2026-08-28T05:50:27.191000', '2026-08-28T05:50:27.191000', NULL, 'hr_default_timezone', 'Asia/Kolkata', 'HR Defaults');
INSERT INTO "AppSetting" ("id", "created_date", "updated_date", "created_by", "key", "value", "category") VALUES ('6a91295ee8915c9ba424268a', '2026-08-28T06:23:26.815000', '2026-08-28T06:23:26.815000', NULL, 'company_industry', '', 'Company');
INSERT INTO "AppSetting" ("id", "created_date", "updated_date", "created_by", "key", "value", "category") VALUES ('6a93d10e3c4258b780c2dced', '2026-08-30T06:43:26.564000', '2026-08-30T06:43:26.564000', NULL, 'branding_logo_url', '', 'Branding');
INSERT INTO "AppSetting" ("id", "created_date", "updated_date", "created_by", "key", "value", "category") VALUES ('6a93d10e5c1b918f6d59d3d8', '2026-08-30T06:43:26.213000', '2026-08-30T06:43:26.213000', NULL, 'branding_primary_color', '', 'Branding');
INSERT INTO "AppSetting" ("id", "created_date", "updated_date", "created_by", "key", "value", "category") VALUES ('6a93d10ed10294375af7f99c', '2026-08-30T06:43:26.919000', '2026-08-30T06:43:26.919000', NULL, 'branding_app_name', 'MBS HRMS', 'Branding');

-- ------------------------------------------------------------
-- Entity: JobGrade  (5 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "JobGrade";
CREATE TABLE "JobGrade" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "grade_code" TEXT,
  "grade_name" TEXT,
  "minimum_salary" NUMERIC,
  "maximum_salary" NUMERIC,
  "description" TEXT,
  "status" TEXT
);

INSERT INTO "JobGrade" ("id", "created_date", "updated_date", "created_by", "grade_code", "grade_name", "minimum_salary", "maximum_salary", "description", "status") VALUES ('6a9121a09c00633bce76d906', '2026-08-28T05:50:24.453000', '2026-08-28T05:50:24.453000', NULL, 'E1', 'Executive', 800000.0, 1500000.0, NULL, 'active');
INSERT INTO "JobGrade" ("id", "created_date", "updated_date", "created_by", "grade_code", "grade_name", "minimum_salary", "maximum_salary", "description", "status") VALUES ('6a9121a09c00633bce76d907', '2026-08-28T05:50:24.453000', '2026-08-28T05:50:24.453000', NULL, 'M1', 'Manager', 1500000.0, 3000000.0, NULL, 'active');
INSERT INTO "JobGrade" ("id", "created_date", "updated_date", "created_by", "grade_code", "grade_name", "minimum_salary", "maximum_salary", "description", "status") VALUES ('6a9121a09c00633bce76d908', '2026-08-28T05:50:24.453000', '2026-08-28T05:50:24.453000', NULL, 'D1', 'Director', 3000000.0, 6000000.0, NULL, 'active');
INSERT INTO "JobGrade" ("id", "created_date", "updated_date", "created_by", "grade_code", "grade_name", "minimum_salary", "maximum_salary", "description", "status") VALUES ('6a9121a09c00633bce76d909', '2026-08-28T05:50:24.453000', '2026-08-28T05:50:24.453000', NULL, 'C1', 'C-Level', 6000000.0, 12000000.0, NULL, 'active');
INSERT INTO "JobGrade" ("id", "created_date", "updated_date", "created_by", "grade_code", "grade_name", "minimum_salary", "maximum_salary", "description", "status") VALUES ('6a9121a09c00633bce76d90a', '2026-08-28T05:50:24.453000', '2026-08-28T05:50:24.453000', NULL, 'T1', 'Trainee', 300000.0, 600000.0, NULL, 'active');

-- ------------------------------------------------------------
-- Entity: Loan  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Loan";
CREATE TABLE "Loan" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "employee_email" TEXT,
  "employee_id" TEXT,
  "loan_type" TEXT,
  "principal" NUMERIC,
  "interest_rate" NUMERIC,
  "tenure_months" NUMERIC,
  "emi_amount" NUMERIC,
  "disbursed_date" TEXT,
  "outstanding" NUMERIC,
  "schedule" TEXT,
  "status" TEXT
);

INSERT INTO "Loan" ("id", "created_date", "updated_date", "created_by", "employee_email", "employee_id", "loan_type", "principal", "interest_rate", "tenure_months", "emi_amount", "disbursed_date", "outstanding", "schedule", "status") VALUES ('6a9123c5fe06bc8d2bb18715', '2026-08-28T05:59:33.524000', '2026-08-28T05:59:33.524000', NULL, 'employee@demo.com', '6a9121a143ae589d52872b21', 'personal', 50000.0, 8.0, 12.0, 4349.0, '2026-06-01', 45000.0, NULL, 'active');

-- ------------------------------------------------------------
-- Entity: ActivityLog  (2 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "ActivityLog";
CREATE TABLE "ActivityLog" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "user_email" TEXT,
  "module" TEXT,
  "action" TEXT,
  "entity" TEXT,
  "entity_id" TEXT,
  "ip_address" TEXT
);

INSERT INTO "ActivityLog" ("id", "created_date", "updated_date", "created_by", "user_email", "module", "action", "entity", "entity_id", "ip_address") VALUES ('6a9121a15cf8fa941864b4a8', '2026-08-28T05:50:25.713000', '2026-08-28T05:50:25.713000', NULL, 'admin@demo.com', 'Employees', 'create', 'Employee', '6a9121a0a049227f284f22ca', NULL);
INSERT INTO "ActivityLog" ("id", "created_date", "updated_date", "created_by", "user_email", "module", "action", "entity", "entity_id", "ip_address") VALUES ('6a9121a15cf8fa941864b4a9', '2026-08-28T05:50:25.713000', '2026-08-28T05:50:25.713000', NULL, 'manager@demo.com', 'Leave', 'approve', 'LeaveRequest', 'LR-0001', NULL);

-- ------------------------------------------------------------
-- Entity: AnnouncementRead  (0 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "AnnouncementRead";
CREATE TABLE "AnnouncementRead" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "announcement_id" TEXT,
  "user_email" TEXT,
  "read_at" TEXT
);


-- ------------------------------------------------------------
-- Entity: PerformanceReview  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "PerformanceReview";
CREATE TABLE "PerformanceReview" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "employee_email" TEXT,
  "employee_id" TEXT,
  "review_cycle_id" TEXT,
  "self_rating" NUMERIC,
  "manager_rating" NUMERIC,
  "final_rating" NUMERIC,
  "status" TEXT,
  "acknowledgement_date" TEXT
);

INSERT INTO "PerformanceReview" ("id", "created_date", "updated_date", "created_by", "employee_email", "employee_id", "review_cycle_id", "self_rating", "manager_rating", "final_rating", "status", "acknowledgement_date") VALUES ('6a9123ca17606fe66700e4ed', '2026-08-28T05:59:38.699000', '2026-08-28T05:59:38.699000', NULL, 'employee@demo.com', '6a9121a143ae589d52872b21', '6a9123cad73a8edb7f5119db', 4.0, NULL, NULL, 'manager', NULL);

-- ------------------------------------------------------------
-- Entity: Dependent  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Dependent";
CREATE TABLE "Dependent" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "employee_email" TEXT,
  "employee_id" TEXT,
  "name" TEXT,
  "relationship" TEXT,
  "date_of_birth" TEXT
);

INSERT INTO "Dependent" ("id", "created_date", "updated_date", "created_by", "employee_email", "employee_id", "name", "relationship", "date_of_birth") VALUES ('6a9123c8ecb906bdcf605592', '2026-08-28T05:59:36.468000', '2026-08-28T05:59:36.468000', NULL, 'employee@demo.com', '6a9121a143ae589d52872b21', 'Rahul Ali', 'spouse', '1995-02-10');

-- ------------------------------------------------------------
-- Entity: PayrollAdjustment  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "PayrollAdjustment";
CREATE TABLE "PayrollAdjustment" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "payroll_run_id" TEXT,
  "employee_email" TEXT,
  "employee_id" TEXT,
  "type" TEXT,
  "component" TEXT,
  "amount" NUMERIC,
  "reason" TEXT,
  "approved_by" TEXT,
  "status" TEXT
);

INSERT INTO "PayrollAdjustment" ("id", "created_date", "updated_date", "created_by", "payroll_run_id", "employee_email", "employee_id", "type", "component", "amount", "reason", "approved_by", "status") VALUES ('6a93cbaf56ac740ab4bd18f0', '2026-08-30T06:20:31.080000', '2026-08-30T06:20:31.080000', NULL, '6a9123c5c566ce538dbcdff8', 'employee@demo.com', '6a9121a143ae589d52872b21', 'correction', 'Special Allowance', 2000.0, 'Missed component in Aug run', NULL, 'pending');

-- ------------------------------------------------------------
-- Entity: Goal  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Goal";
CREATE TABLE "Goal" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "employee_email" TEXT,
  "employee_id" TEXT,
  "title" TEXT,
  "kpi_target" TEXT,
  "weight" NUMERIC,
  "progress" NUMERIC,
  "review_cycle_id" TEXT,
  "status" TEXT
);

INSERT INTO "Goal" ("id", "created_date", "updated_date", "created_by", "employee_email", "employee_id", "title", "kpi_target", "weight", "progress", "review_cycle_id", "status") VALUES ('6a9123ca32e20520db3caa32', '2026-08-28T05:59:38.498000', '2026-08-28T05:59:38.498000', NULL, 'employee@demo.com', '6a9121a143ae589d52872b21', 'Deliver 3 major features', '3 features', 60.0, 70.0, '6a9123cad73a8edb7f5119db', 'in_progress');

-- ------------------------------------------------------------
-- Entity: OnboardingTemplate  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "OnboardingTemplate";
CREATE TABLE "OnboardingTemplate" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "name" TEXT,
  "checklist" TEXT,
  "status" TEXT
);

INSERT INTO "OnboardingTemplate" ("id", "created_date", "updated_date", "created_by", "name", "checklist", "status") VALUES ('6a9123cc538f9edb2fa8af17', '2026-08-28T05:59:40.448000', '2026-08-28T05:59:40.448000', NULL, 'Standard Onboarding', '[{"title":"Document collection","mandatory":true},{"title":"IT setup"},{"title":"Induction"}]', 'active');

-- ------------------------------------------------------------
-- Entity: LoginLog  (3 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "LoginLog";
CREATE TABLE "LoginLog" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "user_email" TEXT,
  "ip_address" TEXT,
  "user_agent" TEXT,
  "status" TEXT
);

INSERT INTO "LoginLog" ("id", "created_date", "updated_date", "created_by", "user_email", "ip_address", "user_agent", "status") VALUES ('6a9121a1e8b90b12bed612b5', '2026-08-28T05:50:25.529000', '2026-08-28T05:50:25.529000', NULL, 'admin@demo.com', '203.0.113.10', 'Chrome 124 / macOS', 'success');
INSERT INTO "LoginLog" ("id", "created_date", "updated_date", "created_by", "user_email", "ip_address", "user_agent", "status") VALUES ('6a9121a1e8b90b12bed612b6', '2026-08-28T05:50:25.529000', '2026-08-28T05:50:25.529000', NULL, 'manager@demo.com', '203.0.113.20', 'Firefox 120 / Windows', 'success');
INSERT INTO "LoginLog" ("id", "created_date", "updated_date", "created_by", "user_email", "ip_address", "user_agent", "status") VALUES ('6a9121a1e8b90b12bed612b7', '2026-08-28T05:50:25.529000', '2026-08-28T05:50:25.529000', NULL, 'unknown@demo.com', '198.51.100.5', 'Chrome 124 / Android', 'failed');

-- ------------------------------------------------------------
-- Entity: Client  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Client";
CREATE TABLE "Client" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "name" TEXT,
  "contact_person" TEXT,
  "email" TEXT,
  "phone" TEXT,
  "industry" TEXT,
  "status" TEXT
);

INSERT INTO "Client" ("id", "created_date", "updated_date", "created_by", "name", "contact_person", "email", "phone", "industry", "status") VALUES ('6a9123c825f0c812ccfc5d26', '2026-08-28T05:59:36.772000', '2026-08-28T05:59:36.772000', NULL, 'Acme Corp', 'John Doe', 'john@acme.com', NULL, 'Retail', 'active');

-- ------------------------------------------------------------
-- Entity: Course  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Course";
CREATE TABLE "Course" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "title" TEXT,
  "category_id" TEXT,
  "provider_id" TEXT,
  "duration_hours" NUMERIC,
  "description" TEXT,
  "status" TEXT
);

INSERT INTO "Course" ("id", "created_date", "updated_date", "created_by", "title", "category_id", "provider_id", "duration_hours", "description", "status") VALUES ('6a9123cbc9c283a41be9676a', '2026-08-28T05:59:39.126000', '2026-08-28T05:59:39.126000', NULL, 'Advanced React', '6a9123ca2375924dc23b23b5', '6a9123ca1f1dc870446d254c', 12.0, NULL, 'active');

-- ------------------------------------------------------------
-- Entity: Announcement  (2 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Announcement";
CREATE TABLE "Announcement" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "title" TEXT,
  "body" TEXT,
  "audience" TEXT,
  "branch_id" TEXT,
  "department_id" TEXT,
  "author_email" TEXT,
  "status" TEXT,
  "published_at" TEXT,
  "expires_at" TEXT,
  "read_count" NUMERIC
);

INSERT INTO "Announcement" ("id", "created_date", "updated_date", "created_by", "title", "body", "audience", "branch_id", "department_id", "author_email", "status", "published_at", "expires_at", "read_count") VALUES ('6a93cbaf14347420cd7a7f8e', '2026-08-30T06:20:31.349000', '2026-08-30T06:20:31.349000', NULL, 'New Leave Policy Effective Sep 2026', 'The updated leave policy enabling carry-forward of up to 5 annual leave days is effective from 1 Sep 2026.', 'all', NULL, NULL, 'manager@demo.com', 'published', '2026-08-30T06:20:31.263Z', NULL, 12.0);
INSERT INTO "Announcement" ("id", "created_date", "updated_date", "created_by", "title", "body", "audience", "branch_id", "department_id", "author_email", "status", "published_at", "expires_at", "read_count") VALUES ('6a93cbaf2052b92c40929e4f', '2026-08-30T06:20:31.468000', '2026-08-30T06:20:31.468000', NULL, 'Diwali Bonus', 'Diwali bonus will be credited with the September payroll.', 'all', NULL, NULL, 'manager@demo.com', 'scheduled', '2026-09-25T09:00:00Z', NULL, 0);

-- ------------------------------------------------------------
-- Entity: LetterRequest  (0 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "LetterRequest";
CREATE TABLE "LetterRequest" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "template_id" TEXT,
  "employee_email" TEXT,
  "employee_id" TEXT,
  "generated_body" TEXT,
  "requested_by" TEXT,
  "status" TEXT
);


-- ------------------------------------------------------------
-- Entity: CalendarEvent  (2 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "CalendarEvent";
CREATE TABLE "CalendarEvent" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "title" TEXT,
  "date" TEXT,
  "type" TEXT,
  "employee_email" TEXT,
  "employee_id" TEXT,
  "branch_id" TEXT,
  "department_id" TEXT,
  "source_entity" TEXT,
  "source_id" TEXT,
  "description" TEXT
);

INSERT INTO "CalendarEvent" ("id", "created_date", "updated_date", "created_by", "title", "date", "type", "employee_email", "employee_id", "branch_id", "department_id", "source_entity", "source_id", "description") VALUES ('6a93cbaffac236bb27f386ab', '2026-08-30T06:20:31.220000', '2026-08-30T06:20:31.220000', NULL, 'Annual Day', '2026-09-15', 'company_event', NULL, NULL, NULL, NULL, NULL, NULL, 'WorkNest Annual Day celebration');
INSERT INTO "CalendarEvent" ("id", "created_date", "updated_date", "created_by", "title", "date", "type", "employee_email", "employee_id", "branch_id", "department_id", "source_entity", "source_id", "description") VALUES ('6a93cbaffac236bb27f386ac', '2026-08-30T06:20:31.220000', '2026-08-30T06:20:31.220000', NULL, 'Town Hall', '2026-09-20', 'company_event', NULL, NULL, NULL, NULL, NULL, NULL, 'Quarterly town hall');

-- ------------------------------------------------------------
-- Entity: LeaveRequest  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "LeaveRequest";
CREATE TABLE "LeaveRequest" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "employee_email" TEXT,
  "employee_id" TEXT,
  "leave_type_id" TEXT,
  "from_date" TEXT,
  "to_date" TEXT,
  "days" NUMERIC,
  "reason" TEXT,
  "approver_id" TEXT,
  "status" TEXT
);

INSERT INTO "LeaveRequest" ("id", "created_date", "updated_date", "created_by", "employee_email", "employee_id", "leave_type_id", "from_date", "to_date", "days", "reason", "approver_id", "status") VALUES ('6a9123c3862367def2c5e80b', '2026-08-28T05:59:31.777000', '2026-08-28T05:59:31.777000', NULL, 'employee@demo.com', '6a9121a143ae589d52872b21', '6a9123c3fd5111be87ebe5ab', '2026-09-10', '2026-09-12', 3.0, 'Family vacation', NULL, 'pending');

-- ------------------------------------------------------------
-- Entity: TrainingCategory  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "TrainingCategory";
CREATE TABLE "TrainingCategory" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "name" TEXT,
  "description" TEXT,
  "status" TEXT
);

INSERT INTO "TrainingCategory" ("id", "created_date", "updated_date", "created_by", "name", "description", "status") VALUES ('6a9123ca2375924dc23b23b5', '2026-08-28T05:59:38.852000', '2026-08-28T05:59:38.852000', NULL, 'Technical', NULL, 'active');

-- ------------------------------------------------------------
-- Entity: Meeting  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Meeting";
CREATE TABLE "Meeting" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "title" TEXT,
  "organizer_email" TEXT,
  "start_time" TEXT,
  "end_time" TEXT,
  "location" TEXT,
  "participants" TEXT,
  "agenda" TEXT,
  "minutes" TEXT,
  "status" TEXT
);

INSERT INTO "Meeting" ("id", "created_date", "updated_date", "created_by", "title", "organizer_email", "start_time", "end_time", "location", "participants", "agenda", "minutes", "status") VALUES ('6a93cbb0eb44deef1f5d2521', '2026-08-30T06:20:32.872000', '2026-08-30T06:20:32.872000', NULL, 'Q3 Sprint Review', 'manager@demo.com', '2026-09-05T10:00:00Z', '2026-09-05T11:00:00Z', 'Conference Room A', '["employee@demo.com","manager@demo.com"]', 'Review sprint deliverables and blockers', NULL, 'scheduled');

-- ------------------------------------------------------------
-- Entity: TaxDeclaration  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "TaxDeclaration";
CREATE TABLE "TaxDeclaration" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "employee_email" TEXT,
  "employee_id" TEXT,
  "financial_year" TEXT,
  "regime" TEXT,
  "investment_80c" NUMERIC,
  "health_insurance_80d" NUMERIC,
  "hra_exemption" NUMERIC,
  "other_deductions" NUMERIC,
  "total_deductions" NUMERIC,
  "status" TEXT
);

INSERT INTO "TaxDeclaration" ("id", "created_date", "updated_date", "created_by", "employee_email", "employee_id", "financial_year", "regime", "investment_80c", "health_insurance_80d", "hra_exemption", "other_deductions", "total_deductions", "status") VALUES ('6a93cbae581dfcbaef20d54d', '2026-08-30T06:20:30.834000', '2026-08-30T06:20:30.834000', NULL, 'employee@demo.com', '6a9121a143ae589d52872b21', '2026-27', 'new', 100000.0, 25000.0, 60000.0, 0.0, 185000.0, 'submitted');

-- ------------------------------------------------------------
-- Entity: JobPost  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "JobPost";
CREATE TABLE "JobPost" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "requisition_id" TEXT,
  "title" TEXT,
  "description" TEXT,
  "location" TEXT,
  "employment_type" TEXT,
  "published_date" TEXT,
  "status" TEXT
);

INSERT INTO "JobPost" ("id", "created_date", "updated_date", "created_by", "requisition_id", "title", "description", "location", "employment_type", "published_date", "status") VALUES ('6a9123c92cbd45732775f8d8', '2026-08-28T05:59:37.731000', '2026-08-28T05:59:37.731000', NULL, '6a9123c9be4a6e236bab3eb3', 'Senior Software Engineer', 'Node/React backend', 'Mumbai', 'Full-time', '2026-08-01', 'published');

-- ------------------------------------------------------------
-- Entity: BenefitClaim  (0 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "BenefitClaim";
CREATE TABLE "BenefitClaim" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "employee_email" TEXT,
  "employee_id" TEXT,
  "benefit_plan_id" TEXT,
  "amount" NUMERIC,
  "claim_date" TEXT,
  "status" TEXT
);


-- ------------------------------------------------------------
-- Entity: PIP  (0 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "PIP";
CREATE TABLE "PIP" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "employee_email" TEXT,
  "employee_id" TEXT,
  "start_date" TEXT,
  "end_date" TEXT,
  "milestones" TEXT,
  "status" TEXT
);


-- ------------------------------------------------------------
-- Entity: Notification  (3 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Notification";
CREATE TABLE "Notification" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "user_email" TEXT,
  "title" TEXT,
  "body" TEXT,
  "type" TEXT,
  "read" BOOLEAN,
  "link" TEXT
);

INSERT INTO "Notification" ("id", "created_date", "updated_date", "created_by", "user_email", "title", "body", "type", "read", "link") VALUES ('6a9123cc13e04d8cee96b44c', '2026-08-28T05:59:40.733000', '2026-08-28T05:59:40.733000', NULL, 'employee@demo.com', 'Leave request submitted', 'Your Annual Leave request is pending approval.', 'leave', FALSE, NULL);
INSERT INTO "Notification" ("id", "created_date", "updated_date", "created_by", "user_email", "title", "body", "type", "read", "link") VALUES ('6a9123cc13e04d8cee96b44d', '2026-08-28T05:59:40.733000', '2026-08-28T05:59:40.733000', NULL, 'employee@demo.com', 'Payslip available', 'Your August 2026 payslip is now available.', 'payroll', FALSE, NULL);
INSERT INTO "Notification" ("id", "created_date", "updated_date", "created_by", "user_email", "title", "body", "type", "read", "link") VALUES ('6a9123cc13e04d8cee96b44e', '2026-08-28T05:59:40.733000', '2026-08-28T05:59:40.733000', NULL, 'manager@demo.com', 'Leave approval pending', 'Zara Ali submitted a leave request for your approval.', 'leave', FALSE, NULL);

-- ------------------------------------------------------------
-- Entity: Team  (8 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Team";
CREATE TABLE "Team" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "department_id" TEXT,
  "name" TEXT,
  "code" TEXT,
  "team_lead_id" TEXT,
  "status" TEXT
);

INSERT INTO "Team" ("id", "created_date", "updated_date", "created_by", "department_id", "name", "code", "team_lead_id", "status") VALUES ('6a9121a1a5a42c79a3ff82cf', '2026-08-28T05:50:25.050000', '2026-08-28T05:50:25.050000', NULL, '6a9121a0f233ffb9844e4e93', 'Backend', 'BE', '6a9121a0a049227f284f22cb', 'active');
INSERT INTO "Team" ("id", "created_date", "updated_date", "created_by", "department_id", "name", "code", "team_lead_id", "status") VALUES ('6a9121a1a5a42c79a3ff82d0', '2026-08-28T05:50:25.051000', '2026-08-28T05:50:25.051000', NULL, '6a9121a0f233ffb9844e4e93', 'Frontend', 'FE', '6a9121a0a049227f284f22cb', 'active');
INSERT INTO "Team" ("id", "created_date", "updated_date", "created_by", "department_id", "name", "code", "team_lead_id", "status") VALUES ('6a9121a1a5a42c79a3ff82d1', '2026-08-28T05:50:25.051000', '2026-08-28T05:50:25.051000', NULL, '6a9121a0f233ffb9844e4e93', 'DevOps', 'DEVOPS', '6a9121a0a049227f284f22cb', 'active');
INSERT INTO "Team" ("id", "created_date", "updated_date", "created_by", "department_id", "name", "code", "team_lead_id", "status") VALUES ('6a9121a1a5a42c79a3ff82d2', '2026-08-28T05:50:25.051000', '2026-08-28T05:50:25.051000', NULL, '6a9121a0f233ffb9844e4e94', 'Product Design', 'PD', NULL, 'active');
INSERT INTO "Team" ("id", "created_date", "updated_date", "created_by", "department_id", "name", "code", "team_lead_id", "status") VALUES ('6a9121a1a5a42c79a3ff82d3', '2026-08-28T05:50:25.051000', '2026-08-28T05:50:25.051000', NULL, '6a9121a0f233ffb9844e4e95', 'Talent Acquisition', 'TA', '6a9121a0a049227f284f22cd', 'active');
INSERT INTO "Team" ("id", "created_date", "updated_date", "created_by", "department_id", "name", "code", "team_lead_id", "status") VALUES ('6a9121a1a5a42c79a3ff82d4', '2026-08-28T05:50:25.051000', '2026-08-28T05:50:25.051000', NULL, '6a9121a0f233ffb9844e4e96', 'Field Sales', 'FS', '6a9121a0a049227f284f22cc', 'active');
INSERT INTO "Team" ("id", "created_date", "updated_date", "created_by", "department_id", "name", "code", "team_lead_id", "status") VALUES ('6a9121a1a5a42c79a3ff82d5', '2026-08-28T05:50:25.051000', '2026-08-28T05:50:25.051000', NULL, '6a9121a0f233ffb9844e4e97', 'Facilities', 'FAC', NULL, 'active');
INSERT INTO "Team" ("id", "created_date", "updated_date", "created_by", "department_id", "name", "code", "team_lead_id", "status") VALUES ('6a9121a1a5a42c79a3ff82d6', '2026-08-28T05:50:25.051000', '2026-08-28T05:50:25.051000', NULL, '6a9121a0f233ffb9844e4e97', 'Procurement', 'PROC', NULL, 'active');

-- ------------------------------------------------------------
-- Entity: HelpdeskTicket  (2 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "HelpdeskTicket";
CREATE TABLE "HelpdeskTicket" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "requester_email" TEXT,
  "subject" TEXT,
  "description" TEXT,
  "category_id" TEXT,
  "priority" TEXT,
  "status" TEXT,
  "assigned_to" TEXT,
  "sla_due" TEXT,
  "escalated" BOOLEAN,
  "attachment_url" TEXT
);

INSERT INTO "HelpdeskTicket" ("id", "created_date", "updated_date", "created_by", "requester_email", "subject", "description", "category_id", "priority", "status", "assigned_to", "sla_due", "escalated", "attachment_url") VALUES ('6a93cbb168a98bc229d1b33c', '2026-08-30T06:20:33.551000', '2026-08-30T06:20:33.551000', NULL, 'employee@demo.com', 'Laptop charger not working', 'My charger stopped working this morning.', '6a93cbb11aa7904cdf9f1df1', 'high', 'assigned', 'admin@demo.com', '2026-08-31T18:00:00Z', FALSE, NULL);
INSERT INTO "HelpdeskTicket" ("id", "created_date", "updated_date", "created_by", "requester_email", "subject", "description", "category_id", "priority", "status", "assigned_to", "sla_due", "escalated", "attachment_url") VALUES ('6a93cbb188f0cc0f85cb3dfe', '2026-08-30T06:20:33.965000', '2026-08-30T06:20:33.965000', NULL, 'employee@demo.com', 'Access to HR portal', 'Need access to the performance module.', '6a93cbb11aa7904cdf9f1df1', 'medium', 'open', NULL, NULL, FALSE, NULL);

-- ------------------------------------------------------------
-- Entity: ExpenseClaim  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "ExpenseClaim";
CREATE TABLE "ExpenseClaim" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "employee_email" TEXT,
  "employee_id" TEXT,
  "category_id" TEXT,
  "title" TEXT,
  "total_amount" NUMERIC,
  "items" TEXT,
  "submitted_date" TEXT,
  "status" TEXT
);

INSERT INTO "ExpenseClaim" ("id", "created_date", "updated_date", "created_by", "employee_email", "employee_id", "category_id", "title", "total_amount", "items", "submitted_date", "status") VALUES ('6a9123c6ccd16c60c40047db', '2026-08-28T05:59:34.106000', '2026-08-28T05:59:34.106000', NULL, 'employee@demo.com', '6a9121a143ae589d52872b21', '6a9123c5f15f0d431eebdcf5', 'Client visit travel', 2500.0, '[{"date":"2026-08-15","description":"Taxi","amount":2500}]', '2026-08-18', 'submitted');

-- ------------------------------------------------------------
-- Entity: Poll  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Poll";
CREATE TABLE "Poll" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "question" TEXT,
  "options" TEXT,
  "status" TEXT
);

INSERT INTO "Poll" ("id", "created_date", "updated_date", "created_by", "question", "options", "status") VALUES ('6a93cbb003b0358f763af5d4', '2026-08-30T06:20:32.274000', '2026-08-30T06:20:32.274000', 'manager@demo.com', 'Which team event do you prefer for the offsite?', '["Trekking","Beach Resort","City Tour"]', 'active');

-- ------------------------------------------------------------
-- Entity: Vendor  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Vendor";
CREATE TABLE "Vendor" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "name" TEXT,
  "contact_person" TEXT,
  "email" TEXT,
  "phone" TEXT,
  "status" TEXT
);

INSERT INTO "Vendor" ("id", "created_date", "updated_date", "created_by", "name", "contact_person", "email", "phone", "status") VALUES ('6a9123cb1162736294376e65', '2026-08-28T05:59:39.862000', '2026-08-28T05:59:39.862000', NULL, 'Dell', 'Dell Sales', 'sales@dell.com', NULL, 'active');

-- ------------------------------------------------------------
-- Entity: AuditLog  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "AuditLog";
CREATE TABLE "AuditLog" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "user_email" TEXT,
  "module" TEXT,
  "action" TEXT,
  "entity" TEXT,
  "entity_id" TEXT,
  "old_value" TEXT,
  "new_value" TEXT,
  "ip_address" TEXT,
  "user_agent" TEXT
);

INSERT INTO "AuditLog" ("id", "created_date", "updated_date", "created_by", "user_email", "module", "action", "entity", "entity_id", "old_value", "new_value", "ip_address", "user_agent") VALUES ('6a9121a203a70bf786e2b1d2', '2026-08-28T05:50:26.933000', '2026-08-28T05:50:26.933000', NULL, 'admin@demo.com', 'Employee', 'update', 'Employee', '6a9121a0a049227f284f22cb', '{"manager_id": null}', '{"manager_id": "6a9121a0a049227f284f22ca"}', NULL, NULL);

-- ------------------------------------------------------------
-- Entity: Company  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Company";
CREATE TABLE "Company" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "company_name" TEXT,
  "legal_name" TEXT,
  "registration_number" TEXT,
  "tax_identifier" TEXT,
  "email" TEXT,
  "phone" TEXT,
  "website" TEXT,
  "address" TEXT,
  "city" TEXT,
  "state" TEXT,
  "country" TEXT,
  "postal_code" TEXT,
  "timezone" TEXT,
  "currency" TEXT,
  "status" TEXT,
  "logo" TEXT
);

INSERT INTO "Company" ("id", "created_date", "updated_date", "created_by", "company_name", "legal_name", "registration_number", "tax_identifier", "email", "phone", "website", "address", "city", "state", "country", "postal_code", "timezone", "currency", "status", "logo") VALUES ('6a91219fa66d9f7294906f6b', '2026-08-28T05:50:23.674000', '2026-08-28T05:50:23.674000', NULL, 'WorkNest Technologies', 'WorkNest Technologies Pvt Ltd', 'WN-REG-2026', 'GST29ABCDE1234F1Z5', 'info@worknest.com', '+91 22 4000 1000', 'https://worknest.com', 'Plot 14, IT Park, Andheri East', 'Mumbai', 'Maharashtra', 'India', '400069', 'Asia/Kolkata', 'INR', 'active', NULL);

-- ------------------------------------------------------------
-- Entity: ReviewCycle  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "ReviewCycle";
CREATE TABLE "ReviewCycle" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "name" TEXT,
  "start_date" TEXT,
  "end_date" TEXT,
  "status" TEXT
);

INSERT INTO "ReviewCycle" ("id", "created_date", "updated_date", "created_by", "name", "start_date", "end_date", "status") VALUES ('6a9123cad73a8edb7f5119db', '2026-08-28T05:59:38.362000', '2026-08-28T05:59:38.362000', NULL, 'H1 2026', '2026-01-01', '2026-06-30', 'active');

-- ------------------------------------------------------------
-- Entity: HelpdeskComment  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "HelpdeskComment";
CREATE TABLE "HelpdeskComment" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "ticket_id" TEXT,
  "author_email" TEXT,
  "comment" TEXT,
  "is_internal" BOOLEAN
);

INSERT INTO "HelpdeskComment" ("id", "created_date", "updated_date", "created_by", "ticket_id", "author_email", "comment", "is_internal") VALUES ('6a93cbb163f6d5228e263eb1', '2026-08-30T06:20:33.785000', '2026-08-30T06:20:33.785000', NULL, '6a93cbb168a98bc229d1b33c', 'admin@demo.com', 'Replacement charger dispatched, will be delivered tomorrow.', FALSE);

-- ------------------------------------------------------------
-- Entity: SalaryComponent  (5 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "SalaryComponent";
CREATE TABLE "SalaryComponent" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "name" TEXT,
  "code" TEXT,
  "type" TEXT,
  "calculation_type" TEXT,
  "default_value" NUMERIC,
  "status" TEXT
);

INSERT INTO "SalaryComponent" ("id", "created_date", "updated_date", "created_by", "name", "code", "type", "calculation_type", "default_value", "status") VALUES ('6a9123c4608cfd4cac65428e', '2026-08-28T05:59:32.577000', '2026-08-28T05:59:32.577000', NULL, 'Basic', 'BASIC', 'earning', 'percentage', 50.0, 'active');
INSERT INTO "SalaryComponent" ("id", "created_date", "updated_date", "created_by", "name", "code", "type", "calculation_type", "default_value", "status") VALUES ('6a9123c4608cfd4cac65428f', '2026-08-28T05:59:32.577000', '2026-08-28T05:59:32.577000', NULL, 'HRA', 'HRA', 'earning', 'percentage', 20.0, 'active');
INSERT INTO "SalaryComponent" ("id", "created_date", "updated_date", "created_by", "name", "code", "type", "calculation_type", "default_value", "status") VALUES ('6a9123c4608cfd4cac654290', '2026-08-28T05:59:32.577000', '2026-08-28T05:59:32.577000', NULL, 'Special Allowance', 'SA', 'earning', 'fixed', 0.0, 'active');
INSERT INTO "SalaryComponent" ("id", "created_date", "updated_date", "created_by", "name", "code", "type", "calculation_type", "default_value", "status") VALUES ('6a9123c4608cfd4cac654291', '2026-08-28T05:59:32.577000', '2026-08-28T05:59:32.577000', NULL, 'Provident Fund', 'PF', 'deduction', 'percentage', 12.0, 'active');
INSERT INTO "SalaryComponent" ("id", "created_date", "updated_date", "created_by", "name", "code", "type", "calculation_type", "default_value", "status") VALUES ('6a9123c4608cfd4cac654292', '2026-08-28T05:59:32.577000', '2026-08-28T05:59:32.577000', NULL, 'Professional Tax', 'PT', 'deduction', 'fixed', 200.0, 'active');

-- ------------------------------------------------------------
-- Entity: OffboardingRequest  (0 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "OffboardingRequest";
CREATE TABLE "OffboardingRequest" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "employee_email" TEXT,
  "employee_id" TEXT,
  "resignation_date" TEXT,
  "notice_end_date" TEXT,
  "last_working_day" TEXT,
  "exit_interview" TEXT,
  "status" TEXT
);


-- ------------------------------------------------------------
-- Entity: EmployeeLifecycleHistory  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "EmployeeLifecycleHistory";
CREATE TABLE "EmployeeLifecycleHistory" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "employee_id" TEXT,
  "employee_email" TEXT,
  "event" TEXT,
  "from_status" TEXT,
  "to_status" TEXT,
  "effective_date" TEXT,
  "notes" TEXT
);

INSERT INTO "EmployeeLifecycleHistory" ("id", "created_date", "updated_date", "created_by", "employee_id", "employee_email", "event", "from_status", "to_status", "effective_date", "notes") VALUES ('6a9123cde29acdf31079e2f0', '2026-08-28T05:59:41.150000', '2026-08-28T05:59:41.150000', NULL, '6a9121a143ae589d52872b21', 'employee@demo.com', 'Hired', NULL, 'Active', '2022-03-15', 'Joined as Software Engineer');

-- ------------------------------------------------------------
-- Entity: Payslip  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Payslip";
CREATE TABLE "Payslip" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "payroll_run_id" TEXT,
  "payroll_period_id" TEXT,
  "employee_email" TEXT,
  "employee_id" TEXT,
  "earnings" TEXT,
  "deductions" TEXT,
  "net_pay" NUMERIC,
  "snapshot" TEXT
);

INSERT INTO "Payslip" ("id", "created_date", "updated_date", "created_by", "payroll_run_id", "payroll_period_id", "employee_email", "employee_id", "earnings", "deductions", "net_pay", "snapshot") VALUES ('6a9123c5cd1d4fd8ce274c62', '2026-08-28T05:59:33.398000', '2026-08-28T05:59:33.398000', NULL, '6a9123c5c566ce538dbcdff8', '6a9123c524b97aca99a43184', 'employee@demo.com', '6a9121a143ae589d52872b21', '[{"Basic":30000},{"HRA":10000},{"SA":10000}]', '[{"PF":3600},{"PT":200},{"TDS":2400}]', 41800.0, '{"ctc":600000,"period":"August 2026"}');

-- ------------------------------------------------------------
-- Entity: Suggestion  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Suggestion";
CREATE TABLE "Suggestion" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "employee_email" TEXT,
  "category" TEXT,
  "message" TEXT,
  "anonymous" BOOLEAN,
  "status" TEXT,
  "response" TEXT
);

INSERT INTO "Suggestion" ("id", "created_date", "updated_date", "created_by", "employee_email", "category", "message", "anonymous", "status", "response") VALUES ('6a93cbb01a40af90779bde0a', '2026-08-30T06:20:32.144000', '2026-08-30T06:20:32.144000', NULL, 'employee@demo.com', 'Facilities', 'Add a dedicated quiet zone for focused work.', FALSE, 'under_review', NULL);

-- ------------------------------------------------------------
-- Entity: NotificationPreference  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "NotificationPreference";
CREATE TABLE "NotificationPreference" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "user_email" TEXT,
  "in_app_enabled" BOOLEAN,
  "email_enabled" BOOLEAN,
  "sms_enabled" BOOLEAN,
  "push_enabled" BOOLEAN,
  "categories" TEXT
);

INSERT INTO "NotificationPreference" ("id", "created_date", "updated_date", "created_by", "user_email", "in_app_enabled", "email_enabled", "sms_enabled", "push_enabled", "categories") VALUES ('6a93cbb2c96835eb2db13c3e', '2026-08-30T06:20:34.444000', '2026-08-30T06:20:34.444000', NULL, 'employee@demo.com', TRUE, TRUE, FALSE, FALSE, NULL);

-- ------------------------------------------------------------
-- Entity: AttendanceCorrection  (0 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "AttendanceCorrection";
CREATE TABLE "AttendanceCorrection" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "employee_email" TEXT,
  "attendance_id" TEXT,
  "requested_check_in" TEXT,
  "requested_check_out" TEXT,
  "reason" TEXT,
  "status" TEXT
);


-- ------------------------------------------------------------
-- Entity: Department  (5 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Department";
CREATE TABLE "Department" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "branch_id" TEXT,
  "name" TEXT,
  "code" TEXT,
  "head_employee_id" TEXT,
  "status" TEXT
);

INSERT INTO "Department" ("id", "created_date", "updated_date", "created_by", "branch_id", "name", "code", "head_employee_id", "status") VALUES ('6a9121a0f233ffb9844e4e93', '2026-08-28T05:50:24.032000', '2026-08-28T05:50:24.032000', NULL, '6a91219f428f44a0610a5677', 'Engineering', 'ENG', NULL, 'active');
INSERT INTO "Department" ("id", "created_date", "updated_date", "created_by", "branch_id", "name", "code", "head_employee_id", "status") VALUES ('6a9121a0f233ffb9844e4e94', '2026-08-28T05:50:24.032000', '2026-08-28T05:50:24.032000', NULL, '6a91219f428f44a0610a5677', 'Product', 'PRD', NULL, 'active');
INSERT INTO "Department" ("id", "created_date", "updated_date", "created_by", "branch_id", "name", "code", "head_employee_id", "status") VALUES ('6a9121a0f233ffb9844e4e95', '2026-08-28T05:50:24.032000', '2026-08-28T05:50:24.032000', NULL, '6a91219f428f44a0610a5677', 'Human Resources', 'HR', NULL, 'active');
INSERT INTO "Department" ("id", "created_date", "updated_date", "created_by", "branch_id", "name", "code", "head_employee_id", "status") VALUES ('6a9121a0f233ffb9844e4e96', '2026-08-28T05:50:24.032000', '2026-08-28T05:50:24.032000', NULL, '6a91219f428f44a0610a5678', 'Sales', 'SAL', NULL, 'active');
INSERT INTO "Department" ("id", "created_date", "updated_date", "created_by", "branch_id", "name", "code", "head_employee_id", "status") VALUES ('6a9121a0f233ffb9844e4e97', '2026-08-28T05:50:24.032000', '2026-08-28T05:50:24.032000', NULL, '6a91219f428f44a0610a5679', 'Operations', 'OPS', NULL, 'active');

-- ------------------------------------------------------------
-- Entity: TrainingRequest  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "TrainingRequest";
CREATE TABLE "TrainingRequest" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "employee_email" TEXT,
  "employee_id" TEXT,
  "course_id" TEXT,
  "request_date" TEXT,
  "status" TEXT
);

INSERT INTO "TrainingRequest" ("id", "created_date", "updated_date", "created_by", "employee_email", "employee_id", "course_id", "request_date", "status") VALUES ('6a9123cb52e712898caf1159', '2026-08-28T05:59:39.422000', '2026-08-28T05:59:39.422000', NULL, 'employee@demo.com', '6a9121a143ae589d52872b21', '6a9123cbc9c283a41be9676a', '2026-08-20', 'pending');

-- ------------------------------------------------------------
-- Entity: EmployeePayrollProfile  (3 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "EmployeePayrollProfile";
CREATE TABLE "EmployeePayrollProfile" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "employee_email" TEXT,
  "employee_id" TEXT,
  "salary_structure_id" TEXT,
  "ctc" NUMERIC,
  "basic" NUMERIC,
  "components" TEXT,
  "effective_date" TEXT
);

INSERT INTO "EmployeePayrollProfile" ("id", "created_date", "updated_date", "created_by", "employee_email", "employee_id", "salary_structure_id", "ctc", "basic", "components", "effective_date") VALUES ('6a9123c4a43484cb0d1f26a3', '2026-08-28T05:59:32.880000', '2026-08-28T05:59:32.880000', NULL, 'employee@demo.com', '6a9121a143ae589d52872b21', '6a9123c412daf92eb0a94e72', 600000.0, 30000.0, NULL, '2026-04-01');
INSERT INTO "EmployeePayrollProfile" ("id", "created_date", "updated_date", "created_by", "employee_email", "employee_id", "salary_structure_id", "ctc", "basic", "components", "effective_date") VALUES ('6a9123c4a43484cb0d1f26a4', '2026-08-28T05:59:32.880000', '2026-08-28T05:59:32.880000', NULL, 'manager@demo.com', '6a9121a0a049227f284f22cb', '6a9123c412daf92eb0a94e72', 1800000.0, 90000.0, NULL, '2026-04-01');
INSERT INTO "EmployeePayrollProfile" ("id", "created_date", "updated_date", "created_by", "employee_email", "employee_id", "salary_structure_id", "ctc", "basic", "components", "effective_date") VALUES ('6a9550111adc1079d92a8915', '2026-08-31T09:57:37.635000', '2026-08-31T11:47:55.688000', NULL, 'meera@worknest.com', '6a9121a143ae589d52872b19', '6a9568461fdb688ba16d4281', 29660.0, 12000.0, '{"earnings":[{"name":"Basic","amount":12000},{"name":"HRA","amount":6000},{"name":"Medical Allowance","amount":1440},{"name":"Conveyance","amount":1800},{"name":"Washing Allowance","amount":1200},{"name":"Special Allowance","amount":4160},{"name":"Previous Adjustments","amount":0},{"name":"Add: Variable Pay","amount":0}],"deductions":[{"name":"PF","amount":1440},{"name":"ESI","amount":0},{"name":"Professional Tax","amount":200},{"name":"Mediclaim","amount":0},{"name":"TDS","amount":0},{"name":"Advance","amount":0},{"name":"Less: Variable Pay","amount":0}],"employer_pf":1560,"employer_esi":1500}', '2026-08-15');

-- ------------------------------------------------------------
-- Entity: Holiday  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Holiday";
CREATE TABLE "Holiday" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "branch_id" TEXT,
  "name" TEXT,
  "date" TEXT,
  "type" TEXT
);

INSERT INTO "Holiday" ("id", "created_date", "updated_date", "created_by", "branch_id", "name", "date", "type") VALUES ('6a9123c496347c5e7c824a14', '2026-08-28T05:59:32.233000', '2026-08-28T05:59:32.233000', NULL, '6a91219f428f44a0610a5677', 'Independence Day', '2026-08-15', 'national');

-- ------------------------------------------------------------
-- Entity: LeaveType  (4 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "LeaveType";
CREATE TABLE "LeaveType" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "name" TEXT,
  "code" TEXT,
  "is_paid" BOOLEAN,
  "carry_forward" BOOLEAN,
  "default_balance" NUMERIC,
  "status" TEXT
);

INSERT INTO "LeaveType" ("id", "created_date", "updated_date", "created_by", "name", "code", "is_paid", "carry_forward", "default_balance", "status") VALUES ('6a9123c3fd5111be87ebe5ab', '2026-08-28T05:59:31.451000', '2026-08-28T05:59:31.451000', NULL, 'Annual Leave', 'AL', TRUE, TRUE, 20.0, 'active');
INSERT INTO "LeaveType" ("id", "created_date", "updated_date", "created_by", "name", "code", "is_paid", "carry_forward", "default_balance", "status") VALUES ('6a9123c3fd5111be87ebe5ac', '2026-08-28T05:59:31.451000', '2026-08-28T05:59:31.451000', NULL, 'Casual Leave', 'CL', TRUE, FALSE, 8.0, 'active');
INSERT INTO "LeaveType" ("id", "created_date", "updated_date", "created_by", "name", "code", "is_paid", "carry_forward", "default_balance", "status") VALUES ('6a9123c3fd5111be87ebe5ad', '2026-08-28T05:59:31.451000', '2026-08-28T05:59:31.451000', NULL, 'Sick Leave', 'SL', TRUE, FALSE, 10.0, 'active');
INSERT INTO "LeaveType" ("id", "created_date", "updated_date", "created_by", "name", "code", "is_paid", "carry_forward", "default_balance", "status") VALUES ('6a9123c3fd5111be87ebe5ae', '2026-08-28T05:59:31.451000', '2026-08-28T05:59:31.451000', NULL, 'Maternity Leave', 'ML', TRUE, FALSE, 84.0, 'active');

-- ------------------------------------------------------------
-- Entity: SalaryAdvance  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "SalaryAdvance";
CREATE TABLE "SalaryAdvance" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "employee_email" TEXT,
  "employee_id" TEXT,
  "amount" NUMERIC,
  "request_date" TEXT,
  "approval_date" TEXT,
  "recovery_start" TEXT,
  "recovered_amount" NUMERIC,
  "status" TEXT
);

INSERT INTO "SalaryAdvance" ("id", "created_date", "updated_date", "created_by", "employee_email", "employee_id", "amount", "request_date", "approval_date", "recovery_start", "recovered_amount", "status") VALUES ('6a9123c52541116ed5b96f0f', '2026-08-28T05:59:33.682000', '2026-08-28T05:59:33.682000', NULL, 'employee@demo.com', '6a9121a143ae589d52872b21', 10000.0, '2026-08-20', '2026-08-22', '2026-09-01', 2000.0, 'approved');

-- ------------------------------------------------------------
-- Entity: TrainingProvider  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "TrainingProvider";
CREATE TABLE "TrainingProvider" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "name" TEXT,
  "contact_person" TEXT,
  "email" TEXT,
  "phone" TEXT,
  "status" TEXT
);

INSERT INTO "TrainingProvider" ("id", "created_date", "updated_date", "created_by", "name", "contact_person", "email", "phone", "status") VALUES ('6a9123ca1f1dc870446d254c', '2026-08-28T05:59:38.977000', '2026-08-28T05:59:38.977000', NULL, 'Udemy', 'Support', 'support@udemy.com', NULL, 'active');

-- ------------------------------------------------------------
-- Entity: ExpenseCategory  (3 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "ExpenseCategory";
CREATE TABLE "ExpenseCategory" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "name" TEXT,
  "description" TEXT,
  "status" TEXT
);

INSERT INTO "ExpenseCategory" ("id", "created_date", "updated_date", "created_by", "name", "description", "status") VALUES ('6a9123c5f15f0d431eebdcf5', '2026-08-28T05:59:33.924000', '2026-08-28T05:59:33.924000', NULL, 'Travel', 'Business travel', 'active');
INSERT INTO "ExpenseCategory" ("id", "created_date", "updated_date", "created_by", "name", "description", "status") VALUES ('6a9123c5f15f0d431eebdcf6', '2026-08-28T05:59:33.924000', '2026-08-28T05:59:33.924000', NULL, 'Food', 'Meals', 'active');
INSERT INTO "ExpenseCategory" ("id", "created_date", "updated_date", "created_by", "name", "description", "status") VALUES ('6a9123c5f15f0d431eebdcf7', '2026-08-28T05:59:33.924000', '2026-08-28T05:59:33.924000', NULL, 'Miscellaneous', NULL, 'active');

-- ------------------------------------------------------------
-- Entity: KnowledgeArticle  (2 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "KnowledgeArticle";
CREATE TABLE "KnowledgeArticle" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "category_id" TEXT,
  "title" TEXT,
  "content" TEXT,
  "author_email" TEXT,
  "tags" TEXT,
  "status" TEXT
);

INSERT INTO "KnowledgeArticle" ("id", "created_date", "updated_date", "created_by", "category_id", "title", "content", "author_email", "tags", "status") VALUES ('6a93cbb087a367a8ac91451b', '2026-08-30T06:20:32.712000', '2026-08-30T06:20:32.712000', NULL, '6a93cbb0086e7edd144936e1', 'How to apply for leave', 'Navigate to Leave > Leave Requests and click Add. Select the leave type and dates, then submit for approval.', 'manager@demo.com', 'leave,holiday', 'published');
INSERT INTO "KnowledgeArticle" ("id", "created_date", "updated_date", "created_by", "category_id", "title", "content", "author_email", "tags", "status") VALUES ('6a93cbb087a367a8ac91451c', '2026-08-30T06:20:32.712000', '2026-08-30T06:20:32.712000', NULL, '6a93cbb0086e7edd144936e1', 'Reimbursement process', 'Submit expense claims under Expenses with receipts. Manager approval is required before reimbursement.', 'manager@demo.com', 'expense,reimbursement', 'published');

-- ------------------------------------------------------------
-- Entity: Application  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Application";
CREATE TABLE "Application" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "job_post_id" TEXT,
  "candidate_id" TEXT,
  "applicant_email" TEXT,
  "applied_date" TEXT,
  "interviews" TEXT,
  "offer" TEXT,
  "status" TEXT
);

INSERT INTO "Application" ("id", "created_date", "updated_date", "created_by", "job_post_id", "candidate_id", "applicant_email", "applied_date", "interviews", "offer", "status") VALUES ('6a9123cad368c21bd20d797f', '2026-08-28T05:59:38.086000', '2026-08-28T05:59:38.086000', NULL, '6a9123c92cbd45732775f8d8', '6a9123c948e4f4c4be9768de', 'aditya@email.com', '2026-08-05', NULL, NULL, 'interview');

-- ------------------------------------------------------------
-- Entity: KnowledgeCategory  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "KnowledgeCategory";
CREATE TABLE "KnowledgeCategory" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "name" TEXT,
  "description" TEXT,
  "status" TEXT
);

INSERT INTO "KnowledgeCategory" ("id", "created_date", "updated_date", "created_by", "name", "description", "status") VALUES ('6a93cbb0086e7edd144936e1', '2026-08-30T06:20:32.552000', '2026-08-30T06:20:32.552000', NULL, 'HR Policies', 'HR how-to and policies', 'active');

-- ------------------------------------------------------------
-- Entity: ProjectMember  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "ProjectMember";
CREATE TABLE "ProjectMember" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "project_id" TEXT,
  "employee_id" TEXT,
  "employee_email" TEXT,
  "role" TEXT,
  "allocation_percent" NUMERIC
);

INSERT INTO "ProjectMember" ("id", "created_date", "updated_date", "created_by", "project_id", "employee_id", "employee_email", "role", "allocation_percent") VALUES ('6a9123c952e712898caf1156', '2026-08-28T05:59:37.381000', '2026-08-28T05:59:37.381000', NULL, '6a9123c97102b87bcf98c1c7', '6a9121a143ae589d52872b21', 'employee@demo.com', 'Developer', 80.0);

-- ------------------------------------------------------------
-- Entity: PayrollPeriod  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "PayrollPeriod";
CREATE TABLE "PayrollPeriod" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "name" TEXT,
  "month" TEXT,
  "year" NUMERIC,
  "start_date" TEXT,
  "end_date" TEXT,
  "status" TEXT
);

INSERT INTO "PayrollPeriod" ("id", "created_date", "updated_date", "created_by", "name", "month", "year", "start_date", "end_date", "status") VALUES ('6a9123c524b97aca99a43184', '2026-08-28T05:59:33.072000', '2026-08-28T05:59:33.072000', NULL, 'August 2026', 'August', 2026.0, '2026-08-01', '2026-08-31', 'published');

-- ------------------------------------------------------------
-- Entity: Candidate  (2 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Candidate";
CREATE TABLE "Candidate" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "name" TEXT,
  "email" TEXT,
  "phone" TEXT,
  "source" TEXT,
  "current_status" TEXT,
  "resume_url" TEXT,
  "notes" TEXT
);

INSERT INTO "Candidate" ("id", "created_date", "updated_date", "created_by", "name", "email", "phone", "source", "current_status", "resume_url", "notes") VALUES ('6a9123c948e4f4c4be9768de', '2026-08-28T05:59:37.943000', '2026-08-28T05:59:37.943000', NULL, 'Aditya Kumar', 'aditya@email.com', '+91 90011 10001', 'Job Portal', 'interview', NULL, NULL);
INSERT INTO "Candidate" ("id", "created_date", "updated_date", "created_by", "name", "email", "phone", "source", "current_status", "resume_url", "notes") VALUES ('6a9123c948e4f4c4be9768df', '2026-08-28T05:59:37.943000', '2026-08-28T05:59:37.943000', NULL, 'Sneha Reddy', 'sneha@email.com', '+91 90011 10002', 'Referral', 'shortlisted', NULL, NULL);

-- ------------------------------------------------------------
-- Entity: PollVote  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "PollVote";
CREATE TABLE "PollVote" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "poll_id" TEXT,
  "employee_email" TEXT,
  "option_index" NUMERIC
);

INSERT INTO "PollVote" ("id", "created_date", "updated_date", "created_by", "poll_id", "employee_email", "option_index") VALUES ('6a93cbb079e79c509e413fd7', '2026-08-30T06:20:32.383000', '2026-08-30T06:20:32.383000', NULL, '6a93cbb003b0358f763af5d4', 'employee@demo.com', 1.0);

-- ------------------------------------------------------------
-- Entity: Shift  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Shift";
CREATE TABLE "Shift" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "branch_id" TEXT,
  "name" TEXT,
  "start_time" TEXT,
  "end_time" TEXT,
  "grace_minutes" NUMERIC,
  "status" TEXT
);

INSERT INTO "Shift" ("id", "created_date", "updated_date", "created_by", "branch_id", "name", "start_time", "end_time", "grace_minutes", "status") VALUES ('6a9123c4b5ec5118eb169d85', '2026-08-28T05:59:32.088000', '2026-08-28T05:59:32.088000', NULL, '6a91219f428f44a0610a5677', 'General', '09:00', '18:00', 15.0, 'active');

-- ------------------------------------------------------------
-- Entity: OnboardingTask  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "OnboardingTask";
CREATE TABLE "OnboardingTask" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "employee_email" TEXT,
  "employee_id" TEXT,
  "template_id" TEXT,
  "title" TEXT,
  "due_date" TEXT,
  "buddy_id" TEXT,
  "status" TEXT
);

INSERT INTO "OnboardingTask" ("id", "created_date", "updated_date", "created_by", "employee_email", "employee_id", "template_id", "title", "due_date", "buddy_id", "status") VALUES ('6a9123cc07e3ec7cb12d5f2b', '2026-08-28T05:59:40.589000', '2026-08-28T05:59:40.589000', NULL, 'employee@demo.com', '6a9121a143ae589d52872b21', '6a9123cc538f9edb2fa8af17', 'Document collection', '2026-09-05', '6a9121a0a049227f284f22cb', 'pending');

-- ------------------------------------------------------------
-- Entity: EmployeeDocument  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "EmployeeDocument";
CREATE TABLE "EmployeeDocument" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "employee_email" TEXT,
  "employee_id" TEXT,
  "document_type" TEXT,
  "name" TEXT,
  "file_url" TEXT,
  "uploaded_date" TEXT,
  "expiry_date" TEXT,
  "mandatory" BOOLEAN,
  "status" TEXT
);

INSERT INTO "EmployeeDocument" ("id", "created_date", "updated_date", "created_by", "employee_email", "employee_id", "document_type", "name", "file_url", "uploaded_date", "expiry_date", "mandatory", "status") VALUES ('6a9123cc26825e1fe352d9a5', '2026-08-28T05:59:40.996000', '2026-08-28T05:59:40.996000', NULL, 'employee@demo.com', '6a9121a143ae589d52872b21', 'ID Proof', 'Aadhaar', NULL, '2026-04-01', '2036-04-01', TRUE, 'verified');

-- ------------------------------------------------------------
-- Entity: Timesheet  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Timesheet";
CREATE TABLE "Timesheet" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "employee_email" TEXT,
  "employee_id" TEXT,
  "week_start" TEXT,
  "entries" TEXT,
  "total_hours" NUMERIC,
  "billable_hours" NUMERIC,
  "status" TEXT
);

INSERT INTO "Timesheet" ("id", "created_date", "updated_date", "created_by", "employee_email", "employee_id", "week_start", "entries", "total_hours", "billable_hours", "status") VALUES ('6a9123c8cb0f58b140c04632', '2026-08-28T05:59:36.623000', '2026-08-28T05:59:36.623000', NULL, 'employee@demo.com', '6a9121a143ae589d52872b21', '2026-08-25', '[{"date":"2026-08-25","project":"Website Revamp","hours":8,"billable":true}]', 40.0, 40.0, 'submitted');

-- ------------------------------------------------------------
-- Entity: Feedback  (0 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Feedback";
CREATE TABLE "Feedback" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "review_id" TEXT,
  "from_employee_email" TEXT,
  "type" TEXT,
  "rating" NUMERIC,
  "comment" TEXT
);


-- ------------------------------------------------------------
-- Entity: LetterTemplate  (3 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "LetterTemplate";
CREATE TABLE "LetterTemplate" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "name" TEXT,
  "type" TEXT,
  "subject" TEXT,
  "body" TEXT,
  "status" TEXT
);

INSERT INTO "LetterTemplate" ("id", "created_date", "updated_date", "created_by", "name", "type", "subject", "body", "status") VALUES ('6a93cbb2f0c773d63f9f72bc', '2026-08-30T06:20:34.266000', '2026-08-30T06:20:34.266000', NULL, 'Offer Letter', 'offer', 'Offer of Employment', 'Dear {{employee_name}},

We are pleased to offer you the position of {{designation}} in the {{department}} department at our {{branch}} office, effective {{joining_date}}. Your annual CTC will be {{salary}}.

Welcome to the team!', 'active');
INSERT INTO "LetterTemplate" ("id", "created_date", "updated_date", "created_by", "name", "type", "subject", "body", "status") VALUES ('6a93cbb2f0c773d63f9f72bd', '2026-08-30T06:20:34.266000', '2026-08-30T06:20:34.266000', NULL, 'Experience Letter', 'experience', 'Experience Certificate', 'This is to certify that {{employee_name}} (Employee Code: {{employee_code}}) was employed with us as {{designation}} in {{department}} from {{joining_date}}.

We wish them the very best.', 'active');
INSERT INTO "LetterTemplate" ("id", "created_date", "updated_date", "created_by", "name", "type", "subject", "body", "status") VALUES ('6a93cbb2f0c773d63f9f72be', '2026-08-30T06:20:34.266000', '2026-08-30T06:20:34.266000', NULL, 'Appointment Letter', 'appointment', 'Letter of Appointment', 'Dear {{employee_name}},

We hereby appoint you as {{designation}} at {{branch}} effective {{joining_date}}. Your terms of employment are as per company policy.', 'active');

-- ------------------------------------------------------------
-- Entity: PulseSurvey  (1 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "PulseSurvey";
CREATE TABLE "PulseSurvey" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "title" TEXT,
  "questions" TEXT,
  "target_audience" TEXT,
  "branch_id" TEXT,
  "department_id" TEXT,
  "status" TEXT,
  "start_date" TEXT,
  "end_date" TEXT
);

INSERT INTO "PulseSurvey" ("id", "created_date", "updated_date", "created_by", "title", "questions", "target_audience", "branch_id", "department_id", "status", "start_date", "end_date") VALUES ('6a93cbafc6f8eb8bad1cfbf8', '2026-08-30T06:20:31.871000', '2026-08-30T06:20:31.871000', NULL, 'Q3 Engagement Pulse', '["How satisfied are you with your role?","Do you feel valued?","Any blockers?"]', 'all', NULL, NULL, 'active', '2026-08-15', '2026-09-15');

-- ------------------------------------------------------------
-- Entity: Kudos  (2 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Kudos";
CREATE TABLE "Kudos" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "from_email" TEXT,
  "to_email" TEXT,
  "to_name" TEXT,
  "message" TEXT,
  "value" TEXT
);

INSERT INTO "Kudos" ("id", "created_date", "updated_date", "created_by", "from_email", "to_email", "to_name", "message", "value") VALUES ('6a93cbaf3f986390d7823f4e', '2026-08-30T06:20:31.719000', '2026-08-30T06:20:31.719000', NULL, 'manager@demo.com', 'employee@demo.com', 'Zara Ali', 'Great work on the Website Revamp release!', 'excellence');
INSERT INTO "Kudos" ("id", "created_date", "updated_date", "created_by", "from_email", "to_email", "to_name", "message", "value") VALUES ('6a93cbaf3f986390d7823f4f', '2026-08-30T06:20:31.719000', '2026-08-30T06:20:31.719000', NULL, 'employee@demo.com', 'aisha@demo.com', 'Aisha Khan', 'Supportive leadership through the quarter.', 'leadership');

-- ------------------------------------------------------------
-- Entity: Designation  (6 records)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS "Designation";
CREATE TABLE "Designation" (
  "id" TEXT,
  "created_date" TEXT,
  "updated_date" TEXT,
  "created_by" TEXT,
  "name" TEXT,
  "code" TEXT,
  "description" TEXT,
  "status" TEXT
);

INSERT INTO "Designation" ("id", "created_date", "updated_date", "created_by", "name", "code", "description", "status") VALUES ('6a9121a0bb94e2a0925759ac', '2026-08-28T05:50:24.241000', '2026-08-28T05:50:24.241000', NULL, 'Chief Executive Officer', 'CEO', NULL, 'active');
INSERT INTO "Designation" ("id", "created_date", "updated_date", "created_by", "name", "code", "description", "status") VALUES ('6a9121a0bb94e2a0925759ad', '2026-08-28T05:50:24.241000', '2026-08-28T05:50:24.241000', NULL, 'Engineering Manager', 'EM', NULL, 'active');
INSERT INTO "Designation" ("id", "created_date", "updated_date", "created_by", "name", "code", "description", "status") VALUES ('6a9121a0bb94e2a0925759ae', '2026-08-28T05:50:24.241000', '2026-08-28T05:50:24.241000', NULL, 'Senior Software Engineer', 'SSE', NULL, 'active');
INSERT INTO "Designation" ("id", "created_date", "updated_date", "created_by", "name", "code", "description", "status") VALUES ('6a9121a0bb94e2a0925759af', '2026-08-28T05:50:24.241000', '2026-08-28T05:50:24.241000', NULL, 'Software Engineer', 'SE', NULL, 'active');
INSERT INTO "Designation" ("id", "created_date", "updated_date", "created_by", "name", "code", "description", "status") VALUES ('6a9121a0bb94e2a0925759b0', '2026-08-28T05:50:24.241000', '2026-08-28T05:50:24.241000', NULL, 'HR Manager', 'HRM', NULL, 'active');
INSERT INTO "Designation" ("id", "created_date", "updated_date", "created_by", "name", "code", "description", "status") VALUES ('6a9121a0bb94e2a0925759b1', '2026-08-28T05:50:24.241000', '2026-08-28T05:50:24.241000', NULL, 'Sales Executive', 'SX', NULL, 'active');
