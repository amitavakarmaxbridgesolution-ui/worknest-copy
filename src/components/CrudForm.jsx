import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CrudForm({ fields, initial, onSubmit, onCancel, saving }) {
  const [values, setValues] = useState(initial || {});
  const [options, setOptions] = useState({});
  const [loadingOpts, setLoadingOpts] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const opts = {};
      for (const f of fields) {
        if (f.options) opts[f.name] = f.options;
        else if (f.optionsEntity) {
          try {
            const rows = await base44.entities[f.optionsEntity].list("-updated_date", 500);
            opts[f.name] = rows.map((r) => ({
              value: r.id,
              label: f.optionsLabelFn ? f.optionsLabelFn(r) : (r[f.optionsLabel] || r.id),
            }));
          } catch (e) {
            opts[f.name] = [];
          }
        }
      }
      if (active) {
        setOptions(opts);
        setLoadingOpts(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const set = (name, v) => setValues((s) => ({ ...s, [name]: v }));
  const submit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.name} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
            <Label className="mb-1.5 block">
              {f.label}
              {f.required && <span className="text-destructive"> *</span>}
            </Label>
            {f.type === "select" ? (
              <Select value={values[f.name] || ""} onValueChange={(v) => set(f.name, v)} disabled={loadingOpts}>
                <SelectTrigger>
                  <SelectValue placeholder={f.placeholder || "Select..."} />
                </SelectTrigger>
                <SelectContent>
                  {(options[f.name] || []).map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : f.type === "textarea" ? (
              <Textarea
                value={values[f.name] || ""}
                onChange={(e) => set(f.name, e.target.value)}
                placeholder={f.placeholder}
              />
            ) : (
              <Input
                type={f.type || "text"}
                value={values[f.name] || ""}
                onChange={(e) => set(f.name, e.target.value)}
                placeholder={f.placeholder}
                required={f.required}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-muted-foreground hover:text-foreground px-3 py-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}