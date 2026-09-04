import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "employee_email", label: "Employee" },
  { key: "title", label: "Task" },
  { key: "due_date", label: "Due" },
  { key: "buddy_id", label: "Buddy", render: (r, lk) => lk.Employee?.[r.buddy_id] || "—" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "employee_email", label: "Employee Email", type: "email", required: true },
  { name: "employee_id", label: "Employee", type: "select", optionsEntity: "Employee", optionsLabelFn: (r) => `${r.first_name} ${r.last_name}` },
  { name: "template_id", label: "Template", type: "select", optionsEntity: "OnboardingTemplate", optionsLabel: "name" },
  { name: "title", label: "Task Title", required: true },
  { name: "due_date", label: "Due Date", type: "date" },
  { name: "buddy_id", label: "Buddy", type: "select", optionsEntity: "Employee", optionsLabelFn: (r) => `${r.first_name} ${r.last_name}` },
  { name: "status", label: "Status", type: "select", options: ["pending", "in_progress", "completed"].map((v) => ({ value: v, label: v })) },
];

export default function OnboardingTasks() {
  return (
    <CrudPage entityName="OnboardingTask" title="Onboarding Task" description="Onboarding checklists and tracking"
      columns={columns} formFields={formFields} searchKeys={["employee_email", "title"]}
      defaultValues={{ status: "pending" }}
      statusActions={[
        { match: "pending", to: "in_progress", label: "Start" },
        { match: "in_progress", to: "completed", label: "Complete" },
      ]}
    />
  );
}