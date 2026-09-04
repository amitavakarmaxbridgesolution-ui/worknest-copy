import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { navItems } from "@/lib/nav";
import { X } from "lucide-react";
import { Image } from "@/components/ui/image";
import {
  LayoutDashboard, Building2, GitBranch, Network, Users, BadgeCheck,
  Trophy, UserSquare, ShieldCheck, KeyRound, Settings, LogIn, Activity,
  ScrollText, FileText, History, UserPlus, Clock, Clock3, CalendarCheck,
  CalendarDays, Plane, Wallet, Receipt, Heart, Briefcase, Megaphone,
  Target, Star, GraduationCap, Package, ClipboardCheck, LogOut, Bell,
  Search, BarChart3, MessageSquare, LifeBuoy, BookOpen, Wand2, FileCheck, Upload } from
"lucide-react";

const iconMap = {
  LayoutDashboard, Building2, GitBranch, Network, Users, BadgeCheck,
  Trophy, UserSquare, ShieldCheck, KeyRound, Settings, LogIn, Activity,
  ScrollText, FileText, History, UserPlus, Clock, Clock3, CalendarCheck,
  CalendarDays, Plane, Wallet, Receipt, Heart, Briefcase, Megaphone,
  Target, Star, GraduationCap, Package, ClipboardCheck, LogOut, Bell,
  Search, BarChart3, MessageSquare, LifeBuoy, BookOpen, Wand2, FileCheck, Upload
};

export default function Sidebar({ mobileOpen, onClose }) {
  const { user } = useAuth();
  const role = user?.role || "user";
  const filtered = navItems.
  map((g) => ({ ...g, items: g.items.filter((it) => !it.roles || it.roles.includes(role)) })).
  filter((g) => g.items.length > 0);

  return (
    <>
      {mobileOpen && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-sidebar border-r border-sidebar-border transform transition-transform lg:translate-x-0 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"}`
        }>
        
        <div className="h-16 flex items-center gap-2 px-4 border-b border-sidebar-border">
          <Image
            src="https://media.base44.com/images/public/6a911feea78e049e1a1003f4/eaeea3ea7_MBSlogo.png"
            fittingType="fit"
            className="h-10 w-36 rounded-md"
            alt="MBS Logo"
          />
          <button className="ml-auto lg:hidden text-muted-foreground" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-3 space-y-5 overflow-y-auto h-[calc(100%-4rem)]">
          {filtered.map((group, gi) =>
          <div key={gi}>
              {group.section &&
            <p className="px-3 mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {group.section}
                </p>
            }
              <div className="space-y-1">
                {group.items.map((it) => {
                const Icon = iconMap[it.icon] || LayoutDashboard;
                return (
                  <NavLink
                    key={it.path}
                    to={it.path}
                    end={it.path === "/"}
                    onClick={onClose}
                    className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ?
                    "bg-sidebar-primary text-sidebar-primary-foreground" :
                    "text-sidebar-foreground hover:bg-sidebar-accent"}`

                    }>
                    
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{it.label}</span>
                    </NavLink>);

              })}
              </div>
            </div>
          )}
        </nav>
      </aside>
    </>);

}