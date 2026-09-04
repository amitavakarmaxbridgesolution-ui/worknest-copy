import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "title", label: "Document" },
  { key: "category", label: "Type", render: (r) => <StatusBadge status={r.category} /> },
  { key: "version", label: "Version" },
  { key: "audience", label: "Audience", render: (r) => <StatusBadge status={r.audience} /> },
  { key: "file_url", label: "File" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "title", label: "Title", required: true },
  { name: "category", label: "Type", type: "select", required: true, options: ["Policy", "SOP", "Template", "Contract", "Letter"].map((v) => ({ value: v, label: v })) },
  { name: "content", label: "Content", type: "textarea" },
  { name: "file_url", label: "File URL" },
  { name: "version", label: "Version" },
  { name: "audience", label: "Audience", type: "select", options: [{ value: "all", label: "All" }, { value: "branch", label: "Branch" }, { value: "department", label: "Department" }] },
  { name: "department_id", label: "Department", type: "select", optionsEntity: "Department", optionsLabel: "name" },
  { name: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "archived", label: "Archived" }] },
];

export default function Policies() {
  return (
    <CrudPage entityName="Policy" title="Policy / Document" description="Policies, SOPs, templates and contracts with access control"
      columns={columns} formFields={formFields} searchKeys={["title"]}
      defaultValues={{ status: "active", category: "Policy", audience: "all", version: "1.0" }}
      filters={[{ key: "category", label: "All Types", options: ["Policy", "SOP", "Template", "Contract", "Letter"].map((v) => ({ value: v, label: v })) }]}
    />
  );
}