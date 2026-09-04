import React from "react";
import { useAuth } from "@/lib/AuthContext";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "employee_email", label: "Employee" },
  { key: "week_start", label: "Week Starting" },
  { key: "total_hours", label: "Total Hrs" },
  { key: "billable_hours", label: "Billable Hrs" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "employee_email", label: "Employee Email", type: "email", required: true },
  { name: "employee_id", label: "Employee", type: "select", optionsEntity: "Employee", optionsLabelFn: (r) => `${r.first_name} ${r.last_name}` },
  { name: "week_start", label: "Week Start", type: "date", required: true },
  { name: "entries", label: "Time Entries (JSON)", type: "textarea", placeholder: '[{"date":"2026-01-01","project":"...","hours":8,"billable":true}]' },
  { name: "total_hours", label: "Total Hours", type: "number" },
  { name: "billable_hours", label: "Billable Hours", type: "number" },
  { name: "status", label: "Status", type: "select", options: ["draft", "submitted", "approved", "rejected"].map((v) => ({ value: v, label: v })) },
];

export default function Timesheets() {
  const { user } = useAuth();
  return (
    <CrudPage entityName="Timesheet" title="Timesheet" description="Weekly timesheets and approvals"
      columns={columns} formFields={formFields} searchKeys={["employee_email"]}
      defaultValues={{ employee_email: user?.email, status: "draft" }}
      statusActions={[
        { match: "draft", to: "submitted", label: "Submit" },
        { match: "submitted", to: "approved", label: "Approve" },
        { match: "submitted", to: "rejected", label: "Reject", variant: "destructive" },
      ]}
    />
  );
}