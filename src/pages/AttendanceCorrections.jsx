import React from "react";
import { useAuth } from "@/lib/AuthContext";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "employee_email", label: "Employee" },
  { key: "reason", label: "Reason" },
  { key: "requested_check_in", label: "Req. Check In" },
  { key: "requested_check_out", label: "Req. Check Out" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "employee_email", label: "Employee Email", type: "email", required: true },
  { name: "attendance_id", label: "Attendance Record", type: "select", optionsEntity: "Attendance", optionsLabel: "date" },
  { name: "requested_check_in", label: "Requested Check In", type: "text", placeholder: "datetime" },
  { name: "requested_check_out", label: "Requested Check Out", type: "text", placeholder: "datetime" },
  { name: "reason", label: "Reason", type: "textarea", required: true },
];

export default function AttendanceCorrections() {
  const { user } = useAuth();
  return (
    <CrudPage entityName="AttendanceCorrection" title="Attendance Correction" description="Correction requests and approvals"
      columns={columns} formFields={formFields} searchKeys={["employee_email", "reason"]}
      defaultValues={{ employee_email: user?.email, status: "pending" }}
      statusActions={[
        { match: "pending", to: "approved", label: "Approve" },
        { match: "pending", to: "rejected", label: "Reject", variant: "destructive" },
      ]}
    />
  );
}