import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { lookup } from "@/lib/hrAnalytics";
import { FileDown, Wand2 } from "lucide-react";
import jsPDF from "jspdf";

export default function LetterGenerator() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [templates, setTemplates] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [branches, setBranches] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [templateId, setTemplateId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [generated, setGenerated] = useState("");

  useEffect(() => {
    (async () => {
      const [t, e, d, dep, b, p] = await Promise.all([
        base44.entities.LetterTemplate.list("-updated_date", 500),
        base44.entities.Employee.list("-updated_date", 500),
        base44.entities.Designation.list("-updated_date", 500),
        base44.entities.Department.list("-updated_date", 500),
        base44.entities.Branch.list("-updated_date", 500),
        base44.entities.EmployeePayrollProfile.list("-updated_date", 500),
      ]);
      setTemplates(t); setEmployees(e); setDesignations(d); setDepartments(dep); setBranches(b); setProfiles(p);
    })();
  }, []);

  const fillTemplate = () => {
    const tpl = templates.find((t) => t.id === templateId);
    const emp = employees.find((e) => e.id === employeeId);
    if (!tpl || !emp) { toast({ title: "Select template and employee", variant: "destructive" }); return; }
    const prof = profiles.find((p) => p.employee_id === employeeId);
    const vars = {
      employee_name: `${emp.first_name} ${emp.last_name}`,
      designation: lookup(designations, emp.designation_id),
      department: lookup(departments, emp.department_id),
      joining_date: emp.date_of_joining || "—",
      salary: prof?.ctc ? `₹${Number(prof.ctc).toLocaleString()}` : "—",
      branch: lookup(branches, emp.branch_id),
      employee_code: emp.employee_code,
    };
    let body = tpl.body;
    Object.entries(vars).forEach(([k, v]) => { body = body.replaceAll(`{{${k}}}`, v); });
    setGenerated(`${tpl.subject ? tpl.subject + "\n\n" : ""}${body}`);
  };

  const saveAndDownload = async () => {
    const tpl = templates.find((t) => t.id === templateId);
    const emp = employees.find((e) => e.id === employeeId);
    if (!tpl || !emp || !generated) { toast({ title: "Generate the letter first", variant: "destructive" }); return; }
    try {
      await base44.entities.LetterRequest.create({ template_id: templateId, employee_email: emp.work_email, employee_id: employeeId, generated_body: generated, requested_by: user?.email, status: "generated" });
      const doc = new jsPDF();
      const lines = doc.splitTextToSize(generated, 170);
      doc.text(lines, 20, 30);
      doc.save(`${tpl.type}_${emp.first_name}_${emp.last_name}.pdf`);
      toast({ title: "Letter generated and saved" });
    } catch (e) {
      toast({ title: "Failed", description: e.message, variant: "destructive" });
    }
  };

  return (
    <div>
      <PageHeader title="Letter Generator" description="Generate HR letters from templates with employee data" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border bg-card p-5 space-y-4">
          <div>
            <Label className="mb-1 block">Letter Template</Label>
            <Select value={templateId} onValueChange={setTemplateId}>
              <SelectTrigger><SelectValue placeholder="Select template" /></SelectTrigger>
              <SelectContent>{templates.map((t) => <SelectItem key={t.id} value={t.id}>{t.name} ({t.type})</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-1 block">Employee</Label>
            <Select value={employeeId} onValueChange={setEmployeeId}>
              <SelectTrigger><SelectValue placeholder="Select employee" /></SelectTrigger>
              <SelectContent>{employees.map((e) => <SelectItem key={e.id} value={e.id}>{e.first_name} {e.last_name} · {e.employee_code}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button onClick={fillTemplate}><Wand2 className="h-4 w-4 mr-1" /> Generate</Button>
            <Button variant="outline" onClick={saveAndDownload}><FileDown className="h-4 w-4 mr-1" /> Save & Download PDF</Button>
          </div>
          <div className="text-xs text-muted-foreground">Placeholders: {"{{employee_name}}, {{designation}}, {{department}}, {{joining_date}}, {{salary}}, {{branch}}, {{employee_code}}"}</div>
        </div>
        <div className="rounded-lg border bg-card p-5">
          <Label className="mb-2 block">Generated Letter</Label>
          <Textarea value={generated} onChange={(e) => setGenerated(e.target.value)} className="min-h-[400px] font-mono text-sm" placeholder="Generated letter will appear here..." />
        </div>
      </div>
    </div>
  );
}