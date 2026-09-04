import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "question", label: "Question" },
  { key: "options", label: "Options" },
  { key: "created_by", label: "Created By" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "question", label: "Poll Question", required: true },
  { name: "options", label: "Options (JSON)", type: "textarea", required: true, placeholder: '["Option A","Option B","Option C"]' },
  { name: "created_by", label: "Created By" },
  { name: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "closed", label: "Closed" }] },
];

export default function Polls() {
  return (
    <CrudPage entityName="Poll" title="Poll" description="Create polls and capture votes"
      columns={columns} formFields={formFields} searchKeys={["question"]}
      defaultValues={{ status: "active" }}
      statusActions={[{ match: "active", to: "closed", label: "Close" }]}
    />
  );
}