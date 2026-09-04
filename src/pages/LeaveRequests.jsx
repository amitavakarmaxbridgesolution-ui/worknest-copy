import React from "react";
import { useAuth } from "@/lib/AuthContext";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "employee_email", label: "Employee" },
  { key: "leave_type_id", label: "Leave Type", render: (r, lk) => lk.LeaveType?.[r.leave_type_id] || "—" },
  { key: "from_date", label: "From" },
  { key: "to_date", label: "To" },
  { key: "days", label: "Days" },
  { key: "reason", label: "Reason" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "employee_email", label: "Employee Email", type: "email", required: true },
  { name: "leave_type_id", label: "Leave Type", type: "select", optionsEntity: "LeaveType", optionsLabel: "name", required: true },
  { name: "from_date", label: "From Date", type: "date", required: true },
  { name: "to_date", label: "To Date", type: "date", required: true },
  { name: "days", label: "Days", type: "number" },
  { name: "reason", label: "Reason", type: "textarea" },
];

export default function LeaveRequests() {
  const { user } = useAuth();
  return (
    <CrudPage entityName="LeaveRequest" title="Leave Request" description="Leave applications and approvals"
      columns={columns} formFields={formFields} searchKeys={["employee_email", "reason"]}
      defaultValues={{ employee_email: user?.email, status: "pending" }}
      filters={[{ key: "status", label: "All Status", options: ["pending", "approved", "rejected", "cancelled"].map((v) => ({ value: v, label: v })) }]}
      statusActions={[
        { match: "pending", to: "approved", label: "Approve" },
        { match: "pending", to: "rejected", label: "Reject", variant: "destructive" },
        { match: "pending", to: "cancelled", label: "Cancel", variant: "destructive" },
      ]}
    />
  );
}