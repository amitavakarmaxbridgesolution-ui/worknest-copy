import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Zap, UserSquare, Plane, Clock, Receipt, Briefcase, UserPlus, Package, LifeBuoy, Users, Megaphone } from "lucide-react";

const actions = [
  { label: "Employee", path: "/employees", icon: UserSquare, roles: ["admin"] },
  { label: "Leave Request", path: "/leave-requests", icon: Plane, roles: ["admin", "user"] },
  { label: "Attendance Correction", path: "/attendance-corrections", icon: Clock, roles: ["admin", "user"] },
  { label: "Expense Claim", path: "/expense-claims", icon: Receipt, roles: ["admin", "user"] },
  { label: "Job Post", path: "/job-posts", icon: Briefcase, roles: ["admin"] },
  { label: "Candidate", path: "/candidates", icon: UserPlus, roles: ["admin"] },
  { label: "Asset Request", path: "/asset-requests", icon: Package, roles: ["admin", "user"] },
  { label: "Ticket", path: "/helpdesk-tickets", icon: LifeBuoy, roles: ["admin", "user"] },
  { label: "Meeting", path: "/meetings", icon: Users, roles: ["admin", "user"] },
  { label: "Announcement", path: "/announcements", icon: Megaphone, roles: ["admin"] },
];

export default function QuickCreate() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const role = user?.role || "user";
  const visible = actions.filter((a) => a.roles.includes(role));
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-medium hover:bg-primary/90">
          <Zap className="h-4 w-4" /> Quick Create
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {visible.map((a) => {
          const Icon = a.icon;
          return (
            <DropdownMenuItem key={a.path} onClick={() => navigate(a.path)}>
              <Icon className="h-4 w-4 mr-2" /> {a.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}