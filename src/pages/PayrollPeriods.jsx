import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "name", label: "Period" },
  { key: "month", label: "Month" },
  { key: "year", label: "Year" },
  { key: "start_date", label: "Start" },
  { key: "end_date", label: "End" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "name", label: "Period Name", required: true },
  { name: "month", label: "Month", required: true },
  { name: "year", label: "Year", type: "number", required: true },
  { name: "start_date", label: "Start Date", type: "date" },
  { name: "end_date", label: "End Date", type: "date" },
  { name: "status", label: "Status", type: "select", options: ["open", "processing", "approved", "published", "locked"].map((v) => ({ value: v, label: v })) },
];

export default function PayrollPeriods() {
  return (
    <CrudPage entityName="PayrollPeriod" title="Payroll Period" description="Payroll cycles"
      columns={columns} formFields={formFields} searchKeys={["name", "month"]}
      defaultValues={{ status: "open" }}
      statusActions={[
        { match: "open", to: "processing", label: "Process" },
        { match: "processing", to: "approved", label: "Approve" },
        { match: "approved", to: "published", label: "Publish" },
        { match: "published", to: "locked", label: "Lock" },
      ]}
    />
  );
}