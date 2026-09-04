import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "branch_code", label: "Code" },
  { key: "branch_name", label: "Branch" },
  { key: "head_office", label: "Head Office", render: (r) => <StatusBadge status={r.head_office === "yes" ? "yes" : "no"} /> },
  { key: "city", label: "City" },
  { key: "country", label: "Country" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "company_id", label: "Company", type: "select", optionsEntity: "Company", optionsLabel: "company_name", required: true },
  { name: "branch_code", label: "Branch Code", required: true },
  { name: "branch_name", label: "Branch Name", required: true },
  { name: "head_office", label: "Head Office", type: "select", options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
  { name: "contact_person", label: "Contact Person" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "tel" },
  { name: "address", label: "Address", type: "textarea" },
  { name: "city", label: "City" },
  { name: "state", label: "State" },
  { name: "country", label: "Country" },
  { name: "postal_code", label: "Postal Code" },
  { name: "timezone", label: "Timezone", placeholder: "Asia/Kolkata" },
  {
    name: "status", label: "Status", type: "select",
    options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }],
  },
];

export default function Branches() {
  return (
    <CrudPage
      entityName="Branch"
      title="Branch"
      description="Manage organizational branches"
      columns={columns}
      formFields={formFields}
      searchKeys={["branch_code", "branch_name", "city"]}
      defaultValues={{ status: "active", head_office: "no" }}
    />
  );
}