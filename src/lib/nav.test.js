import { describe, it, expect } from "vitest";
import { navItems } from "@/lib/nav";

describe("Sidebar navigation config", () => {
  it("includes a Branches entry pointing at /branches, restricted to admin", () => {
    const allItems = navItems.flatMap((g) => g.items);
    const branchItem = allItems.find((it) => it.path === "/branches");

    expect(branchItem).toBeDefined();
    expect(branchItem.label).toMatch(/Branch/i);
    expect(branchItem.roles).toEqual(["admin"]);
  });

  it("includes nav entries for all org-structure CRUD modules", () => {
    const allItems = navItems.flatMap((g) => g.items);
    const expected = [
      { path: "/company", label: /Compan/i },
      { path: "/departments", label: /Department/i },
      { path: "/teams", label: /Team/i },
      { path: "/designations", label: /Designation/i },
      { path: "/job-grades", label: /Job Grade/i },
    ];
    for (const exp of expected) {
      const item = allItems.find((it) => it.path === exp.path);
      expect(item, `nav item for ${exp.path}`).toBeDefined();
      expect(item.label).toMatch(exp.label);
      expect(item.roles).toEqual(["admin"]);
    }
  });

  it("every nav item has a unique path", () => {
    const allPaths = navItems.flatMap((g) => g.items).map((it) => it.path);
    const unique = new Set(allPaths);
    expect(unique.size).toBe(allPaths.length);
  });

  it("every nav path has a matching route in the router", async () => {
    // Read App.jsx as text and assert each nav path appears as a Route —
    // catches the inverse regression too (nav entry pointing at a
    // non-existent route).
    const fs = await import("node:fs");
    const path = await import("node:path");
    const app = fs.readFileSync(path.resolve(__dirname, "../App.jsx"), "utf-8");
    const allPaths = navItems.flatMap((g) => g.items).map((it) => it.path);
    for (const p of allPaths) {
      expect(app, `route for ${p}`).toMatch(new RegExp(`path="${p.replace(/\\/, "")}"`));
    }
  });
});
