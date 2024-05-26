import { protectedProcedure, router } from "@package/trpc";
import { PublicUserSchema, UserInfoSchema } from "@module/dto";
import { UserResolver } from "./user.resolver";

export const UserRouter = router({
  info: protectedProcedure
    .input(UserInfoSchema)
    .output(PublicUserSchema.nullish())
    .query(UserResolver.resolver("info")),
});
