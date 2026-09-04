import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "employee_email", label: "Employee" },
  { key: "session_id", label: "Session", render: (r, lk) => lk.TrainingSession?.[r.session_id] || "—" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
  { key: "certificate_url", label: "Certificate" },
];

const formFields = [
  { name: "employee_email", label: "Employee Email", type: "email", required: true },
  { name: "employee_id", label: "Employee", type: "select", optionsEntity: "Employee", optionsLabelFn: (r) => `${r.first_name} ${r.last_name}` },
  { name: "session_id", label: "Session", type: "select", optionsEntity: "TrainingSession", optionsLabel: "start_date", required: true },
  { name: "status", label: "Status", type: "select", options: ["enrolled", "completed", "cancelled"].map((v) => ({ value: v, label: v })) },
  { name: "certificate_url", label: "Certificate URL" },
];

export default function Enrollments() {
  return (
    <CrudPage entityName="Enrollment" title="Enrollment" description="Training enrollments and certificates"
      columns={columns} formFields={formFields} searchKeys={["employee_email"]}
      defaultValues={{ status: "enrolled" }}
      statusActions={[
        { match: "enrolled", to: "completed", label: "Complete" },
        { match: "enrolled", to: "cancelled", label: "Cancel", variant: "destructive" },
      ]}
    />
  );
}