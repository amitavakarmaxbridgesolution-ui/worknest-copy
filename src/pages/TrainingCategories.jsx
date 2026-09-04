import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "name", label: "Category" },
  { key: "description", label: "Description" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "name", label: "Category Name", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }] },
];

export default function TrainingCategories() {
  return <CrudPage entityName="TrainingCategory" title="Training Category" description="Training categories" columns={columns} formFields={formFields} searchKeys={["name"]} defaultValues={{ status: "active" }} />;
}