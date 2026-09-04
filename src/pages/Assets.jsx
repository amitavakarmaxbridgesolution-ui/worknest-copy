import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";

const columns = [
  { key: "name", label: "Asset" },
  { key: "category_id", label: "Category", render: (r, lk) => lk.AssetCategory?.[r.category_id] || "—" },
  { key: "serial", label: "Serial" },
  { key: "value", label: "Value" },
  { key: "warranty_expiry", label: "Warranty Expiry" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

const formFields = [
  { name: "name", label: "Asset Name", required: true },
  { name: "category_id", label: "Category", type: "select", optionsEntity: "AssetCategory", optionsLabel: "name" },
  { name: "vendor_id", label: "Vendor", type: "select", optionsEntity: "Vendor", optionsLabel: "name" },
  { name: "serial", label: "Serial Number", required: true },
  { name: "purchase_date", label: "Purchase Date", type: "date" },
  { name: "value", label: "Value", type: "number" },
  { name: "warranty_expiry", label: "Warranty Expiry", type: "date" },
  { name: "status", label: "Status", type: "select", options: ["available", "allocated", "maintenance", "retired"].map((v) => ({ value: v, label: v })) },
];

export default function Assets() {
  return (
    <CrudPage entityName="Asset" title="Asset" description="Asset inventory and status"
      columns={columns} formFields={formFields} searchKeys={["name", "serial"]}
      defaultValues={{ status: "available" }}
      filters={[{ key: "status", label: "All Status", options: ["available", "allocated", "maintenance", "retired"].map((v) => ({ value: v, label: v })) }]}
    />
  );
}