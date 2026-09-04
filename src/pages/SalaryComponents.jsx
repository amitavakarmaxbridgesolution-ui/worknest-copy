import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "name", label: "Component" },
  { key: "code", label: "Code" },
  { key: "type", label: "Type", render: (r) => <StatusBadge status={r.type} /> },
  { key: "calculation_type", label: "Calculation" },
  { key: "default_value", label: "Default Value" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "name", label: "Name", required: true },
  { name: "code", label: "Code" },
  { name: "type", label: "Type", type: "select", required: true, options: [{ value: "earning", label: "Earning" }, { value: "deduction", label: "Deduction" }] },
  { name: "calculation_type", label: "Calculation", type: "select", options: [{ value: "fixed", label: "Fixed" }, { value: "percentage", label: "Percentage" }] },
  { name: "default_value", label: "Default Value", type: "number" },
  { name: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }] },
];

export default function SalaryComponents() {
  return <CrudPage entityName="SalaryComponent" title="Salary Component" description="Earnings and deductions" columns={columns} formFields={formFields} searchKeys={["name", "code"]} defaultValues={{ status: "active", type: "earning", calculation_type: "fixed", default_value: 0 }} />;
}