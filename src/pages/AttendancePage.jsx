import React from "react";
import { useAuth } from "@/lib/AuthContext";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "employee_email", label: "Employee" },
  { key: "date", label: "Date" },
  { key: "check_in", label: "Check In", render: (r) => (r.check_in ? new Date(r.check_in).toLocaleTimeString() : "—") },
  { key: "check_out", label: "Check Out", render: (r) => (r.check_out ? new Date(r.check_out).toLocaleTimeString() : "—") },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
  { key: "overtime_hours", label: "OT (hrs)" },
];

const formFields = [
  { name: "employee_email", label: "Employee Email", type: "email", required: true },
  { name: "date", label: "Date", type: "date", required: true },
  { name: "check_in", label: "Check In", type: "text", placeholder: "datetime" },
  { name: "check_out", label: "Check Out", type: "text", placeholder: "datetime" },
  { name: "status", label: "Status", type: "select", options: ["present", "absent", "leave", "late", "half-day", "overtime"].map((v) => ({ value: v, label: v })) },
  { name: "shift_id", label: "Shift", type: "select", optionsEntity: "Shift", optionsLabel: "name" },
  { name: "overtime_hours", label: "Overtime Hours", type: "number" },
  { name: "notes", label: "Notes", type: "textarea" },
];

export default function AttendancePage() {
  const { user } = useAuth();
  return (
    <CrudPage entityName="Attendance" title="Attendance" description="Daily attendance records"
      columns={columns} formFields={formFields} searchKeys={["employee_email", "date"]}
      defaultValues={{ employee_email: user?.email, status: "present" }}
      filters={[{ key: "status", label: "All Status", options: ["present", "absent", "leave", "late", "half-day", "overtime"].map((v) => ({ value: v, label: v })) }]}
    />
  );
}