import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "job_post_id", label: "Job Post", render: (r, lk) => lk.JobPost?.[r.job_post_id] || "—" },
  { key: "candidate_id", label: "Candidate", render: (r, lk) => lk.Candidate?.[r.candidate_id] || "—" },
  { key: "applicant_email", label: "Applicant" },
  { key: "applied_date", label: "Applied" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const pipeline = [
  { match: "applied", to: "shortlisted", label: "Shortlist" },
  { match: "shortlisted", to: "interview", label: "Interview" },
  { match: "interview", to: "selected", label: "Select" },
  { match: "selected", to: "offer", label: "Offer" },
  { match: "offer", to: "hired", label: "Hire" },
  { match: "applied", to: "rejected", label: "Reject", variant: "destructive" },
];

const formFields = [
  { name: "job_post_id", label: "Job Post", type: "select", optionsEntity: "JobPost", optionsLabel: "title", required: true },
  { name: "candidate_id", label: "Candidate", type: "select", optionsEntity: "Candidate", optionsLabel: "name" },
  { name: "applicant_email", label: "Applicant Email", type: "email" },
  { name: "applied_date", label: "Applied Date", type: "date" },
  { name: "interviews", label: "Interviews (JSON)", type: "textarea" },
  { name: "offer", label: "Offer (JSON)", type: "textarea" },
  { name: "status", label: "Status", type: "select", options: ["applied", "shortlisted", "interview", "selected", "offer", "hired", "rejected"].map((v) => ({ value: v, label: v })) },
];

export default function Applications() {
  return (
    <CrudPage entityName="Application" title="Application" description="Job applications and pipeline"
      columns={columns} formFields={formFields} searchKeys={["applicant_email"]}
      defaultValues={{ status: "applied" }}
      statusActions={pipeline}
    />
  );
}