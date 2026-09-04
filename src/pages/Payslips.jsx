import React from "react";
import CrudPage from "@/components/CrudPage";

const columns = [
  { key: "employee_email", label: "Employee" },
  { key: "payroll_period_id", label: "Period", render: (r, lk) => lk.PayrollPeriod?.[r.payroll_period_id] || "—" },
  { key: "earnings", label: "Earnings" },
  { key: "deductions", label: "Deductions" },
  { key: "net_pay", label: "Net Pay" },
];

const formFields = [
  { name: "payroll_run_id", label: "Payroll Run", type: "select", optionsEntity: "PayrollRun", optionsLabel: "employee_email" },
  { name: "payroll_period_id", label: "Payroll Period", type: "select", optionsEntity: "PayrollPeriod", optionsLabel: "name" },
  { name: "employee_email", label: "Employee Email", type: "email", required: true },
  { name: "employee_id", label: "Employee", type: "select", optionsEntity: "Employee", optionsLabelFn: (r) => `${r.first_name} ${r.last_name}` },
  { name: "earnings", label: "Earnings (JSON)", type: "textarea" },
  { name: "deductions", label: "Deductions (JSON)", type: "textarea" },
  { name: "net_pay", label: "Net Pay", type: "number", required: true },
  { name: "snapshot", label: "Snapshot", type: "textarea" },
];

export default function Payslips() {
  return <CrudPage entityName="Payslip" title="Payslip" description="Historical payslip snapshots" columns={columns} formFields={formFields} searchKeys={["employee_email"]} readOnly />;
}