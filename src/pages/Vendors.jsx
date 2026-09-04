import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "name", label: "Vendor" },
  { key: "contact_person", label: "Contact" },
  { key: "email", label: "Email" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "name", label: "Vendor Name", required: true },
  { name: "contact_person", label: "Contact Person" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "tel" },
  { name: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }] },
];

export default function Vendors() {
  return <CrudPage entityName="Vendor" title="Vendor" description="Asset vendors" columns={columns} formFields={formFields} searchKeys={["name"]} defaultValues={{ status: "active" }} />;
}