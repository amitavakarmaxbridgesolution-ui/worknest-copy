import React, { useState, useEffect } from "react";
import { loadDataset, groupCount, sumBy, lookup } from "@/lib/hrAnalytics";
import PageHeader from "@/components/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid, LineChart, Line } from "recharts";
import { Download } from "lucide-react";

const colors = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4", "#a855f7", "#ec4899"];

function Chart({ data, dataKey = "value", type = "bar" }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      {type === "pie" ? (
        <PieChart><Pie data={data} dataKey={dataKey} nameKey="name" cx="50%" cy="50%" outerRadius={80} label>{data.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}</Pie><Tooltip /></PieChart>
      ) : type === "line" ? (
        <LineChart data={data}><CartesianGrid strokeDasharray="3 3" stroke="#eee" /><XAxis dataKey="name" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} /><Tooltip /><Line dataKey={dataKey} stroke="#6366f1" strokeWidth={2} /></LineChart>
      ) : (
        <BarChart data={data}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" /><XAxis dataKey="name" tick={{ fontSize: 12 }} /><YAxis allowDecimals={false} tick={{ fontSize: 12 }} /><Tooltip /><Bar dataKey={dataKey} fill="#6366f1" radius={[6, 6, 0, 0]} /></BarChart>
      )}
    </ResponsiveContainer>
  );
}

function Panel({ title, data, children, onExport }) {
  return (
    <div className="rounded-lg border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">{title}</h3>
        {onExport && <button onClick={onExport} className="text-xs text-primary flex items-center gap-1"><Download className="h-3 w-3" /> CSV</button>}
      </div>
      {children || (data ? <Chart data={data} /> : null)}
    </div>
  );
}

const toCsv = (rows) => {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  return [headers.join(","), ...rows.map((r) => headers.map((h) => `"${String(r[h] ?? "").replace(/"/g, '""')}"`).join(","))].join("\n");
};
const download = (name, rows) => {
  const blob = new Blob([toCsv(rows)], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = name; a.click(); URL.revokeObjectURL(url);
};

export default function ReportsHub() {
  const [d, setD] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { loadDataset().then((r) => { setD(r); setLoading(false); }).catch(() => setLoading(false)); }, []);
  if (loading || !d) return <p className="text-sm text-muted-foreground">Loading reports...</p>;

  const active = d.employees.filter((e) => e.employment_status === "Active");
  const byDept = groupCount(active, (e) => lookup(d.departments, e.department_id));
  const byBranch = groupCount(active, (e) => lookup(d.branches, e.branch_id));
  const byStatus = groupCount(d.employees, (e) => e.employment_status);
  const leaveByType = groupCount(d.leaveRequests, (l) => l.status);
  const payrollByBranch = sumBy(d.payrollRuns, (r) => lookup(d.branches, d.employees.find((e) => e.id === r.employee_id)?.branch_id), (r) => r.net_pay);
  const candidatesBySource = groupCount(d.candidates, (c) => c.source);
  const appFunnel = ["applied", "shortlisted", "interview", "selected", "offer", "hired"].map((s) => ({ name: s, value: d.applications.filter((a) => a.status === s).length }));
  const ratings = groupCount(d.reviews, (r) => String(r.final_rating || r.manager_rating || "pending"));
  const goals = groupCount([], () => "n/a");
  const assetVal = sumBy(d.assets, (a) => lookup(d.assetCategories || [], a.category_id), (a) => a.value);
  const expenseByStatus = groupCount(d.expenses, (e) => e.status);
  const attendanceStatus = groupCount(d.attendance, (a) => a.status);

  return (
    <div>
      <PageHeader title="Reports Hub" description="Centralized analytics across HR, attendance, leave, payroll, recruitment, performance, assets and expenses" />
      <Tabs defaultValue="hr">
        <TabsList className="flex flex-wrap h-auto">
          <TabsTrigger value="hr">HR</TabsTrigger><TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="leave">Leave</TabsTrigger><TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="recruitment">Recruitment</TabsTrigger><TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger><TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>

        <TabsContent value="hr" className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <Panel title="Headcount by Department" data={byDept} onExport={() => download("headcount_by_dept.csv", byDept)} />
          <Panel title="Employment Status" data={byStatus} onExport={() => download("employment_status.csv", byStatus)}><Chart data={byStatus} type="pie" /></Panel>
        </TabsContent>
        <TabsContent value="attendance" className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <Panel title="Attendance Status" data={attendanceStatus} onExport={() => download("attendance_status.csv", attendanceStatus)}><Chart data={attendanceStatus} type="pie" /></Panel>
          <Panel title="Headcount by Branch" data={byBranch} onExport={() => download("headcount_by_branch.csv", byBranch)} />
        </TabsContent>
        <TabsContent value="leave" className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <Panel title="Leave Requests by Status" data={leaveByType} onExport={() => download("leave_status.csv", leaveByType)}><Chart data={leaveByType} type="pie" /></Panel>
        </TabsContent>
        <TabsContent value="payroll" className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <Panel title="Payroll Cost by Branch" data={payrollByBranch} onExport={() => download("payroll_by_branch.csv", payrollByBranch)} />
          <Panel title="Loan Outstanding by Branch"><Chart data={sumBy(d.loans, (l) => lookup(d.branches, d.employees.find((e) => e.id === l.employee_id)?.branch_id), (l) => l.outstanding)} /></Panel>
        </TabsContent>
        <TabsContent value="recruitment" className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <Panel title="Candidates by Source" data={candidatesBySource} onExport={() => download("candidates_by_source.csv", candidatesBySource)}><Chart data={candidatesBySource} type="pie" /></Panel>
          <Panel title="Hiring Funnel" data={appFunnel} onExport={() => download("hiring_funnel.csv", appFunnel)} />
        </TabsContent>
        <TabsContent value="performance" className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <Panel title="Rating Distribution" data={ratings} onExport={() => download("rating_distribution.csv", ratings)}><Chart data={ratings} type="pie" /></Panel>
        </TabsContent>
        <TabsContent value="assets" className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <Panel title="Asset Status"><Chart data={groupCount(d.assets, (a) => a.status)} type="pie" /></Panel>
          <Panel title="Asset Value by Category" data={assetVal} onExport={() => download("asset_value.csv", assetVal)} />
        </TabsContent>
        <TabsContent value="expenses" className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <Panel title="Expense Claims by Status" data={expenseByStatus} onExport={() => download("expense_status.csv", expenseByStatus)}><Chart data={expenseByStatus} type="pie" /></Panel>
        </TabsContent>
      </Tabs>
    </div>
  );
}