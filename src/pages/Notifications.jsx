import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Notifications() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const all = await base44.entities.Notification.list("-created_date", 200);
      setItems(all.filter((n) => n.user_email === user?.email));
    } catch (e) { /* ignore */ } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const markRead = async (n) => {
    try { await base44.entities.Notification.update(n.id, { read: true }); load(); } catch (e) {
      toast({ title: "Failed", description: e.message, variant: "destructive" });
    }
  };

  return (
    <div>
      <PageHeader title="Notifications" description="Your in-app alerts" />
      {loading && <p className="text-sm text-muted-foreground">Loading...</p>}
      {!loading && items.length === 0 && (
        <Card className="p-10 text-center text-sm text-muted-foreground">No notifications yet.</Card>
      )}
      <div className="space-y-2 max-w-2xl">
        {items.map((n) => (
          <Card key={n.id} className={`p-4 flex items-start gap-3 ${n.read ? "opacity-60" : ""}`}>
            <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0"><Bell className="h-4 w-4" /></div>
            <div className="flex-1">
              <p className="text-sm font-medium">{n.title}</p>
              {n.body && <p className="text-sm text-muted-foreground mt-0.5">{n.body}</p>}
              <p className="text-xs text-muted-foreground mt-1">{n.created_date ? new Date(n.created_date).toLocaleString() : ""}</p>
            </div>
            {!n.read && <button onClick={() => markRead(n)} className="text-xs text-primary font-medium">Mark read</button>}
          </Card>
        ))}
      </div>
    </div>
  );
}