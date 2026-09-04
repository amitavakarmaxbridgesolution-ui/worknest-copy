import React from "react";
import { useAuth } from "@/lib/AuthContext";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "to_email", label: "To" },
  { key: "to_name", label: "Name" },
  { key: "value", label: "Value", render: (r) => <StatusBadge status={r.value} /> },
  { key: "message", label: "Message" },
  { key: "from_email", label: "From" },
];

const formFields = [
  { name: "to_email", label: "Recipient Email", type: "email", required: true },
  { name: "to_name", label: "Recipient Name" },
  { name: "value", label: "Recognition Value", type: "select", options: ["teamwork", "innovation", "leadership", "excellence", "integrity"].map((v) => ({ value: v, label: v })) },
  { name: "message", label: "Message", type: "textarea", required: true },
];

export default function Kudos() {
  const { user } = useAuth();
  return (
    <CrudPage entityName="Kudos" title="Kudos" description="Recognize colleagues for great work"
      columns={columns} formFields={formFields} searchKeys={["to_email", "to_name"]}
      defaultValues={{ from_email: user?.email, value: "excellence" }}
    />
  );
}