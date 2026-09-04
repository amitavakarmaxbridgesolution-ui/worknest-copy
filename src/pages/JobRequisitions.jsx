import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "title", label: "Requisition" },
  { key: "department_id", label: "Department", render: (r, lk) => lk.Department?.[r.department_id] || "—" },
  { key: "headcount", label: "Headcount" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "department_id", label: "Department", type: "select", optionsEntity: "Department", optionsLabel: "name" },
  { name: "title", label: "Job Title", required: true },
  { name: "headcount", label: "Headcount", type: "number" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "status", label: "Status", type: "select", options: ["draft", "approved", "open", "closed"].map((v) => ({ value: v, label: v })) },
];

export default function JobRequisitions() {
  return (
    <CrudPage entityName="JobRequisition" title="Job Requisition" description="Hiring requisitions"
      columns={columns} formFields={formFields} searchKeys={["title"]}
      defaultValues={{ status: "draft", headcount: 1 }}
      statusActions={[
        { match: "draft", to: "approved", label: "Approve" },
        { match: "approved", to: "open", label: "Open" },
        { match: "open", to: "closed", label: "Close" },
      ]}
    />
  );
}