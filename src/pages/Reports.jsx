import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import PageHeader from "@/components/PageHeader";
import KPICard from "@/components/KPICard";
import { Users, UserPlus, UserMinus, CalendarCheck, Plane, Wallet, Briefcase } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from "recharts";

export default function Reports() {
  const [data, setData] = useState({ headcount: 0, joiners: 0, exits: 0, onLeave: 0, payroll: 0, byDept: [], byStatus: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [emps, depts, leaves, runs] = await Promise.all([
          base44.entities.Employee.list("-updated_date", 500),
          base44.entities.Department.list("-updated_date", 500),
          base44.entities.LeaveRequest.list("-updated_date", 500),
          base44.entities.PayrollRun.list("-updated_date", 500),
        ]);
        const now = new Date();
        const thisYear = now.getFullYear();
        const joiners = emps.filter((e) => (e.date_of_joining || "").slice(0, 4) === String(thisYear)).length;
        const exits = emps.filter((e) => e.employment_status === "Resigned" || e.employment_status === "Terminated").length;
        const onLeave = leaves.filter((l) => l.status === "approved").length;
        const payroll = runs.reduce((s, r) => s + (Number(r.net_pay) || 0), 0);
        const dMap = {};
        emps.forEach((e) => {
          const d = depts.find((x) => x.id === e.department_id);
          const n = d?.name || "Unassigned";
          dMap[n] = (dMap[n] || 0) + 1;
        });
        const byDept = Object.entries(dMap).map(([name, count]) => ({ name, count }));
        const sMap = {};
        emps.forEach((e) => { const s = e.employment_status || "Unknown"; sMap[s] = (sMap[s] || 0) + 1; });
        const byStatus = Object.entries(sMap).map(([name, value]) => ({ name, value }));
        setData({ headcount: emps.length, joiners, exits, onLeave, payroll, byDept, byStatus });
      } finally { setLoading(false); }
    })();
  }, []);

  const colors = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];

  return (
    <div>
      <PageHeader title="Reports" description="Core HR, attendance, leave, payroll and recruitment analytics" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KPICard label="Headcount" value={loading ? "—" : data.headcount} icon={Users} />
        <KPICard label="New Joiners (YTD)" value={loading ? "—" : data.joiners} icon={UserPlus} />
        <KPICard label="Exits" value={loading ? "—" : data.exits} icon={UserMinus} />
        <KPICard label="On Leave" value={loading ? "—" : data.onLeave} icon={Plane} />
        <KPICard label="Active Today" value={loading ? "—" : data.headcount - data.exits} icon={CalendarCheck} />
        <KPICard label="Payroll (Net)" value={loading ? "—" : "₹" + data.payroll.toLocaleString()} icon={Wallet} />
        <KPICard label="Departments" value={loading ? "—" : data.byDept.length} icon={Briefcase} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border bg-card p-5">
          <h3 className="text-sm font-medium mb-4">Headcount by Department</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data.byDept}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-lg border bg-card p-5">
          <h3 className="text-sm font-medium mb-4">Employment Status Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={data.byStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {data.byStatus.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}