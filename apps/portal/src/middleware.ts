import { NextResponse } from "next/server";
import { auth as mwAuth } from "@module/auth";

export const middleware: ReturnType<typeof mwAuth> = mwAuth(({ auth, geo, nextUrl }) => {
  const user = auth?.user;

  /* ------ TODO: check if this is necessary, might not work on localhost ----- */
  const country = geo?.country ?? "US";
  const city = geo?.city ?? "San Francisco";
  const region = geo?.region ?? "CA";
  nextUrl.searchParams.set("country", country);
  nextUrl.searchParams.set("city", city);
  nextUrl.searchParams.set("region", region);

  /* ----------------------------------- End ---------------------------------- */

  // TODO: all public routes like sign-in, sign-up...
  if (user && nextUrl.pathname.includes("/sign-in")) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl.toString()));
  }

  if (!auth && nextUrl.pathname.includes("/verify-request")) {
    return NextResponse.rewrite(nextUrl);
  }

  // TODO: all private routes like dashboard, settings...
  if (!auth && !nextUrl.pathname.includes("/sign-in")) {
    return NextResponse.redirect(new URL("/sign-in", nextUrl.toString()));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export const runtime = "experimental-edge";
