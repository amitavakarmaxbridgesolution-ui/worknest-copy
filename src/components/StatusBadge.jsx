import React from "react";
import { Badge } from "@/components/ui/badge";

const map = {
  active: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  inactive: "bg-slate-100 text-slate-600 hover:bg-slate-100",
  yes: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  no: "bg-slate-100 text-slate-600 hover:bg-slate-100",
  Active: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  Onboarding: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  Resigned: "bg-slate-100 text-slate-600 hover:bg-slate-100",
  Terminated: "bg-rose-100 text-rose-700 hover:bg-rose-100",
  super_admin: "bg-indigo-100 text-indigo-700 hover:bg-indigo-100",
  hr_manager: "bg-sky-100 text-sky-700 hover:bg-sky-100",
  employee: "bg-slate-100 text-slate-600 hover:bg-slate-100",
  admin: "bg-indigo-100 text-indigo-700 hover:bg-indigo-100",
  user: "bg-slate-100 text-slate-600 hover:bg-slate-100",
};

export default function StatusBadge({ status }) {
  const cls = map[status] || "bg-slate-100 text-slate-600 hover:bg-slate-100";
  return <Badge className={cls + " border-0"}>{status || "—"}</Badge>;
}