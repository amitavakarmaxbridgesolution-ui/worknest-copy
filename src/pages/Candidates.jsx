import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "name", label: "Candidate" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "source", label: "Source" },
  { key: "current_status", label: "Status", render: (r) => <StatusBadge status={r.current_status} /> },
];

const pipeline = [
  { match: "applied", to: "shortlisted", label: "Shortlist" },
  { match: "shortlisted", to: "interview", label: "Interview" },
  { match: "interview", to: "selected", label: "Select" },
  { match: "selected", to: "offer", label: "Offer" },
  { match: "offer", to: "hired", label: "Hire" },
  { match: "applied", to: "rejected", label: "Reject", variant: "destructive" },
  { match: "shortlisted", to: "rejected", label: "Reject", variant: "destructive" },
  { match: "interview", to: "rejected", label: "Reject", variant: "destructive" },
];

const formFields = [
  { name: "name", label: "Full Name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel" },
  { name: "source", label: "Source", type: "select", options: ["Referral", "Agency", "Job Portal", "Walk-in", "Other"].map((v) => ({ value: v, label: v })) },
  { name: "resume_url", label: "Resume URL" },
  { name: "current_status", label: "Status", type: "select", options: ["applied", "shortlisted", "interview", "selected", "offer", "hired", "rejected"].map((v) => ({ value: v, label: v })) },
  { name: "notes", label: "Notes", type: "textarea" },
];

export default function Candidates() {
  return (
    <CrudPage entityName="Candidate" title="Candidate" description="Recruitment candidate pipeline"
      columns={columns} formFields={formFields} searchKeys={["name", "email"]}
      defaultValues={{ current_status: "applied", source: "Job Portal" }}
      filters={[{ key: "current_status", label: "All Status", options: ["applied", "shortlisted", "interview", "selected", "offer", "hired", "rejected"].map((v) => ({ value: v, label: v })) }]}
      statusActions={pipeline}
    />
  );
}