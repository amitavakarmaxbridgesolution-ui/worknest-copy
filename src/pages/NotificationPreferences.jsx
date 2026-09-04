import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Save } from "lucide-react";

export default function NotificationPreferences() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [pref, setPref] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      if (!user?.email) return;
      const rows = await base44.entities.NotificationPreference.list("-updated_date", 100);
      const existing = rows.find((r) => r.user_email === user.email);
      setPref(existing || { user_email: user.email, in_app_enabled: true, email_enabled: true, sms_enabled: false, push_enabled: false });
    })();
  }, [user]);

  const toggle = (key) => setPref((p) => ({ ...p, [key]: !p[key] }));

  const save = async () => {
    setSaving(true);
    try {
      if (pref.id) await base44.entities.NotificationPreference.update(pref.id, pref);
      else await base44.entities.NotificationPreference.create(pref);
      toast({ title: "Preferences saved" });
    } catch (e) {
      toast({ title: "Save failed", description: e.message, variant: "destructive" });
    } finally { setSaving(false); }
  };

  if (!pref) return <p className="text-sm text-muted-foreground">Loading...</p>;
  const channels = [
    ["in_app_enabled", "In-App"],
    ["email_enabled", "Email"],
    ["sms_enabled", "SMS"],
    ["push_enabled", "Push"],
  ];

  return (
    <div>
      <PageHeader title="Notification Preferences" description="Choose how you receive notifications" />
      <div className="rounded-lg border bg-card p-5 max-w-md">
        <div className="space-y-3">
          {channels.map(([key, label]) => (
            <div key={key} className="flex items-center justify-between">
              <Label>{label}</Label>
              <button
                onClick={() => toggle(key)}
                className={`relative h-6 w-11 rounded-full transition-colors ${pref[key] ? "bg-primary" : "bg-muted"}`}
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${pref[key] ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-end">
          <Button onClick={save} disabled={saving}><Save className="h-4 w-4 mr-1" /> {saving ? "Saving..." : "Save"}</Button>
        </div>
      </div>
    </div>
  );
}