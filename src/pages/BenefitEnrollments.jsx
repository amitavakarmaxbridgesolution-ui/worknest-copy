import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "employee_email", label: "Employee" },
  { key: "benefit_plan_id", label: "Plan", render: (r, lk) => lk.BenefitPlan?.[r.benefit_plan_id] || "—" },
  { key: "enrolled_date", label: "Enrolled Date" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "employee_email", label: "Employee Email", type: "email", required: true },
  { name: "employee_id", label: "Employee", type: "select", optionsEntity: "Employee", optionsLabelFn: (r) => `${r.first_name} ${r.last_name}` },
  { name: "benefit_plan_id", label: "Benefit Plan", type: "select", optionsEntity: "BenefitPlan", optionsLabel: "name", required: true },
  { name: "enrolled_date", label: "Enrolled Date", type: "date" },
  { name: "status", label: "Status", type: "select", options: [{ value: "enrolled", label: "Enrolled" }, { value: "cancelled", label: "Cancelled" }] },
];

export default function BenefitEnrollments() {
  return <CrudPage entityName="BenefitEnrollment" title="Benefit Enrollment" description="Employee benefit enrollments" columns={columns} formFields={formFields} searchKeys={["employee_email"]} defaultValues={{ status: "enrolled" }} />;
}