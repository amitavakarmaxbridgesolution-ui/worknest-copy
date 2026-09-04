import React from "react";
import { formatMoney } from "@/lib/payrollCalc";

// Read-only salary breakdown matching the reference layout (image 1).
// data = assembled object from payrollCalc.assemble / computeFromStructure.
export default function SalaryBreakdownTable({ data }) {
  if (!data) return null;
  const earnings = data.earnings || [];
  const deductions = data.deductions || [];

  const Cell = ({ children, right, bold, className = "" }) => (
    <td
      className={`border border-black px-3 py-1.5 text-sm ${bold ? "font-bold" : ""} ${
        right ? "text-right tabular-nums" : "text-left"
      } ${className}`}
    >
      {children}
    </td>
  );

  return (
    <div className="space-y-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
        {/* Earnings */}
        <div className="border border-black">
          <table className="w-full">
            <thead>
              <tr className="bg-black/5">
                <th className="border-b border-r border-black px-3 py-1.5 text-left text-xs font-bold w-16">SERIAL NO.</th>
                <th className="border-b border-r border-black px-3 py-1.5 text-left text-xs font-bold">Earnings</th>
                <th className="border-b border-black px-3 py-1.5 text-right text-xs font-bold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {earnings.map((e, i) => (
                <tr key={i}>
                  <Cell right>{i + 1}</Cell>
                  <Cell>{e.name}</Cell>
                  <Cell right>{formatMoney(e.amount)}</Cell>
                </tr>
              ))}
              <tr>
                <td className="border-t border-black px-3 py-1.5"></td>
                <td className="border-t border-l border-black px-3 py-1.5 text-sm font-bold">(A) Total Earnings</td>
                <td className="border-t border-black px-3 py-1.5 text-sm font-bold text-right tabular-nums">
                  {formatMoney(data.totalEarnings)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Deductions */}
        <div className="border border-black sm:border-l-0">
          <table className="w-full">
            <thead>
              <tr className="bg-black/5">
                <th className="border-b border-r border-black px-3 py-1.5 text-left text-xs font-bold w-16">SERIAL NO.</th>
                <th className="border-b border-r border-black px-3 py-1.5 text-left text-xs font-bold">Deductions</th>
                <th className="border-b border-black px-3 py-1.5 text-right text-xs font-bold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {deductions.map((d, i) => (
                <tr key={i}>
                  <Cell right>{i + 1}</Cell>
                  <Cell>{d.name}</Cell>
                  <Cell right>{formatMoney(d.amount)}</Cell>
                </tr>
              ))}
              <tr>
                <td className="border-t border-black px-3 py-1.5"></td>
                <td className="border-t border-l border-black px-3 py-1.5 text-sm font-bold">(B) Total Deductions</td>
                <td className="border-t border-black px-3 py-1.5 text-sm font-bold text-right tabular-nums">
                  {formatMoney(data.totalDeductions)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary rows */}
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
                <span className="ml-4 tabular-nums">{formatMoney(data.employer_pf)}</span>
              </td>
              <td className="px-3 py-1.5 text-sm">
                <span className="font-semibold">EMPLOYER ESI (E)</span>
                <span className="ml-4 tabular-nums">{formatMoney(data.employer_esi)}</span>
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