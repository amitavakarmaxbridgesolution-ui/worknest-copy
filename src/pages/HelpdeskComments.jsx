import React from "react";
import { useAuth } from "@/lib/AuthContext";
import CrudPage from "@/components/CrudPage";

const columns = [
  { key: "ticket_id", label: "Ticket", render: (r, lk) => lk.HelpdeskTicket?.[r.ticket_id] || "—" },
  { key: "author_email", label: "Author" },
  { key: "comment", label: "Comment" },
  { key: "is_internal", label: "Internal", render: (r) => (r.is_internal ? "Yes" : "No") },
];

const formFields = [
  { name: "ticket_id", label: "Ticket", type: "select", optionsEntity: "HelpdeskTicket", optionsLabel: "subject", required: true },
  { name: "comment", label: "Comment", type: "textarea", required: true },
  { name: "is_internal", label: "Internal Note", type: "select", options: [{ value: "true", label: "Yes" }, { value: "false", label: "No" }] },
];

export default function HelpdeskComments() {
  const { user } = useAuth();
  return (
    <CrudPage entityName="HelpdeskComment" title="Ticket Comment" description="Comments on helpdesk tickets"
      columns={columns} formFields={formFields} searchKeys={["author_email"]}
      defaultValues={{ author_email: user?.email, is_internal: false }}
    />
  );
}