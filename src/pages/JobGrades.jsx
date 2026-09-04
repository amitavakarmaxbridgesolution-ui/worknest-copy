import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "grade_code", label: "Code" },
  { key: "grade_name", label: "Grade" },
  { key: "minimum_salary", label: "Min Salary" },
  { key: "maximum_salary", label: "Max Salary" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "grade_code", label: "Grade Code", required: true },
  { name: "grade_name", label: "Grade Name", required: true },
  { name: "minimum_salary", label: "Minimum Salary", type: "number" },
  { name: "maximum_salary", label: "Maximum Salary", type: "number" },
  { name: "description", label: "Description", type: "textarea" },
  {
    name: "status", label: "Status", type: "select",
    options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }],
  },
];

export default function JobGrades() {
  return (
    <CrudPage
      entityName="JobGrade"
      title="Job Grade"
      description="Manage salary and career grades"
      columns={columns}
      formFields={formFields}
      searchKeys={["grade_code", "grade_name"]}
      defaultValues={{ status: "active" }}
    />
  );
}