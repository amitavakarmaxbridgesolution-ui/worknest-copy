import React from "react";
import { useAuth } from "@/lib/AuthContext";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "employee_email", label: "Employee" },
  { key: "benefit_plan_id", label: "Plan", render: (r, lk) => lk.BenefitPlan?.[r.benefit_plan_id] || "—" },
  { key: "amount", label: "Amount" },
  { key: "claim_date", label: "Claim Date" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "employee_email", label: "Employee Email", type: "email", required: true },
  { name: "benefit_plan_id", label: "Benefit Plan", type: "select", optionsEntity: "BenefitPlan", optionsLabel: "name" },
  { name: "amount", label: "Amount", type: "number", required: true },
  { name: "claim_date", label: "Claim Date", type: "date" },
  { name: "status", label: "Status", type: "select", options: ["pending", "approved", "rejected", "settled"].map((v) => ({ value: v, label: v })) },
];

export default function BenefitClaims() {
  const { user } = useAuth();
  return (
    <CrudPage entityName="BenefitClaim" title="Benefit Claim" description="Benefit claims and settlement"
      columns={columns} formFields={formFields} searchKeys={["employee_email"]}
      defaultValues={{ employee_email: user?.email, status: "pending" }}
      statusActions={[
        { match: "pending", to: "approved", label: "Approve" },
        { match: "pending", to: "rejected", label: "Reject", variant: "destructive" },
        { match: "approved", to: "settled", label: "Settle" },
      ]}
    />
  );
}