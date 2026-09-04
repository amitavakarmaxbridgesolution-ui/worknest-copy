import React from "react";
import { useAuth } from "@/lib/AuthContext";
import CrudPage from "@/components/CrudPage";

const columns = [
  { key: "from_employee_email", label: "From" },
  { key: "type", label: "Feedback Type" },
  { key: "rating", label: "Rating (1-5)" },
  { key: "comment", label: "Comment" },
];

const formFields = [
  { name: "review_id", label: "Review", type: "select", optionsEntity: "PerformanceReview", optionsLabel: "employee_email" },
  { name: "from_employee_email", label: "From Email", type: "email", required: true },
  { name: "type", label: "Feedback Type", type: "select", required: true, options: ["manager", "peer", "subordinate", "stakeholder"].map((v) => ({ value: v, label: v })) },
  { name: "rating", label: "Rating (1-5)", type: "number" },
  { name: "comment", label: "Comment", type: "textarea" },
];

export default function Feedback() {
  const { user } = useAuth();
  return <CrudPage entityName="Feedback" title="Feedback" description="360 feedback" columns={columns} formFields={formFields} searchKeys={["from_employee_email"]} defaultValues={{ from_employee_email: user?.email }} />;
}