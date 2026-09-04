import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "template_id", label: "Template", render: (r, lk) => lk.LetterTemplate?.[r.template_id] || "—" },
  { key: "employee_email", label: "Employee" },
  { key: "requested_by", label: "Requested By" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "template_id", label: "Template", type: "select", optionsEntity: "LetterTemplate", optionsLabel: "name", required: true },
  { name: "employee_email", label: "Employee Email", type: "email", required: true },
  { name: "employee_id", label: "Employee", type: "select", optionsEntity: "Employee", optionsLabelFn: (r) => `${r.first_name} ${r.last_name}` },
  { name: "status", label: "Status", type: "select", options: ["requested", "generated", "rejected"].map((v) => ({ value: v, label: v })) },
];

export default function LetterRequests() {
  return (
    <CrudPage entityName="LetterRequest" title="Letter Request" description="Audit log of generated letters"
      columns={columns} formFields={formFields} searchKeys={["employee_email"]}
      defaultValues={{ status: "requested" }}
      statusActions={[
        { match: "requested", to: "generated", label: "Mark Generated" },
        { match: "requested", to: "rejected", label: "Reject", variant: "destructive" },
      ]}
    />
  );
}