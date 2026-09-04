import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { User, Mail, Phone, Briefcase, Calendar, MapPin } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import EmptyState from "@/components/EmptyState";

export default function MyProfile() {
  const { user } = useAuth();
  const [emp, setEmp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lookups, setLookups] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const all = await base44.entities.Employee.list("-updated_date", 500);
        const me = all.find((e) => e.work_email === user?.email);
        setEmp(me || null);
        if (me) {
          const [branches, depts, teams, desigs] = await Promise.all([
            base44.entities.Branch.list("-updated_date", 500),
            base44.entities.Department.list("-updated_date", 500),
            base44.entities.Team.list("-updated_date", 500),
            base44.entities.Designation.list("-updated_date", 500),
          ]);
          setLookups({
            Branch: branches, Department: depts, Team: teams, Designation: desigs,
          });
        }
      } finally { setLoading(false); }
    })();
  }, []);

  if (loading) return <p className="text-sm text-muted-foreground">Loading profile...</p>;
  if (!emp) return <EmptyState title="No employee profile linked" description="Your account is not linked to an employee record yet." />;

  const L = (entity, id, field) => (lookups[entity]?.find((x) => x.id === id) || {})[field] || "—";

  const rows = [
    { icon: Mail, label: "Work Email", value: emp.work_email },
    { icon: Phone, label: "Phone", value: emp.phone },
    { icon: Briefcase, label: "Designation", value: L("Designation", emp.designation_id, "name") },
    { icon: MapPin, label: "Branch", value: L("Branch", emp.branch_id, "branch_name") },
    { icon: Briefcase, label: "Department", value: L("Department", emp.department_id, "name") },
    { icon: Briefcase, label: "Team", value: L("Team", emp.team_id, "name") },
    { icon: Calendar, label: "Date of Joining", value: emp.date_of_joining },
  ];

  return (
    <div>
      <PageHeader title="My Profile" description="Your employee information" />
      <Card className="p-6 max-w-2xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-semibold">
            {(emp.first_name?.[0] || "") + (emp.last_name?.[0] || "")}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{emp.first_name} {emp.last_name}</h2>
            <p className="text-sm text-muted-foreground">{emp.employee_code} · {emp.employment_type}</p>
            <div className="mt-1 flex gap-2">
              <StatusBadge status={emp.employment_status} />
              <StatusBadge status={emp.status} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rows.map((r, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center"><r.icon className="h-4 w-4 text-muted-foreground" /></div>
              <div>
                <p className="text-xs text-muted-foreground">{r.label}</p>
                <p className="text-sm font-medium">{r.value}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}