import React from "react";
import { useAuth } from "@/lib/AuthContext";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "title", label: "Goal" },
  { key: "kpi_target", label: "KPI Target" },
  { key: "weight", label: "Weight" },
  { key: "progress", label: "Progress %" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "employee_email", label: "Employee Email", type: "email", required: true },
  { name: "employee_id", label: "Employee", type: "select", optionsEntity: "Employee", optionsLabelFn: (r) => `${r.first_name} ${r.last_name}` },
  { name: "title", label: "Goal Title", required: true },
  { name: "kpi_target", label: "KPI Target" },
  { name: "weight", label: "Weight", type: "number" },
  { name: "progress", label: "Progress %", type: "number" },
  { name: "review_cycle_id", label: "Review Cycle", type: "select", optionsEntity: "ReviewCycle", optionsLabel: "name" },
  { name: "status", label: "Status", type: "select", options: ["not_started", "in_progress", "achieved", "missed"].map((v) => ({ value: v, label: v })) },
];

export default function Goals() {
  const { user } = useAuth();
  return (
    <CrudPage entityName="Goal" title="Goal" description="Employee goals, KPIs and progress"
      columns={columns} formFields={formFields} searchKeys={["employee_email", "title"]}
      defaultValues={{ employee_email: user?.email, status: "not_started" }}
      filters={[{ key: "status", label: "All Status", options: ["not_started", "in_progress", "achieved", "missed"].map((v) => ({ value: v, label: v })) }]}
    />
  );
}