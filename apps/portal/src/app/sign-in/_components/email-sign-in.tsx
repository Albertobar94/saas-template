"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider,
  Input,
} from "@module/ui";
import { useForm } from "react-hook-form";
import type { EmailLinkInput } from "@module/dto";
import { EmailLinkSchema } from "@module/dto";
import { emailLinkSignIn } from "~/src/server/DEPRECATED actions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO: fix this
function createFormData(obj: any) {
  const formData = new FormData();
  for (const key in obj) {
    formData.append(key, obj[key]);
  }
  return formData;
}

export function EmailSignIn() {
  const form = useForm<EmailLinkInput>({
    mode: "all",
    reValidateMode: "onChange",
    criteriaMode: "all",
    resolver: zodResolver(EmailLinkSchema),
  });

  const onSubmit = form.handleSubmit(async (data: EmailLinkInput) => {
    try {
      await emailLinkSignIn(createFormData(data));
    } catch (error) {
      // TODO: logging
      console.error("[EmailSignIn] Error", error);

      // TODO: improve error handling messages
      form.setError("email", {
        type: "manual",
        message: (error as Error).message,
      });
    }
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={void onSubmit}>
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <Input
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={form.formState.isSubmitting}
                    placeholder="name@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button isLoading={form.formState.isSubmitting} type="submit">
            Sign In with Email
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
