import React, { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ComponentsEditor from "@/components/payroll/ComponentsEditor";
import { computeFromStructure, parseProfileComponents, assemble, formatMoney } from "@/lib/payrollCalc";

export default function PayrollProfileForm({ initial, onSubmit, onCancel, saving }) {
  const [employees, setEmployees] = useState([]);
  const [structures, setStructures] = useState([]);

  const [employeeId, setEmployeeId] = useState(initial?.employee_id || "");
  const [employeeEmail, setEmployeeEmail] = useState(initial?.employee_email || "");
  const [basic, setBasic] = useState(initial?.basic || 0);
  const [structureId, setStructureId] = useState(initial?.salary_structure_id || "");
  const [effectiveDate, setEffectiveDate] = useState(initial?.effective_date || "");
  const [data, setData] = useState(() => parseProfileComponents(initial?.components));

  useEffect(() => {
    (async () => {
      try {
        const [emps, strs] = await Promise.all([
          base44.entities.Employee.list("-updated_date", 500),
          base44.entities.SalaryStructure.list("-updated_date", 200),
        ]);
        setEmployees(emps);
        setStructures(strs);
      } catch { /* ignore */ }
    })();
  }, []);

  const structureMap = useMemo(() => {
    const m = {};
    structures.forEach((s) => (m[s.id] = s));
    return m;
  }, [structures]);

  const onEmployeeChange = (id) => {
    setEmployeeId(id);
    const emp = employees.find((e) => e.id === id);
    setEmployeeEmail(emp?.work_email || emp?.personal_email || "");
  };

  const applyStructure = (id) => {
    setStructureId(id);
    const structure = structureMap[id];
    if (structure) {
      setData(computeFromStructure(structure, basic));
    }
  };

  const onBasicChange = (value) => {
    setBasic(value);
    const structure = structureMap[structureId];
    if (structure) setData(computeFromStructure(structure, value));
    else setData((d) => assemble(d.earnings, d.deductions, d.employer_pf, d.employer_esi));
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit({
      employee_id: employeeId,
      employee_email: employeeEmail,
      basic: Number(basic) || 0,
      salary_structure_id: structureId,
      ctc: data.ctc,
      effective_date: effectiveDate,
      components: JSON.stringify({
        earnings: data.earnings,
        deductions: data.deductions,
        employer_pf: data.employer_pf,
        employer_esi: data.employer_esi,
      }),
    });
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="mb-1.5 block">Employee <span className="text-destructive">*</span></Label>
          <Select value={employeeId} onValueChange={onEmployeeChange}>
            <SelectTrigger><SelectValue placeholder="Select employee..." /></SelectTrigger>
            <SelectContent>
              {employees.map((e) => (
                <SelectItem key={e.id} value={e.id}>
                  {e.first_name} {e.last_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-1.5 block">Employee Email</Label>
          <Input value={employeeEmail} readOnly placeholder="Auto-filled from employee" className="bg-muted/40" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="mb-1.5 block">Basic</Label>
          <Input type="number" value={basic} onChange={(e) => onBasicChange(e.target.value)} placeholder="Enter basic first" />
        </div>
        <div>
          <Label className="mb-1.5 block">Salary Structure</Label>
          <Select value={structureId} onValueChange={applyStructure}>
            <SelectTrigger><SelectValue placeholder="Select structure..." /></SelectTrigger>
            <SelectContent>
              {structures.map((s) => (
                <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="mb-1.5 block">CTC (auto-calculated)</Label>
          <Input value={formatMoney(data.ctc)} readOnly className="bg-muted/40 font-semibold" />
        </div>
        <div>
          <Label className="mb-1.5 block">Effective Date</Label>
          <Input type="date" value={effectiveDate} onChange={(e) => setEffectiveDate(e.target.value)} />
        </div>
      </div>

      <div>
        <Label className="mb-2 block">Components (per-employee editable)</Label>
        <ComponentsEditor data={data} onChange={setData} />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="text-sm text-muted-foreground hover:text-foreground px-3 py-2">Cancel</button>
        <button type="submit" disabled={saving} className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50">
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}