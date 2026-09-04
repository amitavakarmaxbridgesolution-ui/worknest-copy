import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "title", label: "Course" },
  { key: "category_id", label: "Category", render: (r, lk) => lk.TrainingCategory?.[r.category_id] || "—" },
  { key: "provider_id", label: "Provider", render: (r, lk) => lk.TrainingProvider?.[r.provider_id] || "—" },
  { key: "duration_hours", label: "Duration (hrs)" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "title", label: "Course Title", required: true },
  { name: "category_id", label: "Category", type: "select", optionsEntity: "TrainingCategory", optionsLabel: "name" },
  { name: "provider_id", label: "Provider", type: "select", optionsEntity: "TrainingProvider", optionsLabel: "name" },
  { name: "duration_hours", label: "Duration (hours)", type: "number" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }] },
];

export default function Courses() {
  return <CrudPage entityName="Course" title="Course" description="Training courses" columns={columns} formFields={formFields} searchKeys={["title"]} defaultValues={{ status: "active" }} />;
}