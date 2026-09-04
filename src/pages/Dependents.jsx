import React from "react";
import { useAuth } from "@/lib/AuthContext";
import CrudPage from "@/components/CrudPage";

const columns = [
  { key: "name", label: "Dependent" },
  { key: "relationship", label: "Relationship" },
  { key: "date_of_birth", label: "Date of Birth" },
];

const formFields = [
  { name: "employee_email", label: "Employee Email", type: "email", required: true },
  { name: "name", label: "Dependent Name", required: true },
  { name: "relationship", label: "Relationship", type: "select", required: true, options: ["spouse", "child", "parent", "sibling", "other"].map((v) => ({ value: v, label: v })) },
  { name: "date_of_birth", label: "Date of Birth", type: "date" },
];

export default function Dependents() {
  const { user } = useAuth();
  return <CrudPage entityName="Dependent" title="Dependent" description="Employee dependents" columns={columns} formFields={formFields} searchKeys={["name"]} defaultValues={{ employee_email: user?.email }} />;
}