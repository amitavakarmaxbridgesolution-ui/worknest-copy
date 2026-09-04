import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "employee_email", label: "Employee" },
  { key: "document_type", label: "Type" },
  { key: "name", label: "Document" },
  { key: "uploaded_date", label: "Uploaded" },
  { key: "expiry_date", label: "Expiry" },
  { key: "mandatory", label: "Mandatory", render: (r) => (r.mandatory ? "Yes" : "No") },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "employee_email", label: "Employee Email", type: "email", required: true },
  { name: "employee_id", label: "Employee", type: "select", optionsEntity: "Employee", optionsLabelFn: (r) => `${r.first_name} ${r.last_name}` },
  { name: "document_type", label: "Document Type", type: "select", required: true, options: [
    { value: "ID Proof", label: "ID Proof" }, { value: "Address Proof", label: "Address Proof" },
    { value: "Education Certificate", label: "Education Certificate" }, { value: "Offer Letter", label: "Offer Letter" },
    { value: "Experience Letter", label: "Experience Letter" }, { value: "Contract", label: "Contract" }, { value: "Other", label: "Other" },
  ] },
  { name: "name", label: "Document Name", required: true },
  { name: "file_url", label: "File URL" },
  { name: "uploaded_date", label: "Uploaded Date", type: "date" },
  { name: "expiry_date", label: "Expiry Date", type: "date" },
  { name: "mandatory", label: "Mandatory", type: "select", options: [{ value: "true", label: "Yes" }, { value: "false", label: "No" }] },
  { name: "status", label: "Status", type: "select", options: [{ value: "pending", label: "Pending" }, { value: "verified", label: "Verified" }, { value: "expired", label: "Expired" }] },
];

export default function EmployeeDocuments() {
  return <CrudPage entityName="EmployeeDocument" title="Employee Document" description="Employee documents, expiry and validation" columns={columns} formFields={formFields} searchKeys={["employee_email", "name", "document_type"]} defaultValues={{ status: "pending", mandatory: false }} />;
}