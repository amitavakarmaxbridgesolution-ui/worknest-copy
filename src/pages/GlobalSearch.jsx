import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import PageHeader from "@/components/PageHeader";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function GlobalSearch() {
  const { user } = useAuth();
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const isAdmin = user?.role === "admin";

  const run = async (query) => {
    setQ(query);
    if (query.length < 2) { setResults([]); return; }
    setLoading(true);
    const ql = query.toLowerCase();
    const out = [];
    try {
      const [emps, branches, depts, cands, jobs, assets, projects, tickets, meetings, policies, announcements] = await Promise.all([
        base44.entities.Employee.list("-updated_date", 500),
        isAdmin ? base44.entities.Branch.list("-updated_date", 500) : Promise.resolve([]),
        isAdmin ? base44.entities.Department.list("-updated_date", 500) : Promise.resolve([]),
        isAdmin ? base44.entities.Candidate.list("-updated_date", 500) : Promise.resolve([]),
        isAdmin ? base44.entities.JobPost.list("-updated_date", 500) : Promise.resolve([]),
        isAdmin ? base44.entities.Asset.list("-updated_date", 500) : Promise.resolve([]),
        isAdmin ? base44.entities.Project.list("-updated_date", 500) : Promise.resolve([]),
        base44.entities.HelpdeskTicket.list("-updated_date", 500),
        base44.entities.Meeting.list("-updated_date", 500),
        base44.entities.Policy.list("-updated_date", 500),
        base44.entities.Announcement.list("-updated_date", 500),
      ]);
      const add = (list, fields, type, path, label) => list.forEach((x) => {
        if (fields.some((f) => String(x[f] ?? "").toLowerCase().includes(ql))) {
          out.push({ type, id: x.id, label: typeof label === "function" ? label(x) : x[label], path });
        }
      });
      add(emps, ["first_name", "last_name", "employee_code", "work_email"], "Employee", "/employees", (e) => `${e.first_name} ${e.last_name}`);
      add(branches, ["name", "branch_name", "branch_code", "code"], "Branch", "/branches", "name");
      add(depts, ["name", "code"], "Department", "/departments", "name");
      add(cands, ["name", "email"], "Candidate", "/candidates", "name");
      add(jobs, ["title"], "Job Post", "/job-posts", "title");
      add(assets, ["name", "serial"], "Asset", "/assets", "name");
      add(projects, ["name"], "Project", "/projects", "name");
      add(tickets, ["subject", "description", "requester_email"], "Ticket", "/helpdesk-tickets", "subject");
      add(meetings, ["title", "location"], "Meeting", "/meetings", "title");
      add(policies, ["title", "content"], "Policy", "/policies", "title");
      add(announcements, ["title", "body"], "Announcement", "/announcements", "title");
    } finally {
      setResults(out);
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title="Global Search" description="Search employees, branches, candidates, jobs, assets, projects, tickets, meetings, policies and announcements" />
      <div className="relative max-w-lg mb-6">
        <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input value={q} onChange={(e) => run(e.target.value)} placeholder="Type to search..." className="pl-9" autoFocus />
      </div>
      {loading && <p className="text-sm text-muted-foreground">Searching...</p>}
      {!loading && results.length > 0 && (
        <div className="rounded-lg border bg-card divide-y max-w-lg">
          {results.map((r, i) => (
            <Link key={i} to={r.path} className="flex items-center justify-between p-3 hover:bg-muted">
              <span className="text-sm font-medium">{r.label}</span>
              <span className="text-xs text-muted-foreground">{r.type}</span>
            </Link>
          ))}
        </div>
      )}
      {!loading && q.length >= 2 && results.length === 0 && (
        <p className="text-sm text-muted-foreground">No results found.</p>
      )}
    </div>
  );
}