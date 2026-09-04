import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "name", label: "Project" },
  { key: "client_id", label: "Client", render: (r, lk) => lk.Client?.[r.client_id] || "—" },
  { key: "manager_id", label: "Manager", render: (r, lk) => lk.Employee?.[r.manager_id] || "—" },
  { key: "budget", label: "Budget" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "client_id", label: "Client", type: "select", optionsEntity: "Client", optionsLabel: "name" },
  { name: "name", label: "Project Name", required: true },
  { name: "manager_id", label: "Project Manager", type: "select", optionsEntity: "Employee", optionsLabelFn: (r) => `${r.first_name} ${r.last_name}` },
  { name: "start_date", label: "Start Date", type: "date" },
  { name: "end_date", label: "End Date", type: "date" },
  { name: "budget", label: "Budget", type: "number" },
  { name: "status", label: "Status", type: "select", options: ["planning", "active", "on_hold", "completed", "cancelled"].map((v) => ({ value: v, label: v })) },
];

export default function Projects() {
  return <CrudPage entityName="Project" title="Project" description="Projects, budgets and allocation" columns={columns} formFields={formFields} searchKeys={["name"]} defaultValues={{ status: "planning" }} />;
}