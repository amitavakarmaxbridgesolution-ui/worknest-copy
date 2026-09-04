import React from "react";
import CrudPage from "@/components/CrudPage";

const columns = [
  { key: "employee_email", label: "Employee" },
  { key: "leave_type_id", label: "Leave Type", render: (r, lk) => lk.LeaveType?.[r.leave_type_id] || "—" },
  { key: "balance", label: "Balance" },
  { key: "used", label: "Used" },
  { key: "carried", label: "Carried" },
];

const formFields = [
  { name: "employee_email", label: "Employee Email", type: "email", required: true },
  { name: "employee_id", label: "Employee", type: "select", optionsEntity: "Employee", optionsLabelFn: (r) => `${r.first_name} ${r.last_name}` },
  { name: "leave_type_id", label: "Leave Type", type: "select", optionsEntity: "LeaveType", optionsLabel: "name", required: true },
  { name: "balance", label: "Balance", type: "number" },
  { name: "used", label: "Used", type: "number" },
  { name: "carried", label: "Carried", type: "number" },
];

export default function LeaveBalances() {
  return <CrudPage entityName="LeaveBalance" title="Leave Balance" description="Employee leave balances" columns={columns} formFields={formFields} searchKeys={["employee_email"]} defaultValues={{ balance: 0, used: 0, carried: 0 }} />;
}