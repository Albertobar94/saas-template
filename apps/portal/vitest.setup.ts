import { vi } from "vitest";
import type { Session } from "@package/auth";
import { UserRole } from "@package/database/dto";

/* -------------------------------------------------------------------------- */
/*                                Global Stubs                                */
/* -------------------------------------------------------------------------- */

const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}));

const ResizeObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
}));

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
vi.stubGlobal("ResizeObserver", ResizeObserverMock);

/* -------------------------------------------------------------------------- */
/*                                Global Mocks                                */
/* -------------------------------------------------------------------------- */
vi.mock(
  "server-only",
  vi.fn(() => ({})),
);
vi.mock(
  "@/config/env/client",
  vi.fn(() => ({})),
);
vi.mock("@/server/auth", () => ({
  auth: () =>
    ({
      user: {
        id: "",
        name: "",
        email: "",
        image: "",
        role: UserRole.Admin,
      },
      expires: new Date().toISOString(),
    }) satisfies Session,
}));
