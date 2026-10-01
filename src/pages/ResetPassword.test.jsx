import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

vi.mock("@/api/base44Client", () => ({
  base44: { auth: { resetPassword: vi.fn() } },
}));

import { base44 } from "@/api/base44Client";
import ResetPassword from "@/pages/ResetPassword";

// Builds a (signature-less, test-only) JWT-shaped token carrying an email
// claim — exactly the shape the real reset-password email link token has,
// which this page decodes client-side purely to show the invitee which
// account they're setting a password for.
function fakeToken(payload) {
  const b64 = (obj) => btoa(JSON.stringify(obj)).replace(/\+/g, "-").replace(/\//g, "_");
  return `${b64({ alg: "none" })}.${b64(payload)}.sig`;
}

const originalLocation = window.location;
beforeEach(() => {
  delete window.location;
  window.location = { href: "http://localhost/", search: "", origin: "http://localhost" };
});
afterEach(() => {
  window.location = originalLocation;
  vi.clearAllMocks();
});

function renderPage(initialEntries) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <ResetPassword />
    </MemoryRouter>
  );
}

describe("ResetPassword — one-step invite onboarding link", () => {
  it("shows an invalid-link message when there's no token", () => {
    renderPage(["/reset-password"]);
    expect(screen.getByText(/Invalid reset link/i)).toBeInTheDocument();
  });

  it("decodes and shows the invited email as read-only alongside password + confirm password", () => {
    const token = fakeToken({ email: "invitee@maxbridgesolution.com" });
    renderPage([`/reset-password?token=${token}`]);

    const emailInput = screen.getByLabelText(/Email/i);
    expect(emailInput).toHaveValue("invitee@maxbridgesolution.com");
    expect(emailInput).toBeDisabled();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Retype Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Set password & log in/i })).toBeInTheDocument();
  });

  it("falls back to the generic reset form when the token can't be decoded", () => {
    renderPage(["/reset-password?token=not-a-real-jwt"]);
    expect(screen.queryByLabelText(/Email/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/New Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Reset password/i })).toBeInTheDocument();
  });

  it("rejects mismatched passwords without calling the API", async () => {
    const token = fakeToken({ email: "invitee@maxbridgesolution.com" });
    const user = userEvent.setup();
    renderPage([`/reset-password?token=${token}`]);

    await user.type(screen.getByLabelText(/^Password$/i), "supersecret1");
    await user.type(screen.getByLabelText(/Retype Password/i), "different1");
    await user.click(screen.getByRole("button", { name: /Set password & log in/i }));

    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
    expect(base44.auth.resetPassword).not.toHaveBeenCalled();
  });

  it("submits the new password with the token and redirects to login", async () => {
    base44.auth.resetPassword.mockResolvedValue({});
    const token = fakeToken({ email: "invitee@maxbridgesolution.com" });
    const user = userEvent.setup();
    renderPage([`/reset-password?token=${token}`]);

    await user.type(screen.getByLabelText(/^Password$/i), "supersecret1");
    await user.type(screen.getByLabelText(/Retype Password/i), "supersecret1");
    await user.click(screen.getByRole("button", { name: /Set password & log in/i }));

    await waitFor(() =>
      expect(base44.auth.resetPassword).toHaveBeenCalledWith({ resetToken: token, newPassword: "supersecret1" })
    );
    await waitFor(() => expect(window.location.href).toBe("/login"));
  });
});
