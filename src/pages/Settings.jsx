import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Save } from "lucide-react";

const categories = [
  { name: "Company", fields: [["company_legal_name", "Legal Name", ""], ["company_industry", "Industry", ""], ["company_website", "Website", ""]] },
  { name: "Branding", fields: [["branding_primary_color", "Primary Color", "#6366f1"], ["branding_logo_url", "Logo URL", ""], ["branding_app_name", "App Name", "WorkNest"]] },
  { name: "HR Defaults", fields: [["hr_default_timezone", "Default Timezone", "Asia/Kolkata"], ["hr_week_start", "Week Start", "Monday"], ["hr_notice_period_days", "Notice Period (days)", "30"]] },
  { name: "Attendance", fields: [["att_grace_minutes", "Late Grace (min)", "15"], ["att_half_day_hours", "Half Day Hours", "4"], ["att_overtime_threshold", "OT Threshold (hrs)", "9"]] },
  { name: "Leave", fields: [["leave_carry_forward", "Carry Forward", "true"], ["leave_encashment", "Encashment", "true"], ["leave_approval_levels", "Approval Levels", "1"]] },
  { name: "Payroll", fields: [["payroll_cycle", "Cycle", "monthly"], ["payroll_cutoff_day", "Cutoff Day", "25"], ["payroll_lop_per_day", "LOP per Day Calc", "ctc/30"]] },
  { name: "Recruitment", fields: [["recruitment_default_source", "Default Source", "Job Portal"], ["recruitment_offer_validity", "Offer Validity (days)", "7"]] },
  { name: "Performance", fields: [["perf_cycle", "Default Review Cycle", "Half-Yearly"], ["perf_rating_scale", "Rating Scale", "5"]] },
  { name: "Engagement", fields: [["eng_kudos_enabled", "Kudos Enabled", "true"], ["eng_anonymous_suggestions", "Anonymous Suggestions", "true"]] },
  { name: "Helpdesk", fields: [["helpdesk_default_sla", "Default SLA (hrs)", "24"], ["helpdesk_escalation", "Escalation After (hrs)", "48"]] },
  { name: "Email / SMTP", fields: [["smtp_host", "Host", ""], ["smtp_port", "Port", "587"], ["smtp_from", "From Address", ""]] },
  { name: "Notifications", fields: [["notif_email_enabled", "Email Notifications", "true"], ["notif_push_enabled", "Push Notifications", "false"], ["notif_sms_enabled", "SMS Notifications", "false"]] },
  { name: "Localization", fields: [["loc_language", "Language", "en"], ["loc_date_format", "Date Format", "DD/MM/YYYY"], ["loc_currency", "Currency", "INR"]] },
  { name: "File Storage", fields: [["storage_provider", "Provider", "local"], ["storage_max_upload_mb", "Max Upload (MB)", "10"]] },
  { name: "Security", fields: [["sec_password_min_length", "Min Password Length", "8"], ["sec_session_timeout", "Session Timeout (min)", "60"], ["sec_2fa_enabled", "2FA Enabled", "false"], ["sec_login_throttle", "Login Throttle (attempts)", "5"]] },
];

export default function Settings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const rows = await base44.entities.AppSetting.list("-updated_date", 500);
      const map = {};
      rows.forEach((r) => { map[r.key] = r; });
      setSettings(map);
    } catch (e) {
      toast({ title: "Failed to load settings", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const setVal = (key, v) =>
    setSettings((s) => ({ ...s, [key]: { ...(s[key] || {}), key, value: v } }));

  const saveCategory = async (cat) => {
    try {
      for (const [key] of cat.fields) {
        const existing = settings[key];
        const value = settings[key]?.value ?? "";
        if (existing?.id) {
          await base44.entities.AppSetting.update(existing.id, { value });
        } else {
          await base44.entities.AppSetting.create({ key, value, category: cat.name });
        }
      }
      toast({ title: `${cat.name} settings saved` });
      load();
    } catch (e) {
      toast({ title: "Save failed", description: e.message, variant: "destructive" });
    }
  };

  if (loading) return <p className="text-sm text-muted-foreground">Loading settings...</p>;

  return (
    <div>
      <PageHeader title="Settings" description="Application configuration" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div key={cat.name} className="rounded-lg border bg-card p-5">
            <h3 className="font-medium mb-4">{cat.name}</h3>
            <div className="space-y-3">
              {cat.fields.map(([key, label, ph]) => (
                <div key={key}>
                  <Label className="mb-1 block">{label}</Label>
                  <Input
                    value={settings[key]?.value ?? ""}
                    onChange={(e) => setVal(key, e.target.value)}
                    placeholder={ph}
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Button size="sm" onClick={() => saveCategory(cat)}>
                <Save className="h-4 w-4 mr-1" /> Save
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}