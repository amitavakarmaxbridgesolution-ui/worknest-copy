import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "name", label: "Template" },
  { key: "type", label: "Letter Type", render: (r) => <StatusBadge status={r.type} /> },
  { key: "subject", label: "Subject" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "name", label: "Template Name", required: true },
  { name: "type", label: "Letter Type", type: "select", required: true, options: ["offer", "appointment", "experience", "salary", "promotion", "transfer", "warning", "other"].map((v) => ({ value: v, label: v })) },
  { name: "subject", label: "Subject" },
  { name: "body", label: "Body (use {{placeholders}})", type: "textarea", required: true, placeholder: "Dear {{employee_name}},\n\nWe are pleased to appoint you as {{designation}}..." },
  { name: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }] },
];

export default function LetterTemplates() {
  return (
    <CrudPage entityName="LetterTemplate" title="Letter Template" description="Reusable HR letter templates with placeholders"
      columns={columns} formFields={formFields} searchKeys={["name"]}
      defaultValues={{ status: "active", type: "offer" }}
      filters={[{ key: "type", label: "All Types", options: ["offer", "appointment", "experience", "salary", "promotion", "transfer", "warning", "other"].map((v) => ({ value: v, label: v })) }]}
    />
  );
}