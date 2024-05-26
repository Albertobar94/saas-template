import { router } from "@package/trpc";
import { UserRouter } from "./modules";

export const AppRouter = router({
  user: UserRouter,
});
