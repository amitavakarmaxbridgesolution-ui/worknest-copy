import React from "react";
import CrudPage from "@/components/CrudPage";

const columns = [
  { key: "user_email", label: "User" },
  { key: "module", label: "Module" },
  { key: "action", label: "Action" },
  { key: "entity", label: "Entity" },
  { key: "entity_id", label: "Entity ID" },
  { key: "old_value", label: "Old Value" },
  { key: "new_value", label: "New Value" },
  { key: "created_date", label: "Time", render: (r) => (r.created_date ? new Date(r.created_date).toLocaleString() : "—") },
];

export default function AuditLogs() {
  return (
    <CrudPage
      entityName="AuditLog"
      title="Audit Log"
      description="Change history and compliance evidence"
      columns={columns}
      formFields={[]}
      searchKeys={["user_email", "module", "action", "entity"]}
      readOnly
    />
  );
}