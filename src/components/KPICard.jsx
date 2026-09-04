import React from "react";
import { Card } from "@/components/ui/card";

export default function KPICard({ label, value, icon: Icon, hint }) {
  return (
    <Card className="p-5 flex items-center gap-4">
      {Icon && (
        <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Icon className="h-5 w-5" />
        </div>
      )}
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground truncate">{label}</p>
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
        {hint && <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>}
      </div>
    </Card>
  );
}