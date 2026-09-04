import React from "react";
import { useAuth } from "@/lib/AuthContext";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "employee_email", label: "Employee" },
  { key: "course_id", label: "Course", render: (r, lk) => lk.Course?.[r.course_id] || "—" },
  { key: "request_date", label: "Request Date" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "employee_email", label: "Employee Email", type: "email", required: true },
  { name: "course_id", label: "Course", type: "select", optionsEntity: "Course", optionsLabel: "title", required: true },
  { name: "request_date", label: "Request Date", type: "date" },
  { name: "status", label: "Status", type: "select", options: ["pending", "approved", "rejected", "enrolled"].map((v) => ({ value: v, label: v })) },
];

export default function TrainingRequests() {
  const { user } = useAuth();
  return (
    <CrudPage entityName="TrainingRequest" title="Training Request" description="Training requests and approvals"
      columns={columns} formFields={formFields} searchKeys={["employee_email"]}
      defaultValues={{ employee_email: user?.email, status: "pending" }}
      statusActions={[
        { match: "pending", to: "approved", label: "Approve" },
        { match: "pending", to: "rejected", label: "Reject", variant: "destructive" },
        { match: "approved", to: "enrolled", label: "Enroll" },
      ]}
    />
  );
}