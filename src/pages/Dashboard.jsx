import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import KPICard from "@/components/KPICard";
import PageHeader from "@/components/PageHeader";
import { Users, GitBranch, Network, UserCheck } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState({ employees: 0, branches: 0, departments: 0, active: 0 });
  const [byBranch, setByBranch] = useState([]);
  const [byStatus, setByStatus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [emps, branches, depts] = await Promise.all([
          base44.entities.Employee.list("-updated_date", 500),
          base44.entities.Branch.list("-updated_date", 500),
          base44.entities.Department.list("-updated_date", 500),
        ]);
        const active = emps.filter((e) => e.employment_status === "Active").length;
        setStats({ employees: emps.length, branches: branches.length, departments: depts.length, active });
        const bMap = {};
        emps.forEach((e) => {
          const b = branches.find((x) => x.id === e.branch_id);
          const name = b?.branch_name || "Unassigned";
          bMap[name] = (bMap[name] || 0) + 1;
        });
        setByBranch(Object.entries(bMap).map(([name, count]) => ({ name, count })));
        const sMap = {};
        emps.forEach((e) => {
          const s = e.employment_status || "Unknown";
          sMap[s] = (sMap[s] || 0) + 1;
        });
        setByStatus(Object.entries(sMap).map(([name, value]) => ({ name, value })));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const colors = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];

  return (
    <div>
      <PageHeader title="Dashboard" description="Workforce overview across your organization" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KPICard label="Total Employees" value={loading ? "—" : stats.employees} icon={Users} />
        <KPICard label="Active Employees" value={loading ? "—" : stats.active} icon={UserCheck} />
        <KPICard label="Branches" value={loading ? "—" : stats.branches} icon={GitBranch} />
        <KPICard label="Departments" value={loading ? "—" : stats.departments} icon={Network} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border bg-card p-5">
          <h3 className="text-sm font-medium mb-4">Employees by Branch</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={byBranch}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-lg border bg-card p-5">
          <h3 className="text-sm font-medium mb-4">Employees by Status</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={byStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {byStatus.map((_, i) => (
                  <Cell key={i} fill={colors[i % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}