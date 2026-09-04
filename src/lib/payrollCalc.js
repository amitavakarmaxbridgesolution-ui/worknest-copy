// Shared payroll calculation helpers for Salary Structures and Payroll Profiles.

const blankComponents = () => ({ earnings: [], deductions: [], employer_pf: 0, employer_esi: 0 });

// Normalize a structure's stored components string into a clean array.
export const parseComponents = (raw) => {
  try {
    const arr = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (!Array.isArray(arr)) return [];
    return arr.map((c, i) => ({
      name: c.name || c.code || c.label || `Component ${i + 1}`,
      code: c.code || (c.name || `comp${i}`).toString().toLowerCase().replace(/[^a-z0-9]+/g, "_"),
      type: c.type === "deduction" ? "deduction" : "earning",
      calc_type: c.calc_type === "percentage" ? "percentage" : "fixed",
      value: Number(c.value || 0),
    }));
  } catch {
    return [];
  }
};

// Parse a payroll profile's stored components JSON.
export const parseProfileComponents = (raw) => {
  try {
    const o = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (!o) return blankComponents();
    return {
      earnings: Array.isArray(o.earnings) ? o.earnings.map((x) => ({ name: x.name, amount: Number(x.amount || 0) })) : [],
      deductions: Array.isArray(o.deductions) ? o.deductions.map((x) => ({ name: x.name, amount: Number(x.amount || 0) })) : [],
      employer_pf: Number(o.employer_pf || 0),
      employer_esi: Number(o.employer_esi || 0),
    };
  } catch {
    return blankComponents();
  }
};

const calcAmount = (c, basic) => {
  const base = Number(basic) || 0;
  if (c.calc_type === "percentage") return Math.round((base * (Number(c.value || 0) / 100)) * 100) / 100;
  return Number(c.value || 0);
};

const employerAmount = (structure, which, basic) => {
  const type = which === "pf" ? structure?.employer_pf_type : structure?.employer_esi_type;
  const value = Number(which === "pf" ? structure?.employer_pf_value : structure?.employer_esi_value) || 0;
  if (type === "percentage") return Math.round(((Number(basic) || 0) * value) / 100);
  return value;
};

// Compute the full breakdown from a structure + a basic salary.
export const computeFromStructure = (structure, basic) => {
  const comps = parseComponents(structure?.components);
  const earnings = comps.filter((c) => c.type === "earning").map((c) => ({ name: c.name, amount: calcAmount(c, basic) }));
  const deductions = comps.filter((c) => c.type === "deduction").map((c) => ({ name: c.name, amount: calcAmount(c, basic) }));
  const employer_pf = employerAmount(structure, "pf", basic);
  const employer_esi = employerAmount(structure, "esi", basic);
  return assemble(earnings, deductions, employer_pf, employer_esi);
};

// Assemble final totals (A) earnings, (B) deductions, (C) net, (D) employer PF, (E) employer ESI, CTC.
export const assemble = (earnings, deductions, employer_pf = 0, employer_esi = 0) => {
  const totalEarnings = earnings.reduce((s, e) => s + Number(e.amount || 0), 0);
  const totalDeductions = deductions.reduce((s, d) => s + Number(d.amount || 0), 0);
  const netSalary = totalEarnings - totalDeductions;
  // CTC = (B) + (C) + (D) + (E) = totalEarnings + employer contributions
  const ctc = totalEarnings + Number(employer_pf) + Number(employer_esi);
  return {
    earnings,
    deductions,
    employer_pf: Number(employer_pf) || 0,
    employer_esi: Number(employer_esi) || 0,
    totalEarnings,
    totalDeductions,
    netSalary,
    ctc,
    inWords: "Rupees " + numberToWords(Math.round(netSalary)) + " Only",
  };
};

export const formatMoney = (n) =>
  Number(n || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Indian numbering system words.
export function numberToWords(num) {
  num = Math.round(num);
  if (num === 0) return "Zero";
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const twoDigits = (n) => (n < 20 ? ones[n] : tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : ""));
  const threeDigits = (n) => {
    const h = Math.floor(n / 100);
    const r = n % 100;
    let s = "";
    if (h) s += ones[h] + " Hundred";
    if (r) s += (h ? " " : "") + twoDigits(r);
    return s;
  };
  let crore = Math.floor(num / 10000000); num %= 10000000;
  let lakh = Math.floor(num / 100000); num %= 100000;
  let thousand = Math.floor(num / 1000); num %= 1000;
  const rest = num;
  let s = "";
  if (crore) s += twoDigits(crore) + " Crore ";
  if (lakh) s += twoDigits(lakh) + " Lakh ";
  if (thousand) s += twoDigits(thousand) + " Thousand ";
  if (rest) s += threeDigits(rest);
  return s.trim();
}