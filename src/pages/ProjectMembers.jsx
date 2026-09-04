import React from "react";
import CrudPage from "@/components/CrudPage";

const columns = [
  { key: "project_id", label: "Project", render: (r, lk) => lk.Project?.[r.project_id] || "—" },
  { key: "employee_id", label: "Member", render: (r, lk) => lk.Employee?.[r.employee_id] || "—" },
  { key: "role", label: "Role" },
  { key: "allocation_percent", label: "Allocation %" },
];

const formFields = [
  { name: "project_id", label: "Project", type: "select", optionsEntity: "Project", optionsLabel: "name", required: true },
  { name: "employee_id", label: "Employee", type: "select", optionsEntity: "Employee", optionsLabelFn: (r) => `${r.first_name} ${r.last_name}`, required: true },
  { name: "employee_email", label: "Employee Email", type: "email" },
  { name: "role", label: "Role" },
  { name: "allocation_percent", label: "Allocation %", type: "number" },
];

export default function ProjectMembers() {
  return <CrudPage entityName="ProjectMember" title="Project Member" description="Project resource allocation" columns={columns} formFields={formFields} searchKeys={["employee_email"]} defaultValues={{ allocation_percent: 100 }} />;
}