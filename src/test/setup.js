import "@testing-library/jest-dom/vitest";

// jsdom does not implement ResizeObserver, which @input-otp uses when it
// mounts. Stub it so OTP widgets can render in tests.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = globalThis.ResizeObserver || ResizeObserverStub;
