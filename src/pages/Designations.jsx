import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "name", label: "Designation" },
  { key: "code", label: "Code" },
  { key: "description", label: "Description" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "name", label: "Designation Name", required: true },
  { name: "code", label: "Code" },
  { name: "description", label: "Description", type: "textarea" },
  {
    name: "status", label: "Status", type: "select",
    options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }],
  },
];

export default function Designations() {
  return (
    <CrudPage
      entityName="Designation"
      title="Designation"
      description="Manage job designations"
      columns={columns}
      formFields={formFields}
      searchKeys={["name", "code"]}
      defaultValues={{ status: "active" }}
    />
  );
}