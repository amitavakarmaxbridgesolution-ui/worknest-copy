import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "leave_type_id", label: "Leave Type", render: (r, lk) => lk.LeaveType?.[r.leave_type_id] || "—" },
  { key: "branch_id", label: "Branch", render: (r, lk) => lk.Branch?.[r.branch_id] || "All" },
  { key: "accrual_rate", label: "Accrual Rate" },
  { key: "max_per_year", label: "Max / Year" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "leave_type_id", label: "Leave Type", type: "select", optionsEntity: "LeaveType", optionsLabel: "name", required: true },
  { name: "branch_id", label: "Branch", type: "select", optionsEntity: "Branch", optionsLabel: "branch_name" },
  { name: "accrual_rate", label: "Accrual Rate", type: "number" },
  { name: "max_per_year", label: "Max Per Year", type: "number" },
  { name: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }] },
];

export default function LeavePolicies() {
  return <CrudPage entityName="LeavePolicy" title="Leave Policy" description="Leave accrual policies per branch" columns={columns} formFields={formFields} searchKeys={[]} defaultValues={{ status: "active" }} />;
}