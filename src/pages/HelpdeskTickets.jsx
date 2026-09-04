import React from "react";
import { useAuth } from "@/lib/AuthContext";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "subject", label: "Ticket" },
  { key: "category_id", label: "Category", render: (r, lk) => lk.HelpdeskCategory?.[r.category_id] || "—" },
  { key: "requester_email", label: "Requester" },
  { key: "priority", label: "Priority", render: (r) => <StatusBadge status={r.priority} /> },
  { key: "assigned_to", label: "Assigned To" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "requester_email", label: "Requester Email", type: "email", required: true },
  { name: "subject", label: "Subject", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "category_id", label: "Category", type: "select", optionsEntity: "HelpdeskCategory", optionsLabel: "name" },
  { name: "priority", label: "Priority", type: "select", options: ["low", "medium", "high", "urgent"].map((v) => ({ value: v, label: v })) },
  { name: "assigned_to", label: "Assigned To (email)" },
  { name: "sla_due", label: "SLA Due", type: "datetime-local" },
  { name: "escalated", label: "Escalated", type: "select", options: [{ value: "true", label: "Yes" }, { value: "false", label: "No" }] },
  { name: "status", label: "Status", type: "select", options: ["open", "assigned", "in_progress", "pending", "resolved", "closed"].map((v) => ({ value: v, label: v })) },
];

export default function HelpdeskTickets() {
  const { user } = useAuth();
  return (
    <CrudPage entityName="HelpdeskTicket" title="Helpdesk Ticket" description="Support tickets with SLA, assignment and escalation"
      columns={columns} formFields={formFields} searchKeys={["subject", "requester_email"]}
      defaultValues={{ requester_email: user?.email, status: "open", priority: "medium", escalated: false }}
      filters={[
        { key: "status", label: "All Status", options: ["open", "assigned", "in_progress", "pending", "resolved", "closed"].map((v) => ({ value: v, label: v })) },
        { key: "priority", label: "All Priority", options: ["low", "medium", "high", "urgent"].map((v) => ({ value: v, label: v })) },
      ]}
      statusActions={[
        { match: "open", to: "assigned", label: "Assign" },
        { match: "assigned", to: "in_progress", label: "Start" },
        { match: "in_progress", to: "pending", label: "Pending" },
        { match: "in_progress", to: "resolved", label: "Resolve" },
        { match: "pending", to: "in_progress", label: "Resume" },
        { match: "resolved", to: "closed", label: "Close" },
        { match: "resolved", to: "open", label: "Reopen" },
      ]}
    />
  );
}