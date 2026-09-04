import React from "react";
import CrudPage from "@/components/CrudPage";
import StatusBadge from "@/components/StatusBadge";
import StructureForm from "@/components/payroll/StructureForm";

const columns = [
  { key: "name", label: "Structure" },
  { key: "base_salary", label: "Default Basic", render: (r) => Number(r.base_salary || 0).toLocaleString() },
  {
    key: "components",
    label: "Components",
    render: (r) => {
      try {
        const arr = typeof r.components === "string" ? JSON.parse(r.components) : r.components;
        const e = (arr || []).filter((c) => c.type !== "deduction").length;
        const d = (arr || []).filter((c) => c.type === "deduction").length;
        return `${e} earnings · ${d} deductions`;
      } catch {
        return "—";
      }
    },
  },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
];

export default function SalaryStructures() {
  return (
    <CrudPage
      entityName="SalaryStructure"
      title="Salary Structure"
      description="Configurable salary structure templates"
      columns={columns}
      searchKeys={["name"]}
      customForm={StructureForm}
      formMaxWidth="max-w-4xl"
      defaultValues={{ status: "active", components: "[]" }}
    />
  );
}