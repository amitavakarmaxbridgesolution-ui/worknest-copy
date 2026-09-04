import React from "react";
import { useAuth } from "@/lib/AuthContext";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "employee_email", label: "Employee" },
  { key: "category_id", label: "Category", render: (r, lk) => lk.ExpenseCategory?.[r.category_id] || "—" },
  { key: "title", label: "Title" },
  { key: "total_amount", label: "Amount" },
  { key: "submitted_date", label: "Submitted" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "employee_email", label: "Employee Email", type: "email", required: true },
  { name: "employee_id", label: "Employee", type: "select", optionsEntity: "Employee", optionsLabelFn: (r) => `${r.first_name} ${r.last_name}` },
  { name: "category_id", label: "Category", type: "select", optionsEntity: "ExpenseCategory", optionsLabel: "name" },
  { name: "title", label: "Title", required: true },
  { name: "total_amount", label: "Total Amount", type: "number", required: true },
  { name: "items", label: "Items (JSON)", type: "textarea", placeholder: '[{"date":"2026-01-01","description":"Taxi","amount":250,"receipt":"url"}]' },
  { name: "submitted_date", label: "Submitted Date", type: "date" },
  { name: "status", label: "Status", type: "select", options: ["draft", "submitted", "approved", "rejected", "reimbursed"].map((v) => ({ value: v, label: v })) },
];

export default function ExpenseClaims() {
  const { user } = useAuth();
  return (
    <CrudPage entityName="ExpenseClaim" title="Expense Claim" description="Expense claims and reimbursement"
      columns={columns} formFields={formFields} searchKeys={["employee_email", "title"]}
      defaultValues={{ employee_email: user?.email, status: "draft" }}
      statusActions={[
        { match: "draft", to: "submitted", label: "Submit" },
        { match: "submitted", to: "approved", label: "Approve" },
        { match: "submitted", to: "rejected", label: "Reject", variant: "destructive" },
        { match: "approved", to: "reimbursed", label: "Reimburse" },
      ]}
    />
  );
}