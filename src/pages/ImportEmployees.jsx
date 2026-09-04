import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Upload, CheckCircle2, AlertTriangle, FileDown } from "lucide-react";

// Minimal CSV parser (handles quoted fields with commas)
function parseCsv(text) {
  const lines = text.replace(/\r/g, "").split("\n").filter((l) => l.trim());
  if (!lines.length) return { headers: [], rows: [] };
  const parseLine = (line) => {
    const out = []; let cur = ""; let q = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') { q = !q; continue; }
      if (ch === "," && !q) { out.push(cur); cur = ""; continue; }
      cur += ch;
    }
    out.push(cur); return out.map((s) => s.trim());
  };
  const headers = parseLine(lines[0]);
  const rows = lines.slice(1).map((l) => { const v = parseLine(l); return Object.fromEntries(headers.map((h, i) => [h, v[i] || ""])); });
  return { headers, rows };
}

const REQUIRED = ["employee_code", "first_name", "last_name"];

export default function ImportEmployees() {
  const { toast } = useToast();
  const [rows, setRows] = useState([]);
  const [errors, setErrors] = useState([]);
  const [importing, setImporting] = useState(false);
  const [imported, setImported] = useState(0);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const { rows: parsed } = parseCsv(String(reader.result));
      const errs = [];
      parsed.forEach((r, idx) => {
        REQUIRED.forEach((f) => { if (!r[f]) errs.push({ row: idx + 2, field: f, message: `Missing ${f}` }); });
      });
      setRows(parsed); setErrors(errs); setImported(0);
    };
    reader.readAsText(file);
  };

  const doImport = async () => {
    if (errors.length) { toast({ title: "Fix errors before importing", variant: "destructive" }); return; }
    setImporting(true);
    try {
      const records = rows.map((r) => ({
        employee_code: r.employee_code, first_name: r.first_name, last_name: r.last_name,
        work_email: r.work_email, personal_email: r.personal_email, phone: r.phone,
        date_of_joining: r.date_of_joining, employment_status: r.employment_status || "Active",
        employment_type: r.employment_type || "Full-time", gender: r.gender,
        branch_id: r.branch_id, department_id: r.department_id, designation_id: r.designation_id, manager_id: r.manager_id,
        status: "active",
      }));
      const created = await base44.entities.Employee.bulkCreate(records);
      setImported(created.length);
      toast({ title: `Imported ${created.length} employees` });
      await base44.entities.AuditLog.create({ module: "Employees", action: "bulk_import", entity: "Employee", new_value: `${created.length} records`, user_email: "" }).catch(() => {});
    } catch (e) {
      toast({ title: "Import failed", description: e.message, variant: "destructive" });
    } finally { setImporting(false); }
  };

  const downloadErrors = () => {
    const csv = ["row,field,message", ...errors.map((e) => `${e.row},${e.field},${e.message}`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "import_errors.csv"; a.click(); URL.revokeObjectURL(url);
  };

  const downloadTemplate = () => {
    const csv = "employee_code,first_name,last_name,work_email,phone,date_of_joining,employment_status,employment_type,gender,branch_id,department_id,designation_id,manager_id";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "employee_import_template.csv"; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div>
      <PageHeader title="Import Employees" description="Bulk import via CSV — validate, preview, then import" actions={<Button variant="outline" size="sm" onClick={downloadTemplate}><FileDown className="h-4 w-4 mr-1" /> Template</Button>} />
      <div className="rounded-lg border bg-card p-5 mb-4">
        <Input type="file" accept=".csv" onChange={handleFile} />
        <p className="text-xs text-muted-foreground mt-2">Required columns: {REQUIRED.join(", ")}. Invalid records are never imported.</p>
      </div>
      {errors.length > 0 && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-rose-700 flex items-center gap-2"><AlertTriangle className="h-4 w-4" /> {errors.length} validation error(s)</p>
            <Button variant="outline" size="sm" onClick={downloadErrors}><FileDown className="h-4 w-4 mr-1" /> Download Errors</Button>
          </div>
          <div className="max-h-40 overflow-y-auto">
            {errors.map((e, i) => <p key={i} className="text-xs text-rose-700">Row {e.row}: {e.message}</p>)}
          </div>
        </div>
      )}
      {rows.length > 0 && (
        <>
          <div className="rounded-lg border overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead className="bg-muted/50"><tr>{Object.keys(rows[0]).map((h) => <th key={h} className="text-left px-3 py-2 font-medium">{h}</th>)}</tr></thead>
              <tbody>{rows.map((r, i) => <tr key={i} className={i % 2 ? "bg-muted/20" : ""}>{Object.values(r).map((v, j) => <td key={j} className="px-3 py-2">{v}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={doImport} disabled={importing || errors.length > 0}><Upload className="h-4 w-4 mr-1" /> {importing ? "Importing..." : `Import ${rows.length} records`}</Button>
            {imported > 0 && <p className="text-sm text-emerald-600 flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> {imported} imported</p>}
          </div>
        </>
      )}
    </div>
  );
}