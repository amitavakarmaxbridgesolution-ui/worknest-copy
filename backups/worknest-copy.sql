-- ============================================================
-- WorkNest (Copy) - Complete database backup
-- Base44 app id: 6a9a64330751fb1988364eee
-- Generated: 2026-09-04 06:55:29 UTC
-- Includes: schema (DDL) + all records (INSERTs) per entity
-- ============================================================

-- ------------------------------------------------------------
-- Entity: ActivityLog  (0 records)
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


-- ------------------------------------------------------------
-- Entity: Announcement  (0 records)
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
-- Entity: AppSetting  (0 records)
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


-- ------------------------------------------------------------
-- Entity: Application  (0 records)
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


-- ------------------------------------------------------------
-- Entity: Asset  (0 records)
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


-- ------------------------------------------------------------
-- Entity: AssetCategory  (0 records)
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


-- ------------------------------------------------------------
-- Entity: AssetRequest  (0 records)
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


-- ------------------------------------------------------------
-- Entity: Attendance  (0 records)
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
-- Entity: AttendancePolicy  (0 records)
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


-- ------------------------------------------------------------
-- Entity: AuditLog  (0 records)
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
-- Entity: BenefitEnrollment  (0 records)
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


-- ------------------------------------------------------------
-- Entity: BenefitPlan  (0 records)
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


-- ------------------------------------------------------------
-- Entity: Branch  (0 records)
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


-- ------------------------------------------------------------
-- Entity: CalendarEvent  (0 records)
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


-- ------------------------------------------------------------
-- Entity: Candidate  (0 records)
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


-- ------------------------------------------------------------
-- Entity: Client  (0 records)
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


-- ------------------------------------------------------------
-- Entity: Company  (0 records)
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


-- ------------------------------------------------------------
-- Entity: Course  (0 records)
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


-- ------------------------------------------------------------
-- Entity: Department  (0 records)
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


-- ------------------------------------------------------------
-- Entity: Dependent  (0 records)
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


-- ------------------------------------------------------------
-- Entity: Designation  (0 records)
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


-- ------------------------------------------------------------
-- Entity: Employee  (0 records)
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


-- ------------------------------------------------------------
-- Entity: EmployeeDocument  (0 records)
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


-- ------------------------------------------------------------
-- Entity: EmployeeLifecycleHistory  (0 records)
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


-- ------------------------------------------------------------
-- Entity: EmployeePayrollProfile  (0 records)
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


-- ------------------------------------------------------------
-- Entity: Enrollment  (0 records)
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


-- ------------------------------------------------------------
-- Entity: ExpenseCategory  (0 records)
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


-- ------------------------------------------------------------
-- Entity: ExpenseClaim  (0 records)
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
-- Entity: Goal  (0 records)
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


-- ------------------------------------------------------------
-- Entity: HelpdeskCategory  (0 records)
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


-- ------------------------------------------------------------
-- Entity: HelpdeskComment  (0 records)
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


-- ------------------------------------------------------------
-- Entity: HelpdeskTicket  (0 records)
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


-- ------------------------------------------------------------
-- Entity: Holiday  (0 records)
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


-- ------------------------------------------------------------
-- Entity: JobGrade  (0 records)
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


-- ------------------------------------------------------------
-- Entity: JobPost  (0 records)
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


-- ------------------------------------------------------------
-- Entity: JobRequisition  (0 records)
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


-- ------------------------------------------------------------
-- Entity: KnowledgeArticle  (0 records)
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


-- ------------------------------------------------------------
-- Entity: KnowledgeCategory  (0 records)
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


-- ------------------------------------------------------------
-- Entity: Kudos  (0 records)
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


-- ------------------------------------------------------------
-- Entity: LeaveBalance  (0 records)
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
-- Entity: LeaveRequest  (0 records)
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


-- ------------------------------------------------------------
-- Entity: LeaveType  (0 records)
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
-- Entity: LetterTemplate  (0 records)
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


-- ------------------------------------------------------------
-- Entity: Loan  (0 records)
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


-- ------------------------------------------------------------
-- Entity: LoginLog  (0 records)
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


-- ------------------------------------------------------------
-- Entity: Meeting  (0 records)
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


-- ------------------------------------------------------------
-- Entity: MeetingActionItem  (0 records)
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


-- ------------------------------------------------------------
-- Entity: Notification  (0 records)
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


-- ------------------------------------------------------------
-- Entity: NotificationPreference  (0 records)
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
-- Entity: OnboardingTask  (0 records)
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


-- ------------------------------------------------------------
-- Entity: OnboardingTemplate  (0 records)
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
-- Entity: PayrollAdjustment  (0 records)
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


-- ------------------------------------------------------------
-- Entity: PayrollPeriod  (0 records)
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


-- ------------------------------------------------------------
-- Entity: PayrollRun  (0 records)
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


-- ------------------------------------------------------------
-- Entity: Payslip  (0 records)
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


-- ------------------------------------------------------------
-- Entity: PerformanceReview  (0 records)
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


-- ------------------------------------------------------------
-- Entity: Policy  (0 records)
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


-- ------------------------------------------------------------
-- Entity: Poll  (0 records)
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


-- ------------------------------------------------------------
-- Entity: PollVote  (0 records)
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


-- ------------------------------------------------------------
-- Entity: Project  (0 records)
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


-- ------------------------------------------------------------
-- Entity: ProjectMember  (0 records)
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


-- ------------------------------------------------------------
-- Entity: PulseResponse  (0 records)
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


-- ------------------------------------------------------------
-- Entity: PulseSurvey  (0 records)
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


-- ------------------------------------------------------------
-- Entity: ReviewCycle  (0 records)
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


-- ------------------------------------------------------------
-- Entity: SalaryAdvance  (0 records)
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


-- ------------------------------------------------------------
-- Entity: SalaryComponent  (0 records)
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


-- ------------------------------------------------------------
-- Entity: SalaryStructure  (0 records)
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


-- ------------------------------------------------------------
-- Entity: Shift  (0 records)
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


-- ------------------------------------------------------------
-- Entity: StatutoryConfig  (0 records)
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


-- ------------------------------------------------------------
-- Entity: Suggestion  (0 records)
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


-- ------------------------------------------------------------
-- Entity: TaxDeclaration  (0 records)
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


-- ------------------------------------------------------------
-- Entity: Team  (0 records)
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


-- ------------------------------------------------------------
-- Entity: Timesheet  (0 records)
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


-- ------------------------------------------------------------
-- Entity: TrainingCategory  (0 records)
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


-- ------------------------------------------------------------
-- Entity: TrainingProvider  (0 records)
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


-- ------------------------------------------------------------
-- Entity: TrainingRequest  (0 records)
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


-- ------------------------------------------------------------
-- Entity: TrainingSession  (0 records)
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


-- ------------------------------------------------------------
-- Entity: Vendor  (0 records)
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

