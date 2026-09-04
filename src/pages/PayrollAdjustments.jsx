import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "payroll_run_id", label: "Payroll Run", render: (r, lk) => lk.PayrollRun?.[r.payroll_run_id] || "—" },
  { key: "employee_email", label: "Employee" },
  { key: "component", label: "Component" },
  { key: "amount", label: "Amount" },
  { key: "reason", label: "Reason" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "payroll_run_id", label: "Payroll Run", type: "select", optionsEntity: "PayrollRun", optionsLabel: "employee_email" },
  { name: "employee_email", label: "Employee Email", type: "email", required: true },
  { name: "employee_id", label: "Employee", type: "select", optionsEntity: "Employee", optionsLabelFn: (r) => `${r.first_name} ${r.last_name}` },
  { name: "type", label: "Type", type: "select", options: [{ value: "correction", label: "Correction" }, { value: "adjustment", label: "Adjustment" }] },
  { name: "component", label: "Component", required: true },
  { name: "amount", label: "Amount", type: "number", required: true },
  { name: "reason", label: "Reason", type: "textarea", required: true },
  { name: "status", label: "Status", type: "select", options: ["pending", "approved", "applied", "rejected"].map((v) => ({ value: v, label: v })) },
];

export default function PayrollAdjustments() {
  return (
    <CrudPage entityName="PayrollAdjustment" title="Payroll Adjustment" description="Audited corrections to locked payroll runs"
      columns={columns} formFields={formFields} searchKeys={["employee_email", "component"]}
      defaultValues={{ status: "pending", type: "correction" }}
      statusActions={[
        { match: "pending", to: "approved", label: "Approve" },
        { match: "pending", to: "rejected", label: "Reject", variant: "destructive" },
        { match: "approved", to: "applied", label: "Apply" },
      ]}
    />
  );
}