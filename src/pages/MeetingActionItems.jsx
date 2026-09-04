import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "meeting_id", label: "Meeting", render: (r, lk) => lk.Meeting?.[r.meeting_id] || "—" },
  { key: "assignee_email", label: "Assignee" },
  { key: "description", label: "Action Item" },
  { key: "due_date", label: "Due" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "meeting_id", label: "Meeting", type: "select", optionsEntity: "Meeting", optionsLabel: "title", required: true },
  { name: "assignee_email", label: "Assignee Email", type: "email" },
  { name: "description", label: "Action Item", required: true, type: "textarea" },
  { name: "due_date", label: "Due Date", type: "date" },
  { name: "status", label: "Status", type: "select", options: [{ value: "open", label: "Open" }, { value: "done", label: "Done" }] },
];

export default function MeetingActionItems() {
  return (
    <CrudPage entityName="MeetingActionItem" title="Action Item" description="Meeting action items and tracking"
      columns={columns} formFields={formFields} searchKeys={["assignee_email"]}
      defaultValues={{ status: "open" }}
      statusActions={[{ match: "open", to: "done", label: "Mark Done" }]}
    />
  );
}