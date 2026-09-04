import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "name", label: "Review Cycle" },
  { key: "start_date", label: "Start" },
  { key: "end_date", label: "End" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "name", label: "Cycle Name", required: true },
  { name: "start_date", label: "Start Date", type: "date" },
  { name: "end_date", label: "End Date", type: "date" },
  { name: "status", label: "Status", type: "select", options: ["draft", "active", "closed"].map((v) => ({ value: v, label: v })) },
];

export default function ReviewCycles() {
  return (
    <CrudPage entityName="ReviewCycle" title="Review Cycle" description="Performance review cycles"
      columns={columns} formFields={formFields} searchKeys={["name"]}
      defaultValues={{ status: "draft" }}
      statusActions={[
        { match: "draft", to: "active", label: "Activate" },
        { match: "active", to: "closed", label: "Close" },
      ]}
    />
  );
}