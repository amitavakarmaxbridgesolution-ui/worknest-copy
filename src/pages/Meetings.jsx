import React from "react";
import { useAuth } from "@/lib/AuthContext";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "title", label: "Meeting" },
  { key: "start_time", label: "Start" },
  { key: "end_time", label: "End" },
  { key: "location", label: "Location" },
  { key: "participants", label: "Participants" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "title", label: "Title", required: true },
  { name: "start_time", label: "Start", type: "datetime-local", required: true },
  { name: "end_time", label: "End", type: "datetime-local" },
  { name: "location", label: "Location" },
  { name: "participants", label: "Participants (emails, comma separated)" },
  { name: "agenda", label: "Agenda", type: "textarea" },
  { name: "minutes", label: "Minutes", type: "textarea" },
  { name: "status", label: "Status", type: "select", options: ["scheduled", "completed", "cancelled"].map((v) => ({ value: v, label: v })) },
];

export default function Meetings() {
  const { user } = useAuth();
  return (
    <CrudPage entityName="Meeting" title="Meeting" description="Schedule meetings, capture attendance and minutes"
      columns={columns} formFields={formFields} searchKeys={["title", "location"]}
      defaultValues={{ organizer_email: user?.email, status: "scheduled" }}
      statusActions={[
        { match: "scheduled", to: "completed", label: "Complete" },
        { match: "scheduled", to: "cancelled", label: "Cancel", variant: "destructive" },
      ]}
    />
  );
}