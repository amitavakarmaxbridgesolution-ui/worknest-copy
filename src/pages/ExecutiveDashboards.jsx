import React, { useState, useEffect } from "react";
import { loadDataset, groupCount, sumBy, lookup } from "@/lib/hrAnalytics";
import PageHeader from "@/components/PageHeader";
import KPICard from "@/components/KPICard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid, LineChart, Line } from "recharts";
import { Users, UserMinus, UserPlus, Wallet, Plane, CalendarCheck, Star, GraduationCap, Briefcase } from "lucide-react";

const colors = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];
function Chart({ data, type = "bar", dk = "value" }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      {type === "pie" ? (
        <PieChart><Pie data={data} dataKey={dk} nameKey="name" cx="50%" cy="50%" outerRadius={80} label>{data.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}</Pie><Tooltip /></PieChart>
      ) : type === "line" ? (
        <LineChart data={data}><CartesianGrid strokeDasharray="3 3" stroke="#eee" /><XAxis dataKey="name" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} /><Tooltip /><Line dataKey={dk} stroke="#6366f1" strokeWidth={2} /></LineChart>
      ) : (
        <BarChart data={data}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" /><XAxis dataKey="name" tick={{ fontSize: 12 }} /><YAxis allowDecimals={false} tick={{ fontSize: 12 }} /><Tooltip /><Bar dataKey={dk} fill="#6366f1" radius={[6, 6, 0, 0]} /></BarChart>
      )}
    </ResponsiveContainer>
  );
}

export default function ExecutiveDashboards() {
  const [d, setD] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { loadDataset().then((r) => { setD(r); setLoading(false); }).catch(() => setLoading(false)); }, []);
  if (loading || !d) return <p className="text-sm text-muted-foreground">Loading executive dashboards...</p>;

  const active = d.employees.filter((e) => e.employment_status === "Active");
  const exits = d.employees.filter((e) => e.employment_status === "Resigned" || e.employment_status === "Terminated");
  const attrition = d.employees.length ? ((exits.length / d.employees.length) * 100).toFixed(1) : 0;
  const netPayroll = d.payrollRuns.reduce((s, r) => s + (Number(r.net_pay) || 0), 0);
  const openPositions = d.jobPosts.filter((j) => j.status === "published").length;
  const byBranch = groupCount(active, (e) => lookup(d.branches, e.branch_id));
  const payrollByBranch = sumBy(d.payrollRuns, (r) => lookup(d.branches, d.employees.find((e) => e.id === r.employee_id)?.branch_id), (r) => r.net_pay);
  const presentToday = d.attendance.filter((a) => a.date === new Date().toISOString().slice(0, 10) && a.status === "present").length;

  return (
    <div>
      <PageHeader title="Executive Dashboards" description="CEO, CHRO and CFO views" />
      <Tabs defaultValue="ceo">
        <TabsList><TabsTrigger value="ceo">CEO</TabsTrigger><TabsTrigger value="chro">CHRO</TabsTrigger><TabsTrigger value="cfo">CFO</TabsTrigger></TabsList>

        <TabsContent value="ceo" className="mt-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <KPICard label="Total Employees" value={active.length} icon={Users} />
            <KPICard label="Attrition" value={attrition + "%"} icon={UserMinus} />
            <KPICard label="Open Positions" value={openPositions} icon={Briefcase} />
            <KPICard label="Present Today" value={presentToday} icon={CalendarCheck} />
            <KPICard label="Payroll Cost (Net)" value={"₹" + netPayroll.toLocaleString()} icon={Wallet} />
            <KPICard label="Branches" value={d.branches.length} icon={Briefcase} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-lg border bg-card p-5"><h3 className="text-sm font-medium mb-4">Headcount by Branch</h3><Chart data={byBranch} /></div>
            <div className="rounded-lg border bg-card p-5"><h3 className="text-sm font-medium mb-4">Payroll by Branch</h3><Chart data={payrollByBranch} /></div>
          </div>
        </TabsContent>

        <TabsContent value="chro" className="mt-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <KPICard label="Headcount" value={active.length} icon={Users} />
            <KPICard label="New Joiners" value={active.filter((e) => (e.date_of_joining || "").slice(0, 4) === String(new Date().getFullYear())).length} icon={UserPlus} />
            <KPICard label="On Leave" value={d.leaveRequests.filter((l) => l.status === "approved").length} icon={Plane} />
            <KPICard label="Reviews Open" value={d.reviews.filter((r) => r.status !== "finalized").length} icon={Star} />
            <KPICard label="Open Tickets" value={d.tickets.filter((t) => !["resolved", "closed"].includes(t.status)).length} icon={Briefcase} />
            <KPICard label="Kudos Sent" value={d.kudos.length} icon={Star} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-lg border bg-card p-5"><h3 className="text-sm font-medium mb-4">Employment Status</h3><Chart data={groupCount(d.employees, (e) => e.employment_status)} type="pie" /></div>
            <div className="rounded-lg border bg-card p-5"><h3 className="text-sm font-medium mb-4">Leave Status</h3><Chart data={groupCount(d.leaveRequests, (l) => l.status)} type="pie" /></div>
          </div>
        </TabsContent>

        <TabsContent value="cfo" className="mt-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <KPICard label="Payroll (Net)" value={"₹" + netPayroll.toLocaleString()} icon={Wallet} />
            <KPICard label="Loan Outstanding" value={"₹" + d.loans.reduce((s, l) => s + (Number(l.outstanding) || 0), 0).toLocaleString()} icon={Wallet} />
            <KPICard label="Advances Pending" value={"₹" + d.advances.filter((a) => a.status === "approved").reduce((s, a) => s + (Number(a.amount) || 0), 0).toLocaleString()} icon={Wallet} />
            <KPICard label="Expenses Submitted" value={"₹" + d.expenses.filter((e) => e.status === "submitted").reduce((s, e) => s + (Number(e.total_amount) || 0), 0).toLocaleString()} icon={Wallet} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-lg border bg-card p-5"><h3 className="text-sm font-medium mb-4">Payroll Cost by Branch</h3><Chart data={payrollByBranch} /></div>
            <div className="rounded-lg border bg-card p-5"><h3 className="text-sm font-medium mb-4">Expense by Status</h3><Chart data={groupCount(d.expenses, (e) => e.status)} type="pie" /></div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}