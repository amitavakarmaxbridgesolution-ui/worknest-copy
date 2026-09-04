import React, { useState, useMemo, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";
import SalaryBreakdownTable from "@/components/payroll/SalaryBreakdownTable";
import { parseComponents, computeFromStructure } from "@/lib/payrollCalc";

const CALC_TYPES = [
  { value: "percentage", label: "% of Basic" },
  { value: "fixed", label: "Fixed" },
];

const defaultRow = (type) => ({ name: "", code: "", type, calc_type: "percentage", value: 0 });

export default function StructureForm({ initial, onSubmit, onCancel, saving }) {
  const [name, setName] = useState(initial?.name || "");
  const [status, setStatus] = useState(initial?.status || "active");
  const [baseSalary, setBaseSalary] = useState(initial?.base_salary || 0);
  const [components, setComponents] = useState(() => parseComponents(initial?.components));
  const [empPfType, setEmpPfType] = useState(initial?.employer_pf_type || "fixed");
  const [empPfValue, setEmpPfValue] = useState(initial?.employer_pf_value || 0);
  const [empEsiType, setEmpEsiType] = useState(initial?.employer_esi_type || "fixed");
  const [empEsiValue, setEmpEsiValue] = useState(initial?.employer_esi_value || 0);
  const [salaryComponents, setSalaryComponents] = useState([]);

  useEffect(() => {
    base44.entities.SalaryComponent.list("-updated_date", 500)
      .then(setSalaryComponents)
      .catch(() => {});
  }, []);

  const earningComps = useMemo(() => salaryComponents.filter((r) => r.type === "earning"), [salaryComponents]);
  const deductionComps = useMemo(() => salaryComponents.filter((r) => r.type === "deduction"), [salaryComponents]);

  const earnings = components.filter((c) => c.type === "earning");
  const deductions = components.filter((c) => c.type === "deduction");

  const preview = useMemo(() => {
    const structure = {
      components: JSON.stringify(components),
      employer_pf_type: empPfType,
      employer_pf_value: empPfValue,
      employer_esi_type: empEsiType,
      employer_esi_value: empEsiValue,
    };
    return computeFromStructure(structure, baseSalary);
  }, [components, baseSalary, empPfType, empPfValue, empEsiType, empEsiValue]);

  const updateComp = (idx, patch) =>
    setComponents((cs) => cs.map((c, i) => (i === idx ? { ...c, ...patch } : c)));
  const removeComp = (idx) => setComponents((cs) => cs.filter((_, i) => i !== idx));
  const addComp = (type) => setComponents((cs) => [...cs, defaultRow(type)]);

  const pickComponent = (idx, value, list) => {
    if (value === "__custom__") {
      updateComp(idx, { custom: true, _id: "", name: "", code: "" });
      return;
    }
    const found = list.find((r) => r.id === value);
    if (found) {
      updateComp(idx, {
        _id: found.id,
        name: found.name,
        code: found.code || found.name.toLowerCase().replace(/[^a-z0-9]+/g, "_"),
        calc_type: found.calculation_type || "percentage",
        value: found.default_value || 0,
        custom: false,
      });
    }
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      status,
      base_salary: Number(baseSalary) || 0,
      components: JSON.stringify(components.map(({ _id, custom, ...rest }) => rest)),
      employer_pf_type: empPfType,
      employer_pf_value: Number(empPfValue) || 0,
      employer_esi_type: empEsiType,
      employer_esi_value: Number(empEsiValue) || 0,
    });
  };

  const renderRow = (c, idx, list) => {
    const selectedId = c._id || (c.name ? list.find((r) => r.name === c.name)?.id : "");
    const isCustom = c.custom || (!selectedId && !!c.name);
    return (
    <tr key={idx} className="border-t">
      <td className="px-2 py-1">
        {isCustom ? (
          <Input
            value={c.name}
            onChange={(ev) => updateComp(idx, { name: ev.target.value, code: ev.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "_") })}
            placeholder="Component name"
            className="h-8"
          />
        ) : (
          <Select value={selectedId} onValueChange={(v) => pickComponent(idx, v, list)}>
            <SelectTrigger className="h-8"><SelectValue placeholder="Select component" /></SelectTrigger>
            <SelectContent>
              {list.map((r) => <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>)}
              <SelectItem value="__custom__">+ Custom...</SelectItem>
            </SelectContent>
          </Select>
        )}
      </td>
      <td className="px-2 py-1 w-40">
        <Select value={c.calc_type} onValueChange={(v) => updateComp(idx, { calc_type: v })}>
          <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
          <SelectContent>
            {CALC_TYPES.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </td>
      <td className="px-2 py-1 w-32">
        <Input
          type="number"
          value={c.value}
          onChange={(ev) => updateComp(idx, { value: Number(ev.target.value || 0) })}
          className="h-8 text-right tabular-nums"
        />
      </td>
      <td className="px-2 py-1 w-10 text-center">
        <button type="button" onClick={() => removeComp(idx)} className="p-1 rounded hover:bg-muted">
          <Trash2 className="h-4 w-4 text-destructive" />
        </button>
      </td>
    </tr>
  );
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label className="mb-1.5 block">Structure Name <span className="text-destructive">*</span></Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <Label className="mb-1.5 block">Default Basic</Label>
          <Input type="number" value={baseSalary} onChange={(e) => setBaseSalary(e.target.value)} />
        </div>
        <div>
          <Label className="mb-1.5 block">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="border rounded-lg">
          <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/50">
            <span className="text-sm font-semibold">Earnings</span>
            <Button type="button" size="sm" variant="outline" onClick={() => addComp("earning")}>
              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-xs text-muted-foreground">
                <th className="px-2 py-1.5 text-left">Component</th>
                <th className="px-2 py-1.5 text-left">Calc</th>
                <th className="px-2 py-1.5 text-right">Value</th>
                <th className="px-2 py-1.5"></th>
              </tr>
            </thead>
            <tbody>
              {earnings.length === 0 && (
                <tr><td className="px-3 py-3 text-sm text-muted-foreground" colSpan={4}>No earnings components.</td></tr>
              )}
              {components.map((c, idx) => (c.type === "earning" ? renderRow(c, idx, earningComps) : null))}
            </tbody>
          </table>
        </div>

        <div className="border rounded-lg">
          <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/50">
            <span className="text-sm font-semibold">Deductions</span>
            <Button type="button" size="sm" variant="outline" onClick={() => addComp("deduction")}>
              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-xs text-muted-foreground">
                <th className="px-2 py-1.5 text-left">Component</th>
                <th className="px-2 py-1.5 text-left">Calc</th>
                <th className="px-2 py-1.5 text-right">Value</th>
                <th className="px-2 py-1.5"></th>
              </tr>
            </thead>
            <tbody>
              {deductions.length === 0 && (
                <tr><td className="px-3 py-3 text-sm text-muted-foreground" colSpan={4}>No deduction components.</td></tr>
              )}
              {components.map((c, idx) => (c.type === "deduction" ? renderRow(c, idx, deductionComps) : null))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employer contributions */}
      <div className="border rounded-lg p-3">
        <span className="text-sm font-semibold">Employer Contributions (for CTC)</span>
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div className="flex items-center gap-2">
            <Label className="whitespace-nowrap">Employer PF</Label>
            <Select value={empPfType} onValueChange={setEmpPfType}>
              <SelectTrigger className="w-32 h-8"><SelectValue /></SelectTrigger>
              <SelectContent>{CALC_TYPES.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
            </Select>
            <Input type="number" value={empPfValue} onChange={(e) => setEmpPfValue(e.target.value)} className="h-8 w-32" />
          </div>
          <div className="flex items-center gap-2">
            <Label className="whitespace-nowrap">Employer ESI</Label>
            <Select value={empEsiType} onValueChange={setEmpEsiType}>
              <SelectTrigger className="w-32 h-8"><SelectValue /></SelectTrigger>
              <SelectContent>{CALC_TYPES.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
            </Select>
            <Input type="number" value={empEsiValue} onChange={(e) => setEmpEsiValue(e.target.value)} className="h-8 w-32" />
          </div>
        </div>
      </div>

      {/* Live preview */}
      <div>
        <span className="text-sm font-semibold">Preview (with Default Basic)</span>
        <div className="mt-2"><SalaryBreakdownTable data={preview} /></div>
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