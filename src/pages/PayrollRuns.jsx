import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "employee_email", label: "Employee" },
  { key: "payroll_period_id", label: "Period", render: (r, lk) => lk.PayrollPeriod?.[r.payroll_period_id] || "—" },
  { key: "gross", label: "Gross" },
  { key: "deductions", label: "Deductions" },
  { key: "loan_deduction", label: "Loan" },
  { key: "advance_deduction", label: "Advance" },
  { key: "net_pay", label: "Net Pay" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "payroll_period_id", label: "Payroll Period", type: "select", optionsEntity: "PayrollPeriod", optionsLabel: "name", required: true },
  { name: "employee_email", label: "Employee Email", type: "email", required: true },
  { name: "employee_id", label: "Employee", type: "select", optionsEntity: "Employee", optionsLabelFn: (r) => `${r.first_name} ${r.last_name}` },
  { name: "gross", label: "Gross", type: "number" },
  { name: "deductions", label: "Deductions", type: "number" },
  { name: "loan_deduction", label: "Loan Deduction", type: "number" },
  { name: "advance_deduction", label: "Advance Deduction", type: "number" },
  { name: "net_pay", label: "Net Pay", type: "number" },
  { name: "status", label: "Status", type: "select", options: ["calculated", "approved", "published", "locked"].map((v) => ({ value: v, label: v })) },
];

export default function PayrollRuns() {
  return (
    <CrudPage entityName="PayrollRun" title="Payroll Run" description="Generated payroll runs"
      columns={columns} formFields={formFields} searchKeys={["employee_email"]}
      defaultValues={{ status: "calculated" }}
      statusActions={[
        { match: "calculated", to: "approved", label: "Approve" },
        { match: "approved", to: "published", label: "Publish" },
        { match: "published", to: "locked", label: "Lock" },
      ]}
    />
  );
}