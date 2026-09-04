import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const empLabel = (r) => `${r.first_name || ""} ${r.last_name || ""}`.trim() || r.id;

const columns = [
  { key: "employee_code", label: "Code" },
  { key: "full_name", label: "Name", render: (r) => `${r.first_name || ""} ${r.last_name || ""}`.trim() || "—" },
  { key: "work_email", label: "Work Email" },
  { key: "branch_id", label: "Branch", render: (r, lk) => lk.Branch?.[r.branch_id] || "—" },
  { key: "employment_status", label: "Employment", render: (r) => <StatusBadge status={r.employment_status} /> },
  { key: "role", label: "Role", render: (r) => <StatusBadge status={r.role} /> },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "employee_code", label: "Employee Code", required: true },
  { name: "first_name", label: "First Name", required: true },
  { name: "middle_name", label: "Middle Name" },
  { name: "last_name", label: "Last Name", required: true },
  { name: "preferred_name", label: "Preferred Name" },
  { name: "date_of_birth", label: "Date of Birth", type: "date" },
  {
    name: "gender", label: "Gender", type: "select",
    options: [{ value: "Male", label: "Male" }, { value: "Female", label: "Female" }, { value: "Other", label: "Other" }],
  },
  { name: "personal_email", label: "Personal Email", type: "email" },
  { name: "work_email", label: "Work Email", type: "email" },
  { name: "phone", label: "Phone", type: "tel" },
  { name: "emergency_contact", label: "Emergency Contact", type: "tel" },
  { name: "date_of_joining", label: "Date of Joining", type: "date" },
  {
    name: "employment_status", label: "Employment Status", type: "select",
    options: [
      { value: "Active", label: "Active" },
      { value: "Onboarding", label: "Onboarding" },
      { value: "Resigned", label: "Resigned" },
      { value: "Terminated", label: "Terminated" },
    ],
  },
  {
    name: "employment_type", label: "Employment Type", type: "select",
    options: [
      { value: "Full-time", label: "Full-time" },
      { value: "Part-time", label: "Part-time" },
      { value: "Contract", label: "Contract" },
      { value: "Intern", label: "Intern" },
    ],
  },
  { name: "branch_id", label: "Branch", type: "select", optionsEntity: "Branch", optionsLabel: "branch_name" },
  { name: "department_id", label: "Department", type: "select", optionsEntity: "Department", optionsLabel: "name" },
  { name: "team_id", label: "Team", type: "select", optionsEntity: "Team", optionsLabel: "name" },
  { name: "designation_id", label: "Designation", type: "select", optionsEntity: "Designation", optionsLabel: "name" },
  { name: "job_grade_id", label: "Job Grade", type: "select", optionsEntity: "JobGrade", optionsLabel: "grade_name" },
  { name: "manager_id", label: "Manager", type: "select", optionsEntity: "Employee", optionsLabelFn: empLabel },
  {
    name: "role", label: "Role", type: "select",
    options: [
      { value: "Super Admin", label: "Super Admin" },
      { value: "HR Manager", label: "HR Manager" },
      { value: "Employee", label: "Employee" },
    ],
  },
  { name: "profile_photo", label: "Profile Photo URL" },
  {
    name: "status", label: "Status", type: "select",
    options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }],
  },
];

export default function Employees() {
  return (
    <CrudPage
      entityName="Employee"
      title="Employee"
      description="Manage employee records"
      columns={columns}
      formFields={formFields}
      searchKeys={["employee_code", "first_name", "last_name", "work_email"]}
      defaultValues={{ status: "active", employment_status: "Active", employment_type: "Full-time", role: "Employee" }}
    />
  );
}