import { Separator } from "@module/ui";
import Link from "next/link";
import { GoogleSignIn } from "./google-sign-in";
import { EmailSignIn } from "./email-sign-in";

export function SigninForm(): JSX.Element {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-muted-foreground text-sm">
          Enter your email below to create your account
        </p>
      </div>
      <div className="grid gap-6">
        <EmailSignIn />
        <Separator>Or continue with</Separator>
        <GoogleSignIn />
      </div>
      <div className="text-muted-foreground px-8 text-center text-sm">
        <p>By clicking continue, you agree to our</p>
        <div className="flex justify-center gap-1">
          <Link className="hover:text-primary underline underline-offset-4" href="/terms">
            Terms of Service
          </Link>
          <span>and</span>
          <Link
            className="hover:text-primary underline underline-offset-4"
            href="/privacy">
            Privacy Policy.
          </Link>
        </div>
      </div>
    </div>
  );
}
