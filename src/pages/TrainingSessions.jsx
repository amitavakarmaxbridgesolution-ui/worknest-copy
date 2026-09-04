import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "course_id", label: "Course", render: (r, lk) => lk.Course?.[r.course_id] || "—" },
  { key: "start_date", label: "Start" },
  { key: "end_date", label: "End" },
  { key: "trainer", label: "Trainer" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "course_id", label: "Course", type: "select", optionsEntity: "Course", optionsLabel: "title", required: true },
  { name: "start_date", label: "Start Date", type: "date" },
  { name: "end_date", label: "End Date", type: "date" },
  { name: "trainer", label: "Trainer" },
  { name: "status", label: "Status", type: "select", options: ["scheduled", "ongoing", "completed", "cancelled"].map((v) => ({ value: v, label: v })) },
];

export default function TrainingSessions() {
  return (
    <CrudPage entityName="TrainingSession" title="Training Session" description="Scheduled training sessions"
      columns={columns} formFields={formFields} searchKeys={["trainer"]}
      defaultValues={{ status: "scheduled" }}
      statusActions={[
        { match: "scheduled", to: "ongoing", label: "Start" },
        { match: "ongoing", to: "completed", label: "Complete" },
      ]}
    />
  );
}