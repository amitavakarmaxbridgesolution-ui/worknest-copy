import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { FileText, UserSquare, Wand2, FileCheck, ScrollText, Mail } from "lucide-react";

const cards = [
  { to: "/policies", title: "Policies & SOPs", desc: "Company policies, SOPs and templates", icon: FileText },
  { to: "/documents", title: "Employee Documents", desc: "Personal documents and verification", icon: UserSquare },
  { to: "/letter-templates", title: "Letter Templates", desc: "Reusable HR letter templates", icon: ScrollText },
  { to: "/letter-generator", title: "Letter Generator", desc: "Generate and download HR letters as PDF", icon: Wand2 },
  { to: "/letter-requests", title: "Letter Requests", desc: "Audit trail of generated letters", icon: FileCheck },
];

export default function DocumentCenter() {
  return (
    <div>
      <PageHeader title="Document Center" description="Policies, employee documents, templates and letter generation" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link key={c.to} to={c.to} className="rounded-lg border bg-card p-5 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3"><Icon className="h-5 w-5 text-primary" /></div>
              <h3 className="font-medium">{c.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{c.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}