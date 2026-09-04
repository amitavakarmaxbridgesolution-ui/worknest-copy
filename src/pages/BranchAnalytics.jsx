import React, { useState, useEffect } from "react";
import { loadDataset, groupCount, sumBy, lookup } from "@/lib/hrAnalytics";
import PageHeader from "@/components/PageHeader";

export default function BranchAnalytics() {
  const [d, setD] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { loadDataset().then((r) => { setD(r); setLoading(false); }).catch(() => setLoading(false)); }, []);
  if (loading || !d) return <p className="text-sm text-muted-foreground">Loading branch analytics...</p>;

  const rows = d.branches.map((b) => {
    const emps = d.employees.filter((e) => e.branch_id === b.id);
    const active = emps.filter((e) => e.employment_status === "Active").length;
    const empIds = new Set(emps.map((e) => e.id));
    const payroll = d.payrollRuns.filter((r) => empIds.has(r.employee_id)).reduce((s, r) => s + (Number(r.net_pay) || 0), 0);
    const leaves = d.leaveRequests.filter((l) => empIds.has(l.employee_id)).length;
    const assets = d.assets.filter((a) => a.branch_id === b.id).reduce((s, a) => s + (Number(a.value) || 0), 0);
    const expenses = d.expenses.filter((e) => empIds.has(e.employee_id)).reduce((s, e) => s + (Number(e.total_amount) || 0), 0);
    const candidates = d.candidates.length;
    return { name: b.name, active, payroll, leaves, assets, expenses, candidates };
  });

  return (
    <div>
      <PageHeader title="Branch Analytics" description="Workforce, payroll, leave, assets and expenses by branch" />
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>{["Branch", "Active HC", "Payroll (Net)", "Leaves", "Asset Value", "Expenses", "Candidates"].map((h) => <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.name} className={i % 2 ? "bg-muted/20" : ""}>
                <td className="px-4 py-3 font-medium">{r.name}</td>
                <td className="px-4 py-3">{r.active}</td>
                <td className="px-4 py-3">₹{r.payroll.toLocaleString()}</td>
                <td className="px-4 py-3">{r.leaves}</td>
                <td className="px-4 py-3">₹{r.assets.toLocaleString()}</td>
                <td className="px-4 py-3">₹{r.expenses.toLocaleString()}</td>
                <td className="px-4 py-3">{r.candidates}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}