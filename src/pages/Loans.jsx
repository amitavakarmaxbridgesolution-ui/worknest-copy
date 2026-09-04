import React from "react";
import { useAuth } from "@/lib/AuthContext";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "employee_email", label: "Employee" },
  { key: "loan_type", label: "Type" },
  { key: "principal", label: "Principal" },
  { key: "tenure_months", label: "Tenure (mo)" },
  { key: "emi_amount", label: "EMI" },
  { key: "outstanding", label: "Outstanding" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "employee_email", label: "Employee Email", type: "email", required: true },
  { name: "employee_id", label: "Employee", type: "select", optionsEntity: "Employee", optionsLabelFn: (r) => `${r.first_name} ${r.last_name}` },
  { name: "loan_type", label: "Loan Type", type: "select", options: ["personal", "vehicle", "home", "salary"].map((v) => ({ value: v, label: v })) },
  { name: "principal", label: "Principal", type: "number", required: true },
  { name: "interest_rate", label: "Interest Rate (%)", type: "number" },
  { name: "tenure_months", label: "Tenure (months)", type: "number", required: true },
  { name: "emi_amount", label: "EMI Amount", type: "number" },
  { name: "disbursed_date", label: "Disbursed Date", type: "date" },
  { name: "outstanding", label: "Outstanding", type: "number" },
  { name: "schedule", label: "EMI Schedule (JSON)", type: "textarea" },
  { name: "status", label: "Status", type: "select", options: ["pending", "approved", "active", "closed", "rejected"].map((v) => ({ value: v, label: v })) },
];

export default function Loans() {
  const { user } = useAuth();
  return (
    <CrudPage entityName="Loan" title="Loan" description="Employee loans and EMI"
      columns={columns} formFields={formFields} searchKeys={["employee_email"]}
      defaultValues={{ employee_email: user?.email, status: "pending", loan_type: "personal" }}
      statusActions={[
        { match: "pending", to: "approved", label: "Approve" },
        { match: "pending", to: "rejected", label: "Reject", variant: "destructive" },
        { match: "approved", to: "active", label: "Disburse" },
        { match: "active", to: "closed", label: "Close" },
      ]}
    />
  );
}