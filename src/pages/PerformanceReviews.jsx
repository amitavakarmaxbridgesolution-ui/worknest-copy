import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "employee_email", label: "Employee" },
  { key: "review_cycle_id", label: "Cycle", render: (r, lk) => lk.ReviewCycle?.[r.review_cycle_id] || "—" },
  { key: "self_rating", label: "Self" },
  { key: "manager_rating", label: "Manager" },
  { key: "final_rating", label: "Final" },
  { key: "status", label: "Stage", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "employee_email", label: "Employee Email", type: "email", required: true },
  { name: "employee_id", label: "Employee", type: "select", optionsEntity: "Employee", optionsLabelFn: (r) => `${r.first_name} ${r.last_name}` },
  { name: "review_cycle_id", label: "Review Cycle", type: "select", optionsEntity: "ReviewCycle", optionsLabel: "name", required: true },
  { name: "self_rating", label: "Self Rating (1-5)", type: "number" },
  { name: "manager_rating", label: "Manager Rating (1-5)", type: "number" },
  { name: "final_rating", label: "Final Rating (1-5)", type: "number" },
  { name: "status", label: "Stage", type: "select", options: ["self", "manager", "acknowledged", "finalized"].map((v) => ({ value: v, label: v })) },
  { name: "acknowledgement_date", label: "Acknowledgement Date", type: "date" },
];

export default function PerformanceReviews() {
  return (
    <CrudPage entityName="PerformanceReview" title="Performance Review" description="Review workflow: self → manager → acknowledge → finalize"
      columns={columns} formFields={formFields} searchKeys={["employee_email"]}
      defaultValues={{ status: "self" }}
      statusActions={[
        { match: "self", to: "manager", label: "To Manager" },
        { match: "manager", to: "acknowledged", label: "Acknowledge" },
        { match: "acknowledged", to: "finalized", label: "Finalize" },
      ]}
    />
  );
}