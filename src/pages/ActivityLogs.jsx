import React from "react";
import CrudPage from "@/components/CrudPage";

const columns = [
  { key: "user_email", label: "User" },
  { key: "module", label: "Module" },
  { key: "action", label: "Action" },
  { key: "entity", label: "Entity" },
  { key: "entity_id", label: "Entity ID" },
  { key: "created_date", label: "Time", render: (r) => (r.created_date ? new Date(r.created_date).toLocaleString() : "—") },
];

export default function ActivityLogs() {
  return (
    <CrudPage
      entityName="ActivityLog"
      title="Activity Log"
      description="User activity history"
      columns={columns}
      formFields={[]}
      searchKeys={["user_email", "module", "action"]}
      readOnly
    />
  );
}