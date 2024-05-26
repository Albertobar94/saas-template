"use server";

import { signIn } from "@module/auth";

export const emailLinkSignIn = async (formData: FormData) => {
  return signIn("resend", formData);
};
