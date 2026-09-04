import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "name", label: "Policy" },
  { key: "branch_id", label: "Branch", render: (r, lk) => lk.Branch?.[r.branch_id] || "—" },
  { key: "late_grace_minutes", label: "Late Grace (min)" },
  { key: "half_day_hours", label: "Half-day Hours" },
  { key: "overtime_threshold_hours", label: "OT Threshold (hrs)" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "branch_id", label: "Branch", type: "select", optionsEntity: "Branch", optionsLabel: "branch_name", required: true },
  { name: "name", label: "Policy Name", required: true },
  { name: "late_grace_minutes", label: "Late Grace Minutes", type: "number" },
  { name: "half_day_hours", label: "Half-day Hours", type: "number" },
  { name: "overtime_threshold_hours", label: "Overtime Threshold (hrs)", type: "number" },
  { name: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }] },
];

export default function AttendancePolicies() {
  return <CrudPage entityName="AttendancePolicy" title="Attendance Policy" description="Branch attendance policies" columns={columns} formFields={formFields} searchKeys={["name"]} defaultValues={{ status: "active" }} />;
}