import { InsertUserSchema } from "@package/database/dto";

export const CreateUserSchema = InsertUserSchema.pick({
  email: true,
  name: true,
  role: true,
  image: true,
});
