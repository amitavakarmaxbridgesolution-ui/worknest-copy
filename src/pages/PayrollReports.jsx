import React, { useEffect, useMemo, useState } from "react";
import { base44 } from "@/api/base44Client";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const num = (n) =>
  Number(n || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const sumComp = (json) => {
  try {
    const arr = typeof json === "string" ? JSON.parse(json) : json;
    if (!Array.isArray(arr)) return 0;
    return arr.reduce((s, o) => s + (Object.values(o)[0] || 0), 0);
  } catch {
    return 0;
  }
};
const compVal = (json, name) => {
  try {
    const arr = typeof json === "string" ? JSON.parse(json) : json;
    if (!Array.isArray(arr)) return 0;
    const f = arr.find((o) => Object.keys(o)[0] === name);
    return f ? Object.values(f)[0] : 0;
  } catch {
    return 0;
  }
};
const snap = (json, key) => {
  try {
    const o = typeof json === "string" ? JSON.parse(json) : json;
    return o?.[key];
  } catch {
    return undefined;
  }
};

const fmtPeriod = (p) => {
  if (!p) return "—";
  const s = new Date(p.start_date);
  const e = new Date(p.end_date);
  const sy = MONTHS[s.getMonth()];
  const ey = MONTHS[e.getMonth()];
  const range =
    sy === ey ? `${sy} ${s.getDate()}–${e.getDate()}` : `${sy} ${s.getDate()}–${ey} ${e.getDate()}`;
  return `${range}, ${e.getFullYear()}`;
};
const periodCode = (p) => {
  if (!p) return "----";
  const d = new Date(p.start_date);
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}`;
};

const TABS = ["Salary Sheet", "Pf Register", "Pt Register", "Tax Register", "Loan Ledger", "Ytd"];

export default function PayrollReports() {
  const [tab, setTab] = useState("Salary Sheet");
  const [periods, setPeriods] = useState([]);
  const [payslips, setPayslips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [depts, setDepts] = useState([]);
  const [loans, setLoans] = useState([]);
  const [periodId, setPeriodId] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [ps, emps, dpt, lns] = await Promise.all([
          base44.entities.Payslip.list("-updated_date", 500),
          base44.entities.Employee.list("-updated_date", 500),
          base44.entities.Department.list("-updated_date", 200),
          base44.entities.Loan.list("-updated_date", 500),
        ]);
        setPayslips(ps);
        setEmployees(emps);
        setDepts(dpt);
        setLoans(lns);
        const pp = await base44.entities.PayrollPeriod.list("-updated_date", 200);
        setPeriods(pp);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const empMap = useMemo(() => {
    const m = {};
    employees.forEach((e) => (m[e.id] = e));
    return m;
  }, [employees]);
  const deptMap = useMemo(() => {
    const m = {};
    depts.forEach((d) => (m[d.id] = d.name));
    return m;
  }, [depts]);
  const periodMap = useMemo(() => {
    const m = {};
    periods.forEach((p) => (m[p.id] = p));
    return m;
  }, [periods]);

  const year = periods[0]?.year || new Date().getFullYear();

  const filteredPayslips = useMemo(() => {
    if (periodId === "all") return payslips;
    return payslips.filter((p) => p.payroll_period_id === periodId);
  }, [payslips, periodId]);

  const salaryRows = useMemo(() => {
    let i = 0;
    return filteredPayslips
      .map((p) => {
        const emp = empMap[p.employee_id];
        if (!emp) return null;
        const period = periodMap[p.payroll_period_id];
        const gross = sumComp(p.earnings);
        const ded = sumComp(p.deductions);
        i += 1;
        return {
          ref: `PS-${periodCode(period)}-${i}`,
          employee: `${emp.first_name} ${emp.last_name}`,
          code: emp.employee_code,
          department: deptMap[emp.department_id] || "—",
          period: fmtPeriod(period),
          paidDays: snap(p.snapshot, "paid_days") ?? 30,
          lopDays: snap(p.snapshot, "lop_days") ?? 0,
          gross,
          deductions: ded,
          net: p.net_pay,
          currency: snap(p.snapshot, "currency") || "USD",
        };
      })
      .filter(Boolean);
  }, [filteredPayslips, empMap, deptMap, periodMap]);

  const pfRows = useMemo(
    () =>
      filteredPayslips
        .map((p) => {
          const emp = empMap[p.employee_id];
          if (!emp) return null;
          const period = periodMap[p.payroll_period_id];
          const basic = compVal(p.earnings, "Basic");
          const wages = Math.min(basic, 15000);
          return {
            employee: `${emp.first_name} ${emp.last_name}`,
            code: emp.employee_code,
            period: period?.name || "—",
            pfWages: wages,
            employeePf: wages * 0.12,
            employerPf: wages * 0.12,
            currency: snap(p.snapshot, "currency") || "USD",
          };
        })
        .filter(Boolean),
    [filteredPayslips, empMap, periodMap]
  );

  const ptRows = useMemo(
    () =>
      filteredPayslips
        .map((p) => {
          const emp = empMap[p.employee_id];
          if (!emp) return null;
          const period = periodMap[p.payroll_period_id];
          return {
            employee: `${emp.first_name} ${emp.last_name}`,
            code: emp.employee_code,
            period: period?.name || "—",
            gross: sumComp(p.earnings),
            pt: compVal(p.deductions, "PT"),
            currency: snap(p.snapshot, "currency") || "USD",
          };
        })
        .filter(Boolean),
    [filteredPayslips, empMap, periodMap]
  );

  const taxRows = useMemo(
    () =>
      filteredPayslips
        .map((p) => {
          const emp = empMap[p.employee_id];
          if (!emp) return null;
          const period = periodMap[p.payroll_period_id];
          const gross = sumComp(p.earnings);
          const pf = compVal(p.deductions, "PF");
          const tds = compVal(p.deductions, "TDS");
          return {
            employee: `${emp.first_name} ${emp.last_name}`,
            code: emp.employee_code,
            period: period?.name || "—",
            gross,
            pf,
            tds,
            net: p.net_pay,
            currency: snap(p.snapshot, "currency") || "USD",
          };
        })
        .filter(Boolean),
    [filteredPayslips, empMap, periodMap]
  );

  const loanRows = useMemo(
    () =>
      loans
        .map((l) => {
          const emp = empMap[l.employee_id];
          if (!emp) return null;
          return {
            employee: `${emp.first_name} ${emp.last_name}`,
            code: emp.employee_code,
            principal: l.principal || l.amount || 0,
            emi: l.emi || 0,
            tenure: l.tenure_months || 0,
            status: l.status || "—",
          };
        })
        .filter(Boolean),
    [loans, empMap]
  );

  const ytdRows = useMemo(() => {
    const m = {};
    filteredPayslips.forEach((p) => {
      const emp = empMap[p.employee_id];
      if (!emp) return;
      if (!m[emp.id]) {
        m[emp.id] = {
          employee: `${emp.first_name} ${emp.last_name}`,
          code: emp.employee_code,
          department: deptMap[emp.department_id] || "—",
          gross: 0,
          deductions: 0,
          net: 0,
        };
      }
      m[emp.id].gross += sumComp(p.earnings);
      m[emp.id].deductions += sumComp(p.deductions);
      m[emp.id].net += p.net_pay || 0;
    });
    return Object.values(m);
  }, [filteredPayslips, empMap, deptMap]);

  const exportCsv = () => {
    let headers, rows;
    if (tab === "Salary Sheet") {
      headers = ["REFERENCE", "EMPLOYEE", "CODE", "DEPARTMENT", "PERIOD", "PAID DAYS", "LOP DAYS", "GROSS", "DEDUCTIONS", "NET PAY", "CURRENCY"];
      rows = salaryRows.map((r) => [r.ref, r.employee, r.code, r.department, r.period, r.paidDays, r.lopDays, r.gross, r.deductions, r.net, r.currency]);
    } else if (tab === "Pf Register") {
      headers = ["EMPLOYEE", "CODE", "PERIOD", "PF WAGES", "EMPLOYEE PF", "EMPLOYER PF", "CURRENCY"];
      rows = pfRows.map((r) => [r.employee, r.code, r.period, r.pfWages, r.employeePf, r.employerPf, r.currency]);
    } else if (tab === "Pt Register") {
      headers = ["EMPLOYEE", "CODE", "PERIOD", "GROSS", "PT", "CURRENCY"];
      rows = ptRows.map((r) => [r.employee, r.code, r.period, r.gross, r.pt, r.currency]);
    } else if (tab === "Tax Register") {
      headers = ["EMPLOYEE", "CODE", "PERIOD", "GROSS", "PF", "TDS", "NET", "CURRENCY"];
      rows = taxRows.map((r) => [r.employee, r.code, r.period, r.gross, r.pf, r.tds, r.net, r.currency]);
    } else if (tab === "Loan Ledger") {
      headers = ["EMPLOYEE", "CODE", "PRINCIPAL", "EMI", "TENURE", "STATUS"];
      rows = loanRows.map((r) => [r.employee, r.code, r.principal, r.emi, r.tenure, r.status]);
    } else {
      headers = ["EMPLOYEE", "CODE", "DEPARTMENT", "GROSS YTD", "DEDUCTIONS YTD", "NET YTD"];
      rows = ytdRows.map((r) => [r.employee, r.code, r.department, r.gross, r.deductions, r.net]);
    }
    const csv = [headers, ...rows]
      .map((row) => row.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payroll-report-${tab.replace(/\s+/g, "-").toLowerCase()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const Th = ({ children, right }) => (
    <th className={`px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide ${right ? "text-right" : "text-left"}`}>
      {children}
    </th>
  );
  const Td = ({ children, right }) => (
    <td className={`px-4 py-3 text-sm ${right ? "text-right tabular-nums" : "text-left"}`}>{children}</td>
  );

  return (
    <div>
      <PageHeader
        title="Payroll Reports"
        description="Salary Sheet."
        actions={
          <Button
            onClick={exportCsv}
            variant="outline"
            className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-600"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Export Excel
          </Button>
        }
      />

      <div className="rounded-lg border bg-card">
        <div className="flex flex-wrap gap-2 border-b p-3">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium border transition-colors ${
                tab === t
                  ? "bg-violet-600 text-white border-violet-600"
                  : "bg-white text-foreground border-gray-200 hover:bg-muted"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 border-b p-3">
          <select
            value={periodId}
            onChange={(e) => setPeriodId(e.target.value)}
            className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
          >
            <option value="all">All pay periods</option>
            {periods.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <span className="text-sm font-medium text-muted-foreground">{year}</span>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-10 text-center text-sm text-muted-foreground">Loading payroll data…</div>
          ) : tab === "Salary Sheet" ? (
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <Th>Reference</Th><Th>Employee</Th><Th>Code</Th><Th>Department</Th><Th>Period</Th>
                  <Th right>Paid Days</Th><Th right>Lop Days</Th><Th right>Gross</Th><Th right>Deductions</Th><Th right>Net Pay</Th><Th>Currency</Th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {salaryRows.length === 0 && (
                  <tr><td className="p-6 text-center text-sm text-muted-foreground" colSpan={11}>No payslips found.</td></tr>
                )}
                {salaryRows.map((r, i) => (
                  <tr key={i} className="hover:bg-muted/30">
                    <Td>{r.ref}</Td><Td>{r.employee}</Td><Td>{r.code}</Td><Td>{r.department}</Td><Td>{r.period}</Td>
                    <Td right>{Number(r.paidDays).toFixed(2)}</Td><Td right>{Number(r.lopDays).toFixed(2)}</Td>
                    <Td right>{num(r.gross)}</Td><Td right>{num(r.deductions)}</Td><Td right>{num(r.net)}</Td><Td>{r.currency}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : tab === "Pf Register" ? (
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr><Th>Employee</Th><Th>Code</Th><Th>Period</Th><Th right>Pf Wages</Th><Th right>Employee Pf</Th><Th right>Employer Pf</Th><Th>Currency</Th></tr>
              </thead>
              <tbody className="divide-y">
                {pfRows.length === 0 && <tr><td className="p-6 text-center text-sm text-muted-foreground" colSpan={7}>No records.</td></tr>}
                {pfRows.map((r, i) => (
                  <tr key={i} className="hover:bg-muted/30">
                    <Td>{r.employee}</Td><Td>{r.code}</Td><Td>{r.period}</Td><Td right>{num(r.pfWages)}</Td><Td right>{num(r.employeePf)}</Td><Td right>{num(r.employerPf)}</Td><Td>{r.currency}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : tab === "Pt Register" ? (
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr><Th>Employee</Th><Th>Code</Th><Th>Period</Th><Th right>Gross</Th><Th right>Pt</Th><Th>Currency</Th></tr>
              </thead>
              <tbody className="divide-y">
                {ptRows.length === 0 && <tr><td className="p-6 text-center text-sm text-muted-foreground" colSpan={6}>No records.</td></tr>}
                {ptRows.map((r, i) => (
                  <tr key={i} className="hover:bg-muted/30">
                    <Td>{r.employee}</Td><Td>{r.code}</Td><Td>{r.period}</Td><Td right>{num(r.gross)}</Td><Td right>{num(r.pt)}</Td><Td>{r.currency}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : tab === "Tax Register" ? (
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr><Th>Employee</Th><Th>Code</Th><Th>Period</Th><Th right>Gross</Th><Th right>Pf</Th><Th right>Tds</Th><Th right>Net</Th><Th>Currency</Th></tr>
              </thead>
              <tbody className="divide-y">
                {taxRows.length === 0 && <tr><td className="p-6 text-center text-sm text-muted-foreground" colSpan={8}>No records.</td></tr>}
                {taxRows.map((r, i) => (
                  <tr key={i} className="hover:bg-muted/30">
                    <Td>{r.employee}</Td><Td>{r.code}</Td><Td>{r.period}</Td><Td right>{num(r.gross)}</Td><Td right>{num(r.pf)}</Td><Td right>{num(r.tds)}</Td><Td right>{num(r.net)}</Td><Td>{r.currency}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : tab === "Loan Ledger" ? (
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr><Th>Employee</Th><Th>Code</Th><Th right>Principal</Th><Th right>Emi</Th><Th right>Tenure</Th><Th>Status</Th></tr>
              </thead>
              <tbody className="divide-y">
                {loanRows.length === 0 && <tr><td className="p-6 text-center text-sm text-muted-foreground" colSpan={6}>No loans.</td></tr>}
                {loanRows.map((r, i) => (
                  <tr key={i} className="hover:bg-muted/30">
                    <Td>{r.employee}</Td><Td>{r.code}</Td><Td right>{num(r.principal)}</Td><Td right>{num(r.emi)}</Td><Td right>{r.tenure}</Td><Td>{r.status}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr><Th>Employee</Th><Th>Code</Th><Th>Department</Th><Th right>Gross Ytd</Th><Th right>Deductions Ytd</Th><Th right>Net Ytd</Th></tr>
              </thead>
              <tbody className="divide-y">
                {ytdRows.length === 0 && <tr><td className="p-6 text-center text-sm text-muted-foreground" colSpan={6}>No records.</td></tr>}
                {ytdRows.map((r, i) => (
                  <tr key={i} className="hover:bg-muted/30">
                    <Td>{r.employee}</Td><Td>{r.code}</Td><Td>{r.department}</Td><Td right>{num(r.gross)}</Td><Td right>{num(r.deductions)}</Td><Td right>{num(r.net)}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}