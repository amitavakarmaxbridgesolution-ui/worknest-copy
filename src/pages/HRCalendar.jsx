import React, { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Cake, CalendarDays, UserPlus, Plane, Users, FileText, CalendarCheck, AlertTriangle } from "lucide-react";

const typeMeta = {
  birthday: { label: "Birthday", icon: Cake, color: "bg-pink-100 text-pink-700" },
  anniversary: { label: "Anniversary", icon: CalendarDays, color: "bg-purple-100 text-purple-700" },
  joiner: { label: "New Joiner", icon: UserPlus, color: "bg-emerald-100 text-emerald-700" },
  training: { label: "Training", icon: FileText, color: "bg-blue-100 text-blue-700" },
  leave: { label: "Leave", icon: Plane, color: "bg-amber-100 text-amber-700" },
  meeting: { label: "Meeting", icon: Users, color: "bg-indigo-100 text-indigo-700" },
  company_event: { label: "Company Event", icon: CalendarCheck, color: "bg-teal-100 text-teal-700" },
  last_working_day: { label: "Last Working Day", icon: AlertTriangle, color: "bg-rose-100 text-rose-700" },
  probation_end: { label: "Probation End", icon: CalendarCheck, color: "bg-orange-100 text-orange-700" },
  contract_end: { label: "Contract End", icon: AlertTriangle, color: "bg-yellow-100 text-yellow-700" },
};

export default function HRCalendar() {
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [companyEvents, setCompanyEvents] = useState([]);
  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filter, setFilter] = useState({ branch: "", department: "", type: "" });
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [e, l, m, s, ce, b, d] = await Promise.all([
          base44.entities.Employee.list("-updated_date", 500),
          base44.entities.LeaveRequest.list("-updated_date", 500),
          base44.entities.Meeting.list("-updated_date", 500),
          base44.entities.TrainingSession.list("-updated_date", 500),
          base44.entities.CalendarEvent.list("-updated_date", 500),
          base44.entities.Branch.list("-updated_date", 500),
          base44.entities.Department.list("-updated_date", 500),
        ]);
        setEmployees(e); setLeaves(l); setMeetings(m); setSessions(s); setCompanyEvents(ce);
        setBranches(b); setDepartments(d);
      } finally { setLoading(false); }
    })();
  }, []);

  const events = useMemo(() => {
    const out = [];
    const [y, m] = month.split("-").map(Number);
    const inMonth = (d) => d && Number(d.slice(5, 7)) === m && Number(d.slice(0, 4)) === y;
    const inMonthDT = (d) => d && d.slice(0, 7) === month;

    employees.forEach((emp) => {
      if (filter.branch && emp.branch_id !== filter.branch) return;
      if (filter.department && emp.department_id !== filter.department) return;
      const dob = emp.date_of_birth;
      if (dob && Number(dob.slice(5, 7)) === m) {
        const day = dob.slice(8, 10);
        out.push({ title: `${emp.first_name} ${emp.last_name}'s Birthday`, date: `${month}-${day}`, type: "birthday", employee_email: emp.work_email, description: "Birthday celebration" });
      }
      const doj = emp.date_of_joining;
      if (doj && Number(doj.slice(5, 7)) === m) {
        const yrs = y - Number(doj.slice(0, 4));
        if (yrs > 0) out.push({ title: `${emp.first_name} ${emp.last_name} — ${yrs}yr Anniversary`, date: `${month}-${doj.slice(8, 10)}`, type: "anniversary", employee_email: emp.work_email, description: `Work anniversary (${yrs} years)` });
        out.push({ title: `${emp.first_name} ${emp.last_name} joined`, date: doj, type: "joiner", employee_email: emp.work_email, description: "New joiner (historical)" });
      }
    });

    leaves.forEach((lv) => {
      if (lv.status !== "approved") return;
      if (inMonth(lv.from_date)) out.push({ title: `Leave: ${lv.employee_email}`, date: lv.from_date, type: "leave", employee_email: lv.employee_email, description: lv.reason || "On leave" });
    });
    meetings.forEach((mt) => {
      if (inMonthDT(mt.start_time)) out.push({ title: `Meeting: ${mt.title}`, date: mt.start_time.slice(0, 10), type: "meeting", description: mt.location || "" });
    });
    sessions.forEach((ss) => {
      if (inMonth(ss.start_date)) out.push({ title: `Training: ${ss.trainer || "Session"}`, date: ss.start_date, type: "training", description: "Training session" });
    });
    companyEvents.forEach((ce) => {
      if (inMonth(ce.date)) out.push({ title: ce.title, date: ce.date, type: ce.type, employee_email: ce.employee_email, description: ce.description });
    });

    let res = out;
    if (filter.type) res = res.filter((e) => e.type === filter.type);
    return res.sort((a, b) => (a.date || "").localeCompare(b.date || ""));
  }, [employees, leaves, meetings, sessions, companyEvents, month, filter]);

  const grouped = useMemo(() => {
    const m = {};
    events.forEach((e) => { (m[e.date] = m[e.date] || []).push(e); });
    return Object.entries(m).sort((a, b) => a[0].localeCompare(b[0]));
  }, [events]);

  return (
    <div>
      <PageHeader title="HR Calendar" description="Birthdays, anniversaries, joiners, leaves, meetings, training and events" />
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="h-9 rounded-md border border-input bg-transparent px-3 text-sm" />
        <Select value={filter.branch} onValueChange={(v) => setFilter((f) => ({ ...f, branch: v === "all" ? "" : v }))}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="All Branches" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>
            {branches.map((b) => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filter.department} onValueChange={(v) => setFilter((f) => ({ ...f, department: v === "all" ? "" : v }))}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="All Departments" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((d) => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filter.type} onValueChange={(v) => setFilter((f) => ({ ...f, type: v === "all" ? "" : v }))}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="All Types" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {Object.entries(typeMeta).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading calendar...</p>
      ) : grouped.length === 0 ? (
        <p className="text-sm text-muted-foreground">No events for this month.</p>
      ) : (
        <div className="space-y-4">
          {grouped.map(([date, evs]) => (
            <div key={date} className="rounded-lg border bg-card p-4">
              <p className="text-sm font-medium mb-3">{date} <span className="text-muted-foreground font-normal">· {evs.length} event(s)</span></p>
              <div className="space-y-2">
                {evs.map((e, i) => {
                  const meta = typeMeta[e.type] || typeMeta.company_event;
                  const Icon = meta.icon;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <span className={`h-8 w-8 rounded-full flex items-center justify-center ${meta.color}`}><Icon className="h-4 w-4" /></span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{e.title}</p>
                        {e.description && <p className="text-xs text-muted-foreground">{e.description}</p>}
                      </div>
                      <StatusBadge status={meta.label} />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}