import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "name", label: "Shift" },
  { key: "branch_id", label: "Branch", render: (r, lk) => lk.Branch?.[r.branch_id] || "—" },
  { key: "start_time", label: "Start" },
  { key: "end_time", label: "End" },
  { key: "grace_minutes", label: "Grace (min)" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "branch_id", label: "Branch", type: "select", optionsEntity: "Branch", optionsLabel: "branch_name", required: true },
  { name: "name", label: "Shift Name", required: true },
  { name: "start_time", label: "Start Time", placeholder: "09:00" },
  { name: "end_time", label: "End Time", placeholder: "18:00" },
  { name: "grace_minutes", label: "Grace Minutes", type: "number" },
  { name: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }] },
];

export default function Shifts() {
  return <CrudPage entityName="Shift" title="Shift" description="Work shifts across branches" columns={columns} formFields={formFields} searchKeys={["name"]} defaultValues={{ status: "active", grace_minutes: 15 }} />;
}