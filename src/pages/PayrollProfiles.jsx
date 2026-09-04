import React from "react";
import CrudPage from "@/components/CrudPage";
import PayrollProfileForm from "@/components/payroll/PayrollProfileForm";

const columns = [
  {
    key: "employee_id",
    label: "Employee",
    render: (r, lk) => lk.Employee?.[r.employee_id] || r.employee_email || "—",
  },
  {
    key: "salary_structure_id",
    label: "Structure",
    render: (r, lk) => lk.SalaryStructure?.[r.salary_structure_id] || "—",
  },
  { key: "ctc", label: "CTC", render: (r) => Number(r.ctc || 0).toLocaleString() },
  { key: "basic", label: "Basic", render: (r) => Number(r.basic || 0).toLocaleString() },
  { key: "effective_date", label: "Effective" },
];

// formFields drive lookup loading (Employee names, SalaryStructure names) for column renders.
const formFields = [
  { name: "employee_id", label: "Employee", type: "select", optionsEntity: "Employee", optionsLabelFn: (r) => `${r.first_name} ${r.last_name}` },
  { name: "salary_structure_id", label: "Salary Structure", type: "select", optionsEntity: "SalaryStructure", optionsLabel: "name" },
];

export default function PayrollProfiles() {
  return (
    <CrudPage
      entityName="EmployeePayrollProfile"
      title="Payroll Profile"
      description="Employee payroll configuration"
      columns={columns}
      formFields={formFields}
      searchKeys={["employee_email"]}
      customForm={PayrollProfileForm}
      formMaxWidth="max-w-4xl"
    />
  );
}