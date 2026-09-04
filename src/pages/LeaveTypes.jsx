import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "name", label: "Leave Type" },
  { key: "code", label: "Code" },
  { key: "is_paid", label: "Paid", render: (r) => (r.is_paid ? "Yes" : "No") },
  { key: "carry_forward", label: "Carry Forward", render: (r) => (r.carry_forward ? "Yes" : "No") },
  { key: "default_balance", label: "Default Balance" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "name", label: "Leave Type", required: true },
  { name: "code", label: "Code", required: true },
  { name: "is_paid", label: "Paid", type: "select", options: [{ value: "true", label: "Yes" }, { value: "false", label: "No" }] },
  { name: "carry_forward", label: "Carry Forward", type: "select", options: [{ value: "true", label: "Yes" }, { value: "false", label: "No" }] },
  { name: "default_balance", label: "Default Balance", type: "number" },
  { name: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }] },
];

export default function LeaveTypes() {
  return <CrudPage entityName="LeaveType" title="Leave Type" description="Configurable leave types" columns={columns} formFields={formFields} searchKeys={["name", "code"]} defaultValues={{ status: "active", is_paid: true, carry_forward: false, default_balance: 0 }} />;
}