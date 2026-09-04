import React from "react";
import CrudPage from "@/components/CrudPage";

const columns = [
  { key: "name", label: "Holiday" },
  { key: "branch_id", label: "Branch", render: (r, lk) => lk.Branch?.[r.branch_id] || "All" },
  { key: "date", label: "Date" },
  { key: "type", label: "Type" },
];

const formFields = [
  { name: "branch_id", label: "Branch", type: "select", optionsEntity: "Branch", optionsLabel: "branch_name" },
  { name: "name", label: "Holiday Name", required: true },
  { name: "date", label: "Date", type: "date", required: true },
  { name: "type", label: "Type", type: "select", options: [{ value: "national", label: "National" }, { value: "regional", label: "Regional" }, { value: "company", label: "Company" }] },
];

export default function Holidays() {
  return <CrudPage entityName="Holiday" title="Holiday" description="Branch and company holidays" columns={columns} formFields={formFields} searchKeys={["name"]} defaultValues={{ type: "company" }} />;
}