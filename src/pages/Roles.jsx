import React from "react";
import PageHeader from "@/components/PageHeader";
import { Check, Minus } from "lucide-react";

const modules = [
  "Employees", "Branches", "Attendance", "Leave", "Payroll", "Recruitment",
  "Performance", "Assets", "Expenses", "Projects", "Reports", "Settings",
  "Roles", "Logs",
];

const matrix = {
  "Super Admin": modules.map(() => true),
  "HR Manager": [true, true, true, true, true, true, true, true, true, true, true, true, false, true],
  "Employee": [true, false, false, true, false, false, true, false, false, false, false, false, false, false],
};

export default function Roles() {
  return (
    <div>
      <PageHeader title="Roles & Permissions" description="Role-based access control matrix" />
      <div className="rounded-lg border bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 font-medium">Module</th>
              {Object.keys(matrix).map((r) => (
                <th key={r} className="p-3 font-medium text-center whitespace-nowrap">{r}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {modules.map((m, i) => (
              <tr key={m} className="border-t">
                <td className="p-3 font-medium">{m}</td>
                {Object.entries(matrix).map(([role, vals]) => (
                  <td key={role} className="p-3 text-center">
                    {vals[i] ? (
                      <Check className="h-4 w-4 text-emerald-600 inline" />
                    ) : (
                      <Minus className="h-4 w-4 text-muted-foreground inline" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}