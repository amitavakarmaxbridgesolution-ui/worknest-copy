import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "title", label: "Survey" },
  { key: "target_audience", label: "Audience", render: (r) => <StatusBadge status={r.target_audience} /> },
  { key: "start_date", label: "Start" },
  { key: "end_date", label: "End" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "title", label: "Survey Title", required: true },
  { name: "questions", label: "Questions (JSON)", type: "textarea", required: true, placeholder: '["How satisfied are you?","Any blockers?"]' },
  { name: "target_audience", label: "Audience", type: "select", options: [{ value: "all", label: "All" }, { value: "branch", label: "Branch" }, { value: "department", label: "Department" }] },
  { name: "start_date", label: "Start Date", type: "date" },
  { name: "end_date", label: "End Date", type: "date" },
  { name: "status", label: "Status", type: "select", options: ["draft", "active", "closed"].map((v) => ({ value: v, label: v })) },
];

export default function PulseSurveys() {
  return (
    <CrudPage entityName="PulseSurvey" title="Pulse Survey" description="Create pulse surveys and track responses"
      columns={columns} formFields={formFields} searchKeys={["title"]}
      defaultValues={{ status: "draft", target_audience: "all" }}
      statusActions={[
        { match: "draft", to: "active", label: "Launch" },
        { match: "active", to: "closed", label: "Close" },
      ]}
    />
  );
}