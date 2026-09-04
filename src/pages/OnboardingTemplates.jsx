import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "name", label: "Template" },
  { key: "checklist", label: "Checklist" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "name", label: "Template Name", required: true },
  { name: "checklist", label: "Checklist (JSON)", type: "textarea", placeholder: '[{"title":"Document collection","mandatory":true}]' },
  { name: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }] },
];

export default function OnboardingTemplates() {
  return <CrudPage entityName="OnboardingTemplate" title="Onboarding Template" description="Onboarding checklist templates" columns={columns} formFields={formFields} searchKeys={["name"]} defaultValues={{ status: "active" }} />;
}