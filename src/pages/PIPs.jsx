import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "employee_email", label: "Employee" },
  { key: "start_date", label: "Start" },
  { key: "end_date", label: "End" },
  { key: "milestones", label: "Milestones" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "employee_email", label: "Employee Email", type: "email", required: true },
  { name: "employee_id", label: "Employee", type: "select", optionsEntity: "Employee", optionsLabelFn: (r) => `${r.first_name} ${r.last_name}` },
  { name: "start_date", label: "Start Date", type: "date" },
  { name: "end_date", label: "End Date", type: "date" },
  { name: "milestones", label: "Milestones (JSON)", type: "textarea", placeholder: '[{"title":"...","due":"...","done":false}]' },
  { name: "status", label: "Status", type: "select", options: ["active", "completed", "separated"].map((v) => ({ value: v, label: v })) },
];

export default function PIPs() {
  return (
    <CrudPage entityName="PIP" title="PIP" description="Performance Improvement Plans"
      columns={columns} formFields={formFields} searchKeys={["employee_email"]}
      defaultValues={{ status: "active" }}
      statusActions={[
        { match: "active", to: "completed", label: "Complete" },
        { match: "active", to: "separated", label: "Separate", variant: "destructive" },
      ]}
    />
  );
}