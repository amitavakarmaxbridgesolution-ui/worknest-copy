import React from "react";
import { useAuth } from "@/lib/AuthContext";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "employee_email", label: "Employee" },
  { key: "resignation_date", label: "Resignation" },
  { key: "last_working_day", label: "Last Working Day" },
  { key: "exit_interview", label: "Exit Interview" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "employee_email", label: "Employee Email", type: "email", required: true },
  { name: "employee_id", label: "Employee", type: "select", optionsEntity: "Employee", optionsLabelFn: (r) => `${r.first_name} ${r.last_name}` },
  { name: "resignation_date", label: "Resignation Date", type: "date" },
  { name: "notice_end_date", label: "Notice End Date", type: "date" },
  { name: "last_working_day", label: "Last Working Day", type: "date" },
  { name: "exit_interview", label: "Exit Interview Notes", type: "textarea" },
  { name: "status", label: "Status", type: "select", options: ["initiated", "in_progress", "completed"].map((v) => ({ value: v, label: v })) },
];

export default function OffboardingRequests() {
  const { user } = useAuth();
  return (
    <CrudPage entityName="OffboardingRequest" title="Offboarding Request" description="Resignation, exit checklist and settlement"
      columns={columns} formFields={formFields} searchKeys={["employee_email"]}
      defaultValues={{ employee_email: user?.email, status: "initiated" }}
      statusActions={[
        { match: "initiated", to: "in_progress", label: "Start Exit" },
        { match: "in_progress", to: "completed", label: "Complete" },
      ]}
    />
  );
}