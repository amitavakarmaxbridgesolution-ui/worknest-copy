import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const empLabel = (r) => `${r.first_name || ""} ${r.last_name || ""}`.trim() || r.id;

const columns = [
  { key: "name", label: "Team" },
  { key: "code", label: "Code" },
  { key: "department_id", label: "Department", render: (r, lk) => lk.Department?.[r.department_id] || "—" },
  { key: "team_lead_id", label: "Team Lead", render: (r, lk) => lk.Employee?.[r.team_lead_id] || "—" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "department_id", label: "Department", type: "select", optionsEntity: "Department", optionsLabel: "name", required: true },
  { name: "name", label: "Team Name", required: true },
  { name: "code", label: "Code" },
  { name: "team_lead_id", label: "Team Lead", type: "select", optionsEntity: "Employee", optionsLabelFn: empLabel },
  {
    name: "status", label: "Status", type: "select",
    options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }],
  },
];

export default function Teams() {
  return (
    <CrudPage
      entityName="Team"
      title="Team"
      description="Manage teams within departments"
      columns={columns}
      formFields={formFields}
      searchKeys={["name", "code"]}
      defaultValues={{ status: "active" }}
    />
  );
}