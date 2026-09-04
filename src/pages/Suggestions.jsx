import React from "react";
import { useAuth } from "@/lib/AuthContext";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "category", label: "Category" },
  { key: "message", label: "Suggestion" },
  { key: "anonymous", label: "Anonymous", render: (r) => (r.anonymous ? "Yes" : "No") },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
  { key: "response", label: "Response" },
];

const formFields = [
  { name: "employee_email", label: "Employee Email", type: "email" },
  { name: "category", label: "Category", type: "select", options: ["Process", "Facilities", "Technology", "Culture", "Other"].map((v) => ({ value: v, label: v })) },
  { name: "message", label: "Suggestion", type: "textarea", required: true },
  { name: "anonymous", label: "Submit Anonymously", type: "select", options: [{ value: "true", label: "Yes" }, { value: "false", label: "No" }] },
  { name: "status", label: "Status", type: "select", options: ["open", "under_review", "implemented", "rejected"].map((v) => ({ value: v, label: v })) },
  { name: "response", label: "Response", type: "textarea" },
];

export default function Suggestions() {
  const { user } = useAuth();
  return (
    <CrudPage entityName="Suggestion" title="Suggestion" description="Employee suggestions and responses"
      columns={columns} formFields={formFields} searchKeys={["category", "message"]}
      defaultValues={{ employee_email: user?.email, status: "open", anonymous: false, category: "Process" }}
      statusActions={[
        { match: "open", to: "under_review", label: "Review" },
        { match: "under_review", to: "implemented", label: "Implement" },
        { match: "under_review", to: "rejected", label: "Reject", variant: "destructive" },
      ]}
    />
  );
}