import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const empLabel = (r) => `${r.first_name || ""} ${r.last_name || ""}`.trim() || r.id;

const columns = [
  { key: "name", label: "Department" },
  { key: "code", label: "Code" },
  { key: "branch_id", label: "Branch", render: (r, lk) => lk.Branch?.[r.branch_id] || "—" },
  { key: "head_employee_id", label: "Head", render: (r, lk) => lk.Employee?.[r.head_employee_id] || "—" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "branch_id", label: "Branch", type: "select", optionsEntity: "Branch", optionsLabel: "branch_name", required: true },
  { name: "name", label: "Department Name", required: true },
  { name: "code", label: "Code" },
  { name: "head_employee_id", label: "Department Head", type: "select", optionsEntity: "Employee", optionsLabelFn: empLabel },
  {
    name: "status", label: "Status", type: "select",
    options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }],
  },
];

export default function Departments() {
  return (
    <CrudPage
      entityName="Department"
      title="Department"
      description="Manage departments across branches"
      columns={columns}
      formFields={formFields}
      searchKeys={["name", "code"]}
      defaultValues={{ status: "active" }}
    />
  );
}