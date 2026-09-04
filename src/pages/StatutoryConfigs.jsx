import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "category", label: "Category", render: (r) => <StatusBadge status={r.category} /> },
  { key: "name", label: "Rule Name" },
  { key: "effective_date", label: "Effective" },
  { key: "version", label: "Version" },
  { key: "config_source", label: "Source" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "category", label: "Category", type: "select", required: true, options: ["PF", "PT", "TDS", "Gratuity"].map((v) => ({ value: v, label: v })) },
  { name: "name", label: "Rule Name", required: true },
  { name: "config", label: "Configuration (JSON)", type: "textarea", required: true, placeholder: '{"employee_rate":0.12,"employer_rate":0.12,"wage_ceiling":15000}' },
  { name: "effective_date", label: "Effective Date", type: "date", required: true },
  { name: "version", label: "Version", type: "number" },
  { name: "config_source", label: "Configuration Source", placeholder: "e.g. EPF Act 1952, amendment 2024" },
  { name: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }] },
];

export default function StatutoryConfigs() {
  return (
    <CrudPage entityName="StatutoryConfig" title="Statutory Configuration" description="PF, PT, TDS and Gratuity rule versions (configurable, not hard-coded)"
      columns={columns} formFields={formFields} searchKeys={["name", "category"]}
      defaultValues={{ status: "active", version: 1, category: "PF" }}
      filters={[{ key: "category", label: "All Categories", options: ["PF", "PT", "TDS", "Gratuity"].map((v) => ({ value: v, label: v })) }]}
    />
  );
}