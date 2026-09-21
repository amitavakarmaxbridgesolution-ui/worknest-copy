import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

// The Base44 SDK is mocked so no real network calls happen. Each auth
// method is a spy the tests assert against.
vi.mock("@/api/base44Client", () => {
  const auth = {
    register: vi.fn(),
    verifyOtp: vi.fn(),
    resendOtp: vi.fn(),
    resetPasswordRequest: vi.fn(),
    setToken: vi.fn(),
  };
  return { base44: { auth } };
});

// The shadcn InputOTP wrapper (radix-style OTP widget) relies on browser
// APIs jsdom doesn't implement (ResizeObserver, elementFromPoint) and is
// third-party UI anyway — mock it with a plain controlled input so the
// onboarding FLOW stays under test.
vi.mock("@/components/ui/input-otp", () => ({
  InputOTP: ({ value, onChange, maxLength, children, ...props }) => (
    <input
      data-testid="otp-input"
      value={value || ""}
      onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
    />
  ),
  InputOTPGroup: ({ children }) => <div>{children}</div>,
  InputOTPSlot: () => null,
}));

import { base44 } from "@/api/base44Client";
import SetPassword from "@/pages/SetPassword";
import Login from "@/pages/Login";

// jsdom does not implement navigation; stub it so we can assert the
// post-login redirect.
const originalLocation = window.location;
beforeEach(() => {
  delete window.location;
  window.location = { href: "http://localhost/", search: "", origin: "http://localhost" };
  window.history.replaceState({}, "", "/");
});
afterEach(() => {
  window.location = originalLocation;
});

function renderPage(page, initialEntries = ["/set-password"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>{page}</MemoryRouter>
  );
}

describe("Set up your password (invited-user onboarding)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders email, password and retype-password fields with a set-password action", () => {
    renderPage(<SetPassword />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Retype Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Set password & log in/i })).toBeInTheDocument();
  });

  it("rejects mismatched passwords without calling the API", async () => {
    const user = userEvent.setup();
    renderPage(<SetPassword />);
    await user.type(screen.getByLabelText(/Email/i), "newbie@example.com");
    await user.type(screen.getByLabelText(/^Password$/i), "supersecret1");
    await user.type(screen.getByLabelText(/Retype Password/i), "different1");
    await user.click(screen.getByRole("button", { name: /Set password & log in/i }));

    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
    expect(base44.auth.register).not.toHaveBeenCalled();
  });

  it("rejects passwords shorter than 8 characters", async () => {
    const user = userEvent.setup();
    renderPage(<SetPassword />);
    await user.type(screen.getByLabelText(/Email/i), "newbie@example.com");
    await user.type(screen.getByLabelText(/^Password$/i), "short");
    await user.type(screen.getByLabelText(/Retype Password/i), "short");
    await user.click(screen.getByRole("button", { name: /Set password & log in/i }));

    expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument();
    expect(base44.auth.register).not.toHaveBeenCalled();
  });

  it("NEW INVITE: registers the account with the chosen password, then OTP-verifies and logs in", async () => {
    base44.auth.register.mockResolvedValue({});
    base44.auth.verifyOtp.mockResolvedValue({ access_token: "tok-123" });

    const user = userEvent.setup();
    renderPage(<SetPassword />);
    await user.type(screen.getByLabelText(/Email/i), "newbie@example.com");
    await user.type(screen.getByLabelText(/^Password$/i), "supersecret1");
    await user.type(screen.getByLabelText(/Retype Password/i), "supersecret1");
    await user.click(screen.getByRole("button", { name: /Set password & log in/i }));

    await waitFor(() =>
      expect(base44.auth.register).toHaveBeenCalledWith({ email: "newbie@example.com", password: "supersecret1" })
    );

    // OTP step shown
    expect(await screen.findByText(/We sent a code to newbie@example.com/i)).toBeInTheDocument();

    await user.type(screen.getByTestId("otp-input"), "123456");
    await user.click(screen.getByRole("button", { name: /Verify & log in/i }));

    await waitFor(() => expect(base44.auth.verifyOtp).toHaveBeenCalledWith({ email: "newbie@example.com", otpCode: "123456" }));
    await waitFor(() => expect(base44.auth.setToken).toHaveBeenCalledWith("tok-123"));
    // Logged in: redirected into the app
    await waitFor(() => expect(window.location.href).toBe("/"));
  });

  it("EXISTING ACCOUNT: 'user already exists' triggers a password-reset email instead of a dead end", async () => {
    base44.auth.register.mockRejectedValue(new Error("A user with this email already exists"));
    base44.auth.resetPasswordRequest.mockResolvedValue({});

    const user = userEvent.setup();
    renderPage(<SetPassword />);
    await user.type(screen.getByLabelText(/Email/i), "existing@example.com");
    await user.type(screen.getByLabelText(/^Password$/i), "supersecret1");
    await user.type(screen.getByLabelText(/Retype Password/i), "supersecret1");
    await user.click(screen.getByRole("button", { name: /Set password & log in/i }));

    await waitFor(() => expect(base44.auth.resetPasswordRequest).toHaveBeenCalledWith("existing@example.com"));
    expect(await screen.findByText("Check your email")).toBeInTheDocument();
    expect(screen.getByText(/already exists for this address/i)).toBeInTheDocument();
  });

  it("prefills the email when the invite link carries ?email=", () => {
    renderPage(<SetPassword />, ["/set-password?email=invitee@example.com"]);
    expect(screen.getByLabelText(/Email/i)).toHaveValue("invitee@example.com");
  });
});

describe("Login page invite entry point", () => {
  it("shows a 'Set up your password' link for invited users", async () => {
    renderPage(<Login />, ["/login"]);
    const link = screen.getByRole("link", { name: /Set up your password/i });
    expect(link).toHaveAttribute("href", "/set-password");
  });
});
