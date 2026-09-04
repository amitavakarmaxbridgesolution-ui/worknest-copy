import React from "react";
import { useAuth } from "@/lib/AuthContext";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "title", label: "Announcement" },
  { key: "audience", label: "Audience", render: (r) => <StatusBadge status={r.audience} /> },
  { key: "published_at", label: "Published" },
  { key: "expires_at", label: "Expires" },
  { key: "read_count", label: "Reads" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "title", label: "Title", required: true },
  { name: "body", label: "Body", type: "textarea", required: true },
  { name: "audience", label: "Audience", type: "select", options: [{ value: "all", label: "All" }, { value: "branch", label: "Branch" }, { value: "department", label: "Department" }] },
  { name: "branch_id", label: "Branch", type: "select", optionsEntity: "Branch", optionsLabel: "name" },
  { name: "department_id", label: "Department", type: "select", optionsEntity: "Department", optionsLabel: "name" },
  { name: "published_at", label: "Publish At", type: "datetime-local" },
  { name: "expires_at", label: "Expires At", type: "datetime-local" },
  { name: "status", label: "Status", type: "select", options: ["draft", "published", "scheduled", "expired"].map((v) => ({ value: v, label: v })) },
];

export default function Announcements() {
  const { user } = useAuth();
  return (
    <CrudPage entityName="Announcement" title="Announcement" description="Draft, publish, schedule, target and track announcements"
      columns={columns} formFields={formFields} searchKeys={["title"]}
      defaultValues={{ author_email: user?.email, status: "draft", audience: "all", read_count: 0 }}
      statusActions={[
        { match: "draft", to: "published", label: "Publish" },
        { match: "draft", to: "scheduled", label: "Schedule" },
        { match: "scheduled", to: "published", label: "Publish Now" },
        { match: "published", to: "expired", label: "Expire", variant: "destructive" },
      ]}
    />
  );
}