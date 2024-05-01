import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "./apps/portal/vitest.config.mts",
  "./packages/common/vitest.config.mts",
  "./packages/trpc/vitest.config.mts",
]);