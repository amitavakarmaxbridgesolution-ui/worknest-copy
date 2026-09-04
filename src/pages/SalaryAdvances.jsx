import React from "react";
import { useAuth } from "@/lib/AuthContext";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "employee_email", label: "Employee" },
  { key: "amount", label: "Amount" },
  { key: "request_date", label: "Request Date" },
  { key: "approval_date", label: "Approval Date" },
  { key: "recovery_start", label: "Recovery Start" },
  { key: "recovered_amount", label: "Recovered" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "employee_email", label: "Employee Email", type: "email", required: true },
  { name: "employee_id", label: "Employee", type: "select", optionsEntity: "Employee", optionsLabelFn: (r) => `${r.first_name} ${r.last_name}` },
  { name: "amount", label: "Amount", type: "number", required: true },
  { name: "request_date", label: "Request Date", type: "date" },
  { name: "approval_date", label: "Approval Date", type: "date" },
  { name: "recovery_start", label: "Recovery Start", type: "date" },
  { name: "recovered_amount", label: "Recovered Amount", type: "number" },
  { name: "status", label: "Status", type: "select", options: ["pending", "approved", "rejected", "recovered"].map((v) => ({ value: v, label: v })) },
];

export default function SalaryAdvances() {
  const { user } = useAuth();
  return (
    <CrudPage entityName="SalaryAdvance" title="Salary Advance" description="Salary advance requests and recovery"
      columns={columns} formFields={formFields} searchKeys={["employee_email"]}
      defaultValues={{ employee_email: user?.email, status: "pending" }}
      statusActions={[
        { match: "pending", to: "approved", label: "Approve" },
        { match: "pending", to: "rejected", label: "Reject", variant: "destructive" },
        { match: "approved", to: "recovered", label: "Mark Recovered" },
      ]}
    />
  );
}