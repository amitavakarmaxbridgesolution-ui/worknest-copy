import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "user_email", label: "User" },
  { key: "ip_address", label: "IP Address" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
  { key: "created_date", label: "Time", render: (r) => (r.created_date ? new Date(r.created_date).toLocaleString() : "—") },
];

export default function LoginLogs() {
  return (
    <CrudPage
      entityName="LoginLog"
      title="Login Log"
      description="User login history"
      columns={columns}
      formFields={[]}
      searchKeys={["user_email", "ip_address"]}
      readOnly
    />
  );
}