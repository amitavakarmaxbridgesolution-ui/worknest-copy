import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "name", label: "Client" },
  { key: "contact_person", label: "Contact" },
  { key: "email", label: "Email" },
  { key: "industry", label: "Industry" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "name", label: "Client Name", required: true },
  { name: "contact_person", label: "Contact Person" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "tel" },
  { name: "industry", label: "Industry" },
  { name: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }] },
];

export default function Clients() {
  return <CrudPage entityName="Client" title="Client" description="Project clients" columns={columns} formFields={formFields} searchKeys={["name", "contact_person"]} defaultValues={{ status: "active" }} />;
}