import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "name", label: "Category" },
  { key: "department_id", label: "Department", render: (r, lk) => lk.Department?.[r.department_id] || "—" },
  { key: "sla_hours", label: "SLA (hrs)" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "name", label: "Category Name", required: true },
  { name: "department_id", label: "Owning Department", type: "select", optionsEntity: "Department", optionsLabel: "name" },
  { name: "sla_hours", label: "SLA (hours)", type: "number" },
  { name: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }] },
];

export default function HelpdeskCategories() {
  return <CrudPage entityName="HelpdeskCategory" title="Helpdesk Category" description="Ticket categories with SLA targets" columns={columns} formFields={formFields} searchKeys={["name"]} defaultValues={{ status: "active", sla_hours: 24 }} />;
}