import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "name", label: "Benefit Plan" },
  { key: "type", label: "Type", render: (r) => <StatusBadge status={r.type} /> },
  { key: "provider", label: "Provider" },
  { key: "description", label: "Description" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "name", label: "Plan Name", required: true },
  { name: "type", label: "Type", type: "select", required: true, options: ["insurance", "health", "wellness", "retirement", "other"].map((v) => ({ value: v, label: v })) },
  { name: "provider", label: "Provider" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }] },
];

export default function BenefitPlans() {
  return <CrudPage entityName="BenefitPlan" title="Benefit Plan" description="Insurance, health and wellness plans" columns={columns} formFields={formFields} searchKeys={["name", "provider"]} defaultValues={{ status: "active", type: "insurance" }} />;
}