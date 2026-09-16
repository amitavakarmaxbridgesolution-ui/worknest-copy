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

  it("every nav item has a unique path", () => {
    const allPaths = navItems.flatMap((g) => g.items).map((it) => it.path);
    const unique = new Set(allPaths);
    expect(unique.size).toBe(allPaths.length);
  });
});
