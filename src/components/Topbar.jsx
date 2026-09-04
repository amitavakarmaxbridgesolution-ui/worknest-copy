import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { Menu, Search, Bell, ChevronDown, LogOut } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import QuickCreate from "@/components/QuickCreate";

export default function Topbar({ onMenuClick }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const name = user?.full_name || user?.email || "?";
  const initials = name.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase();
  const [q, setQ] = useState("");

  return (
    <header className="sticky top-0 z-20 h-16 border-b bg-background/80 backdrop-blur flex items-center gap-3 px-4 sm:px-6">
      <button className="lg:hidden p-2 rounded-md hover:bg-muted" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
      </button>
      <div className="relative flex-1 max-w-md">
        <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") navigate("/search"); }}
          className="w-full pl-9 pr-3 h-9 rounded-md border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Search employees, branches, modules..."
        />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <QuickCreate />
        <button className="p-2 rounded-md hover:bg-muted relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500" />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 p-1 pr-2 rounded-md hover:bg-muted outline-none">
            <Avatar>
              <AvatarFallback className="bg-primary/10 text-primary text-xs">{initials}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium hidden sm:block max-w-[140px] truncate">{name}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="truncate">{user?.email}</DropdownMenuLabel>
            <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
              Role: {user?.role}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()}>
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}