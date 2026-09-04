import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "company_name", label: "Company" },
  { key: "legal_name", label: "Legal Name" },
  { key: "email", label: "Email" },
  { key: "city", label: "City" },
  { key: "country", label: "Country" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "company_name", label: "Company Name", required: true },
  { name: "legal_name", label: "Legal Name" },
  { name: "registration_number", label: "Registration No." },
  { name: "tax_identifier", label: "Tax ID" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "tel" },
  { name: "website", label: "Website" },
  { name: "address", label: "Address", type: "textarea" },
  { name: "city", label: "City" },
  { name: "state", label: "State" },
  { name: "country", label: "Country" },
  { name: "postal_code", label: "Postal Code" },
  { name: "timezone", label: "Timezone", placeholder: "Asia/Kolkata" },
  { name: "currency", label: "Currency", placeholder: "INR" },
  {
    name: "status", label: "Status", type: "select",
    options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }],
  },
];

export default function Companies() {
  return (
    <CrudPage
      entityName="Company"
      title="Company"
      description="Manage company profile and details"
      columns={columns}
      formFields={formFields}
      searchKeys={["company_name", "legal_name", "email"]}
      defaultValues={{ status: "active" }}
    />
  );
}