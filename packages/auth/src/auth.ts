import { type Session as NextAuthSession } from "next-auth";
import { type UserRole } from "@package/database/dto";

/* -------------------------------------------------------------------------- */
/*                                 TYPE ROOTS                                 */
/* -------------------------------------------------------------------------- */

// Ref: https://github.com/nextauthjs/next-auth/pull/9617
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    role: UserRole;
    userId: string;
  }

  interface User {
    id: string;
    role: UserRole;
  }
}

// Ref: https://stackoverflow.com/questions/74425533/property-role-does-not-exist-on-type-user-adapteruser-in-nextauth
declare module "@auth/core/adapters" {
  interface AdapterUser {
    id: string;
    role: UserRole;
  }
}

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      role: UserRole;
    };
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    // @ts-expect-error -- TODO: fix this
    id: string;
    role: UserRole;
  }
}

export type Session = NextAuthSession;

/* -------------------------------------------------------------------------- */
/*                                   EXPORTS                                  */
/* -------------------------------------------------------------------------- */

export { default as NextAuth, type NextAuthConfig, type User } from "next-auth";
export { type JWT } from "next-auth/jwt";

export { default as GoogleProvider } from "next-auth/providers/google";
export { default as ResendProvider } from "next-auth/providers/resend";

export { DrizzleAdapter } from "@auth/drizzle-adapter";
