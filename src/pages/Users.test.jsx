import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

// Base44 SDK mock: no real network calls. inviteUser lives under
// base44.users, the password-set email under base44.auth.
vi.mock("@/api/base44Client", () => {
  const User = { list: vi.fn(async () => []) };
  const users = { inviteUser: vi.fn() };
  const auth = { resetPasswordRequest: vi.fn() };
  return { base44: { entities: { User }, users, auth } };
});

vi.mock("@/lib/AuthContext", () => ({
  useAuth: () => ({ user: { id: "admin-1", role: "admin", email: "amitava.kar@maxbridgesolution.com" } }),
}));

const toastSpy = vi.fn();
vi.mock("@/components/ui/use-toast", () => ({
  useToast: () => ({ toast: toastSpy }),
}));

import { base44 } from "@/api/base44Client";
import Users from "@/pages/Users";

const originalPrompt = window.prompt;
afterEach(() => {
  window.prompt = originalPrompt;
  vi.clearAllMocks();
  toastSpy.mockClear();
});

describe("Users page — Invite User", () => {
  it("creates the invited account and immediately sends a password-set email for a one-step onboarding link", async () => {
    window.prompt = vi
      .fn()
      .mockReturnValueOnce("newhire@maxbridgesolution.com") // email prompt
      .mockReturnValueOnce("user"); // role prompt
    base44.users.inviteUser.mockResolvedValue({});
    base44.auth.resetPasswordRequest.mockResolvedValue({});

    render(<Users />);

    const inviteButton = await screen.findByRole("button", { name: /Invite User/i });
    inviteButton.click();

    await waitFor(() =>
      expect(base44.users.inviteUser).toHaveBeenCalledWith("newhire@maxbridgesolution.com", "user")
    );
    // The one-step onboarding link only works because this fires right away,
    // instead of waiting for the invitee to stumble onto "Set up your password".
    await waitFor(() =>
      expect(base44.auth.resetPasswordRequest).toHaveBeenCalledWith("newhire@maxbridgesolution.com")
    );

    await waitFor(() =>
      expect(toastSpy).toHaveBeenCalledWith(
        expect.objectContaining({ description: expect.stringMatching(/will get an email to set their password/i) })
      )
    );
  });

  it("still reports a successful invite even if the follow-up password email fails", async () => {
    window.prompt = vi.fn().mockReturnValueOnce("flaky@maxbridgesolution.com").mockReturnValueOnce("user");
    base44.users.inviteUser.mockResolvedValue({});
    base44.auth.resetPasswordRequest.mockRejectedValue(new Error("mail service down"));

    render(<Users />);
    const inviteButton = await screen.findByRole("button", { name: /Invite User/i });
    inviteButton.click();

    await waitFor(() => expect(base44.users.inviteUser).toHaveBeenCalled());
    await waitFor(() =>
      expect(toastSpy).toHaveBeenCalledWith(
        expect.objectContaining({ description: expect.stringMatching(/will get an email to set their password/i) })
      )
    );
  });

  it("does not invite when the email prompt is cancelled", async () => {
    window.prompt = vi.fn().mockReturnValueOnce(null);
    render(<Users />);
    const inviteButton = await screen.findByRole("button", { name: /Invite User/i });
    inviteButton.click();

    await waitFor(() => expect(window.prompt).toHaveBeenCalledTimes(1));
    expect(base44.users.inviteUser).not.toHaveBeenCalled();
  });
});
