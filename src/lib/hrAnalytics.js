import { base44 } from "@/api/base44Client";

// Centralized dataset loader for analytics/dashboards.
// Fetches core entity sets in parallel (capped at the SDK page limit).
export async function loadDataset() {
  const [
    employees, branches, departments, designations, teams,
    leaveRequests, attendance, payrollRuns, payslips, loans, advances,
    candidates, applications, jobPosts, assets, expenses, reviews,
    timesheets, meetings, tickets, kudos,
  ] = await Promise.all([
    base44.entities.Employee.list("-updated_date", 500),
    base44.entities.Branch.list("-updated_date", 500),
    base44.entities.Department.list("-updated_date", 500),
    base44.entities.Designation.list("-updated_date", 500),
    base44.entities.Team.list("-updated_date", 500),
    base44.entities.LeaveRequest.list("-updated_date", 500),
    base44.entities.Attendance.list("-updated_date", 500),
    base44.entities.PayrollRun.list("-updated_date", 500),
    base44.entities.Payslip.list("-updated_date", 500),
    base44.entities.Loan.list("-updated_date", 500),
    base44.entities.SalaryAdvance.list("-updated_date", 500),
    base44.entities.Candidate.list("-updated_date", 500),
    base44.entities.Application.list("-updated_date", 500),
    base44.entities.JobPost.list("-updated_date", 500),
    base44.entities.Asset.list("-updated_date", 500),
    base44.entities.ExpenseClaim.list("-updated_date", 500),
    base44.entities.PerformanceReview.list("-updated_date", 500),
    base44.entities.Timesheet.list("-updated_date", 500),
    base44.entities.Meeting.list("-updated_date", 500),
    base44.entities.HelpdeskTicket.list("-updated_date", 500),
    base44.entities.Kudos.list("-updated_date", 500),
  ]);
  return {
    employees, branches, departments, designations, teams,
    leaveRequests, attendance, payrollRuns, payslips, loans, advances,
    candidates, applications, jobPosts, assets, expenses, reviews,
    timesheets, meetings, tickets, kudos,
  };
}

export const lookup = (rows, id, field = "name") => rows.find((r) => r.id === id)?.[field] || "—";

export const groupCount = (rows, keyFn) => {
  const m = {};
  rows.forEach((r) => { const k = keyFn(r) || "Unassigned"; m[k] = (m[k] || 0) + 1; });
  return Object.entries(m).map(([name, value]) => ({ name, value }));
};

export const sumBy = (rows, keyFn, valFn) => {
  const m = {};
  rows.forEach((r) => { const k = keyFn(r) || "Unassigned"; m[k] = (m[k] || 0) + (Number(valFn(r)) || 0); });
  return Object.entries(m).map(([name, value]) => ({ name, value }));
};