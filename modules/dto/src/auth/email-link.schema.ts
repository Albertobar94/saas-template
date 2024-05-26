import { type z } from "zod";
import { InsertUserSchema } from "@package/database/dto";
import fakeEmailDomainsArray from "./fake-email-domains-array.json";
import fakeEmailDomains from "./fake-email-domains.json";

export const EmailLinkSchema = InsertUserSchema.pick({
  email: true,
}).refine(
  (data) => {
    // Ref: https://github.com/7c/fakefilter/blob/main/json/data.json
    for (const domain of Object.keys(fakeEmailDomains.domains)) {
      if (data.email.endsWith(domain)) {
        return false;
      }
    }

    // Ref: https://gist.github.com/adamloving/4401361
    for (const domain of fakeEmailDomainsArray) {
      if (data.email.endsWith(domain)) {
        return false;
      }
    }

    return true;
  },
  {
    path: ["email"],
    message: "Email Domain not allowed.",
  },
);

export type EmailLinkInput = z.infer<typeof EmailLinkSchema>;
