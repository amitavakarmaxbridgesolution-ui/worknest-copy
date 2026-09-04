import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "title", label: "Job Post" },
  { key: "requisition_id", label: "Requisition", render: (r, lk) => lk.JobRequisition?.[r.requisition_id] || "—" },
  { key: "location", label: "Location" },
  { key: "employment_type", label: "Type" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "requisition_id", label: "Requisition", type: "select", optionsEntity: "JobRequisition", optionsLabel: "title" },
  { name: "title", label: "Job Title", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "location", label: "Location" },
  { name: "employment_type", label: "Employment Type" },
  { name: "published_date", label: "Published Date", type: "date" },
  { name: "status", label: "Status", type: "select", options: ["draft", "published", "closed"].map((v) => ({ value: v, label: v })) },
];

export default function JobPosts() {
  return (
    <CrudPage entityName="JobPost" title="Job Post" description="Published job openings"
      columns={columns} formFields={formFields} searchKeys={["title", "location"]}
      defaultValues={{ status: "draft" }}
      statusActions={[
        { match: "draft", to: "published", label: "Publish" },
        { match: "published", to: "closed", label: "Close" },
      ]}
    />
  );
}