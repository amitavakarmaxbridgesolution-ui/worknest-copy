import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock the Base44 SDK client so the Branch module is tested in isolation,
// with no real network calls. Every CRUD path (list/create/update/delete)
// is a spy we assert against.
vi.mock("@/api/base44Client", () => {
  const Branch = {
    list: vi.fn(),
    create: vi.fn(async (data) => ({ id: "b-new", ...data })),
    update: vi.fn(async (id, data) => ({ id, ...data })),
    delete: vi.fn(async () => ({ success: true })),
  };
  const Company = {
    list: vi.fn(async () => [{ id: "c1", company_name: "Maxbridge Solutions" }]),
  };
  return { base44: { entities: { Branch, Company } } };
});

import { base44 } from "@/api/base44Client";
import Branches from "@/pages/Branches";

const SEED_BRANCHES = [
  { id: "b1", branch_code: "MUM01", branch_name: "Mumbai HQ", head_office: "yes", city: "Mumbai", country: "India", status: "active" },
  { id: "b2", branch_code: "BLR01", branch_name: "Bangalore Office", head_office: "no", city: "Bangalore", country: "India", status: "active" },
];

// CrudForm's <Label> is not programmatically associated with its control
// (no htmlFor/id), so getByLabelText can't be used. Each field renders as
// <div><Label>Text</Label><Input|Select|Textarea/></div>, so we resolve the
// control from the label's next sibling instead.
function getFieldControl(container, labelText) {
  const label = within(container)
    .getAllByText((_, node) => node.tagName === "LABEL" && node.textContent.trim().startsWith(labelText))
    .find((n) => n.tagName === "LABEL");
  if (!label) throw new Error(`No label starting with "${labelText}" found`);
  return label.nextElementSibling;
}

function renderBranches() {
  return render(<Branches />);
}

describe("Branch management module", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    base44.entities.Branch.list.mockResolvedValue(SEED_BRANCHES.map((b) => ({ ...b })));
    base44.entities.Company.list.mockResolvedValue([{ id: "c1", company_name: "Maxbridge Solutions" }]);
  });

  it("READ: loads and lists branches from the Branch entity on mount", async () => {
    renderBranches();
    await waitFor(() => expect(base44.entities.Branch.list).toHaveBeenCalledWith("-updated_date", 500));
    expect(await screen.findByText("Mumbai HQ")).toBeInTheDocument();
    expect(screen.getByText("Bangalore Office")).toBeInTheDocument();
  });

  it("renders the page header and an Add Branch action", async () => {
    renderBranches();
    await screen.findByText("Mumbai HQ");
    expect(screen.getByRole("heading", { name: "Branch" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add Branch/i })).toBeInTheDocument();
  });

  it("CREATE: submitting the Add Branch form calls entities.Branch.create with form values", async () => {
    const user = userEvent.setup();
    renderBranches();
    await screen.findByText("Mumbai HQ");

    await user.click(screen.getByRole("button", { name: /Add Branch/i }));
    const dialog = await screen.findByRole("dialog");

    await user.type(getFieldControl(dialog, "Branch Code"), "DEL01");
    await user.type(getFieldControl(dialog, "Branch Name"), "Delhi");
    await user.type(getFieldControl(dialog, "City"), "Delhi");
    await user.type(getFieldControl(dialog, "Country"), "India");

    await user.click(within(dialog).getByRole("button", { name: /^Save$/i }));

    await waitFor(() => expect(base44.entities.Branch.create).toHaveBeenCalledTimes(1));
    const [payload] = base44.entities.Branch.create.mock.calls[0];
    expect(payload).toMatchObject({
      branch_code: "DEL01",
      branch_name: "Delhi",
      city: "Delhi",
      country: "India",
      // defaultValues from Branches.jsx are merged in by CrudPage
      status: "active",
      head_office: "no",
    });
  });

  it("UPDATE: editing a branch calls entities.Branch.update with the row id", async () => {
    const user = userEvent.setup();
    renderBranches();
    await screen.findByText("Mumbai HQ");

    const row = screen.getByText("Mumbai HQ").closest("tr");
    const editBtn = within(row).getAllByRole("button")[0];
    await user.click(editBtn);

    const dialog = await screen.findByRole("dialog");
    const nameInput = getFieldControl(dialog, "Branch Name");
    await user.clear(nameInput);
    await user.type(nameInput, "Mumbai Head Office");
    await user.click(within(dialog).getByRole("button", { name: /^Save$/i }));

    await waitFor(() => expect(base44.entities.Branch.update).toHaveBeenCalledTimes(1));
    const [id, payload] = base44.entities.Branch.update.mock.calls[0];
    expect(id).toBe("b1");
    expect(payload.branch_name).toBe("Mumbai Head Office");
  });

  it("DELETE: confirming delete calls entities.Branch.delete with the row id", async () => {
    const user = userEvent.setup();
    renderBranches();
    await screen.findByText("Bangalore Office");

    const row = screen.getByText("Bangalore Office").closest("tr");
    const deleteBtn = within(row).getAllByRole("button")[1];
    await user.click(deleteBtn);

    const alert = await screen.findByRole("alertdialog");
    await user.click(within(alert).getByRole("button", { name: /^Delete$/i }));

    await waitFor(() => expect(base44.entities.Branch.delete).toHaveBeenCalledWith("b2"));
  });

  it("SEARCH: filters branches by code, name or city", async () => {
    const user = userEvent.setup();
    renderBranches();
    await screen.findByText("Mumbai HQ");
    expect(screen.getByText("Bangalore Office")).toBeInTheDocument();

    await user.type(screen.getByPlaceholderText("Search..."), "Bangalore");

    expect(screen.queryByText("Mumbai HQ")).not.toBeInTheDocument();
    expect(screen.getByText("Bangalore Office")).toBeInTheDocument();
  });

  it("shows an empty state when there are no branches", async () => {
    base44.entities.Branch.list.mockResolvedValue([]);
    renderBranches();
    await waitFor(() => expect(base44.entities.Branch.list).toHaveBeenCalled());
    expect(screen.queryByText("Mumbai HQ")).not.toBeInTheDocument();
  });
});
