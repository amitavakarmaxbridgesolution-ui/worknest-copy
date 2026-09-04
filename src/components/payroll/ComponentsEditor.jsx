import React from "react";
import { assemble, formatMoney } from "@/lib/payrollCalc";
import { Input } from "@/components/ui/input";

// Editable earnings + deductions tables for a payroll profile.
// data = assembled object; onChange(assembled) called on every edit.
export default function ComponentsEditor({ data, onChange }) {
  const commit = (next) => onChange(assemble(next.earnings, next.deductions, next.employer_pf, next.employer_esi));

  const setEarning = (i, amount) => {
    const earnings = data.earnings.map((e, idx) => (idx === i ? { ...e, amount: Number(amount || 0) } : e));
    commit({ ...data, earnings });
  };
  const setDeduction = (i, amount) => {
    const deductions = data.deductions.map((d, idx) => (idx === i ? { ...d, amount: Number(amount || 0) } : d));
    commit({ ...data, deductions });
  };

  const Th = ({ children, right }) => (
    <th className={`border-b border-black px-3 py-1.5 text-xs font-bold ${right ? "text-right" : "text-left"}`}>{children}</th>
  );

  return (
    <div className="space-y-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
        {/* Earnings */}
        <div className="border border-black">
          <table className="w-full">
            <thead>
              <tr className="bg-black/5">
                <Th>Earnings</Th>
                <Th right>Amount</Th>
              </tr>
            </thead>
            <tbody>
              {data.earnings.length === 0 && (
                <tr><td className="px-3 py-2 text-sm text-muted-foreground" colSpan={2}>No earnings components.</td></tr>
              )}
              {data.earnings.map((e, i) => (
                <tr key={i} className="border-t border-black">
                  <td className="border-r border-black px-2 py-1 text-sm">{e.name}</td>
                  <td className="px-2 py-1">
                    <Input
                      type="number"
                      value={e.amount}
                      onChange={(ev) => setEarning(i, ev.target.value)}
                      className="h-8 text-right tabular-nums"
                    />
                  </td>
                </tr>
              ))}
              <tr className="border-t border-black bg-black/5">
                <td className="border-r border-black px-3 py-1.5 text-sm font-bold">(A) Total Earnings</td>
                <td className="px-3 py-1.5 text-sm font-bold text-right tabular-nums">{formatMoney(data.totalEarnings)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Deductions */}
        <div className="border border-black sm:border-l-0">
          <table className="w-full">
            <thead>
              <tr className="bg-black/5">
                <Th>Deductions</Th>
                <Th right>Amount</Th>
              </tr>
            </thead>
            <tbody>
              {data.deductions.length === 0 && (
                <tr><td className="px-3 py-2 text-sm text-muted-foreground" colSpan={2}>No deduction components.</td></tr>
              )}
              {data.deductions.map((d, i) => (
                <tr key={i} className="border-t border-black">
                  <td className="border-r border-black px-2 py-1 text-sm">{d.name}</td>
                  <td className="px-2 py-1">
                    <Input
                      type="number"
                      value={d.amount}
                      onChange={(ev) => setDeduction(i, ev.target.value)}
                      className="h-8 text-right tabular-nums"
                    />
                  </td>
                </tr>
              ))}
              <tr className="border-t border-black bg-black/5">
                <td className="border-r border-black px-3 py-1.5 text-sm font-bold">(B) Total Deductions</td>
                <td className="px-3 py-1.5 text-sm font-bold text-right tabular-nums">{formatMoney(data.totalDeductions)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Employer contributions + summary */}
      <div className="border border-black border-t-0">
        <table className="w-full">
          <tbody>
            <tr className="border-b border-black">
              <td className="border-r border-black px-3 py-1.5 text-sm font-bold">Net Salary (C) = (A) – (B)</td>
              <td className="px-3 py-1.5 text-sm font-bold text-right tabular-nums">{formatMoney(data.netSalary)}</td>
            </tr>
            <tr className="border-b border-black">
              <td className="border-r border-black px-3 py-1.5 text-sm">
                <span className="font-semibold">EMPLOYER PF (D)</span>
                <Input
                  type="number"
                  value={data.employer_pf}
                  onChange={(ev) => commit({ ...data, employer_pf: Number(ev.target.value || 0) })}
                  className="h-8 w-40 ml-3 inline-block text-right tabular-nums"
                />
              </td>
              <td className="px-3 py-1.5 text-sm">
                <span className="font-semibold">EMPLOYER ESI (E)</span>
                <Input
                  type="number"
                  value={data.employer_esi}
                  onChange={(ev) => commit({ ...data, employer_esi: Number(ev.target.value || 0) })}
                  className="h-8 w-40 ml-3 inline-block text-right tabular-nums"
                />
              </td>
            </tr>
            <tr className="border-b border-black">
              <td className="border-r border-black px-3 py-1.5 text-sm font-bold">CTC = (B) + (C) + (D) + (E)</td>
              <td className="px-3 py-1.5 text-sm font-bold text-right tabular-nums">{formatMoney(data.ctc)}</td>
            </tr>
            <tr>
              <td className="px-3 py-1.5 text-sm font-bold" colSpan={2}>
                Net salary in Words ***{data.inWords}***
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}