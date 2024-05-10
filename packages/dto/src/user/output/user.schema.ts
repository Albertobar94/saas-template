import { SelectUserSchema } from "@repo/database/dto";

export const PublicUserSchema = SelectUserSchema.pick({
  id: true,
  name: true,
  email: true,
  image: true,
  role: true,
  createdAt: true,
});
