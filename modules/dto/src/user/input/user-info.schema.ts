import { type z } from "zod";
import { SelectUserSchema } from "@package/database/dto";

export const UserInfoSchema = SelectUserSchema.pick({
  email: true,
  id: true,
})
  .extend({
    email: SelectUserSchema.shape.email.optional(),
    id: SelectUserSchema.shape.id.optional(),
  })
  .refine((data) => data.id ?? data.email, {
    message: "Either id or email must be provided",
  })
  .optional();

export type UserInfoInput = z.infer<typeof UserInfoSchema>;
