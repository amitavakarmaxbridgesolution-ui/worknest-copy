import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "employee_email", label: "Employee" },
  { key: "event", label: "Event", render: (r) => <StatusBadge status={r.event} /> },
  { key: "from_status", label: "From" },
  { key: "to_status", label: "To" },
  { key: "effective_date", label: "Effective Date" },
  { key: "notes", label: "Notes" },
];

const formFields = [
  { name: "employee_id", label: "Employee", type: "select", optionsEntity: "Employee", optionsLabelFn: (r) => `${r.first_name} ${r.last_name}` },
  { name: "employee_email", label: "Employee Email", type: "email" },
  { name: "event", label: "Event", type: "select", required: true, options: [
    "Hired", "Onboarding", "Active", "Probation", "Confirmed", "Transfer", "Promotion", "Resignation", "Notice Period", "Exit", "Inactive",
  ].map((v) => ({ value: v, label: v })) },
  { name: "from_status", label: "From Status" },
  { name: "to_status", label: "To Status" },
  { name: "effective_date", label: "Effective Date", type: "date" },
  { name: "notes", label: "Notes", type: "textarea" },
];

export default function LifecycleHistory() {
  return <CrudPage entityName="EmployeeLifecycleHistory" title="Lifecycle History" description="Employee lifecycle and change history" columns={columns} formFields={formFields} searchKeys={["employee_email", "event"]} />;
}