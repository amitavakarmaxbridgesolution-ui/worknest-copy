import React, { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import PageHeader from "@/components/PageHeader";
import { lookup } from "@/lib/hrAnalytics";
import { ChevronRight, ChevronDown, User } from "lucide-react";

function Node({ emp, byManager, all, expanded, toggle, depth }) {
  const reports = byManager[emp.id] || [];
  const isOpen = expanded[emp.id];
  return (
    <div style={{ marginLeft: depth * 24 }} className="mb-1">
      <div className="flex items-center gap-2 rounded-md border bg-card px-3 py-2 hover:bg-muted/50">
        {reports.length > 0 && (
          <button onClick={() => toggle(emp.id)} className="text-muted-foreground">
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        )}
        {reports.length === 0 && <span className="w-4" />}
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center"><User className="h-4 w-4 text-primary" /></div>
        <div className="flex-1">
          <p className="text-sm font-medium">{emp.first_name} {emp.last_name}</p>
          <p className="text-xs text-muted-foreground">{lookup(all.designations, emp.designation_id)} · {lookup(all.departments, emp.department_id)}</p>
        </div>
        <span className="text-xs text-muted-foreground">{emp.employment_status}</span>
        {reports.length > 0 && <span className="text-xs text-muted-foreground">{reports.length} report(s)</span>}
      </div>
      {isOpen && reports.length > 0 && (
        <div className="mt-1 space-y-1">
          {reports.map((r) => (
            <Node key={r.id} emp={r} byManager={byManager} all={all} expanded={expanded} toggle={toggle} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function OrgChart() {
  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    (async () => {
      const [employees, departments, designations] = await Promise.all([
        base44.entities.Employee.list("-updated_date", 500),
        base44.entities.Department.list("-updated_date", 500),
        base44.entities.Designation.list("-updated_date", 500),
      ]);
      setData({ employees, departments, designations });
    })();
  }, []);

  const byManager = useMemo(() => {
    const m = {};
    (data?.employees || []).forEach((e) => {
      if (e.manager_id) { (m[e.manager_id] = m[e.manager_id] || []).push(e); }
    });
    return m;
  }, [data]);

  const roots = useMemo(() => (data?.employees || []).filter((e) => !e.manager_id || !(data?.employees || []).some((x) => x.id === e.manager_id)), [data]);

  const toggle = (id) => setExpanded((s) => ({ ...s, [id]: !s[id] }));
  const expandAll = () => setExpanded(Object.fromEntries((data?.employees || []).map((e) => [e.id, true])));

  if (!data) return <p className="text-sm text-muted-foreground">Loading organization chart...</p>;

  return (
    <div>
      <PageHeader title="Organization Chart" description="Dynamic reporting hierarchy" actions={<button onClick={expandAll} className="text-sm text-primary">Expand all</button>} />
      <div className="space-y-2">
        {roots.map((r) => (
          <Node key={r.id} emp={r} byManager={byManager} all={data} expanded={expanded} toggle={toggle} depth={0} />
        ))}
      </div>
    </div>
  );
}