import React from "react";
import { useAuth } from "@/lib/AuthContext";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "employee_email", label: "Employee" },
  { key: "financial_year", label: "FY" },
  { key: "regime", label: "Regime", render: (r) => <StatusBadge status={r.regime} /> },
  { key: "investment_80c", label: "80C" },
  { key: "health_insurance_80d", label: "80D" },
  { key: "hra_exemption", label: "HRA" },
  { key: "total_deductions", label: "Total" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "employee_email", label: "Employee Email", type: "email", required: true },
  { name: "employee_id", label: "Employee", type: "select", optionsEntity: "Employee", optionsLabelFn: (r) => `${r.first_name} ${r.last_name}` },
  { name: "financial_year", label: "Financial Year", required: true, placeholder: "2026-27" },
  { name: "regime", label: "Regime", type: "select", options: [{ value: "new", label: "New" }, { value: "old", label: "Old" }] },
  { name: "investment_80c", label: "80C Investments", type: "number" },
  { name: "health_insurance_80d", label: "80D Health Insurance", type: "number" },
  { name: "hra_exemption", label: "HRA Exemption", type: "number" },
  { name: "other_deductions", label: "Other Deductions", type: "number" },
  { name: "total_deductions", label: "Total Deductions", type: "number" },
  { name: "status", label: "Status", type: "select", options: ["draft", "submitted", "approved"].map((v) => ({ value: v, label: v })) },
];

export default function TaxDeclarations() {
  const { user } = useAuth();
  return (
    <CrudPage entityName="TaxDeclaration" title="Tax Declaration" description="Investment declarations under 80C/80D/HRA and TDS regime"
      columns={columns} formFields={formFields} searchKeys={["employee_email", "financial_year"]}
      defaultValues={{ employee_email: user?.email, status: "draft", regime: "new", financial_year: "2026-27" }}
      statusActions={[
        { match: "draft", to: "submitted", label: "Submit" },
        { match: "submitted", to: "approved", label: "Approve" },
      ]}
    />
  );
}