import React from "react";
import { useAuth } from "@/lib/AuthContext";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "employee_email", label: "Employee" },
  { key: "asset_id", label: "Asset", render: (r, lk) => lk.Asset?.[r.asset_id] || "—" },
  { key: "request_date", label: "Request Date" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "employee_email", label: "Employee Email", type: "email", required: true },
  { name: "employee_id", label: "Employee", type: "select", optionsEntity: "Employee", optionsLabelFn: (r) => `${r.first_name} ${r.last_name}` },
  { name: "asset_id", label: "Asset", type: "select", optionsEntity: "Asset", optionsLabel: "name", required: true },
  { name: "request_date", label: "Request Date", type: "date" },
  { name: "status", label: "Status", type: "select", options: ["pending", "approved", "rejected", "allocated", "returned"].map((v) => ({ value: v, label: v })) },
];

export default function AssetRequests() {
  const { user } = useAuth();
  return (
    <CrudPage entityName="AssetRequest" title="Asset Request" description="Asset requests, allocation and return"
      columns={columns} formFields={formFields} searchKeys={["employee_email"]}
      defaultValues={{ employee_email: user?.email, status: "pending" }}
      statusActions={[
        { match: "pending", to: "approved", label: "Approve" },
        { match: "pending", to: "rejected", label: "Reject", variant: "destructive" },
        { match: "approved", to: "allocated", label: "Allocate" },
        { match: "allocated", to: "returned", label: "Mark Returned" },
      ]}
    />
  );
}