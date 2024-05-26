import type { NextAuthConfig } from "@package/auth";
import { GoogleProvider, DrizzleAdapter, ResendProvider } from "@package/auth";
import { AppEnvironments } from "@module/shared/constants";
import { env } from "@module/shared/server-env";
import { UserRole } from "@package/database/dto";
import { db } from "@package/database/neon";

// import { getUserInfo } from "../actions/user";

export const authConfig = {
  debug: env.APP_ENV === AppEnvironments.Local,
  useSecureCookies: env.APP_ENV !== AppEnvironments.Local,
  session: {
    strategy: "jwt",
  },
  pages: {
    verifyRequest: "/verify-request",
    // TODO: change these to your own pages
    // signIn: "/auth/signin",
    // signOut: "/auth/signout",
    // error: "/auth/error",
    // newUser: "/auth/new-user",
  },
  secret: env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
      // The users have to be created before they can sign in
      // So we need to allow linking as there's no account created yet
      allowDangerousEmailAccountLinking: true,
      async profile(profile) {
        // const user = await server.user.info({
        //   email: profile.email,
        // });
        // const user = await getUserInfo({ email: profile.email });

        return {
          // Id is required Ref: https://stackoverflow.com/questions/76758385/nextauth-secondth-time-signing-in-with-the-same-google-account-oauthaccountno
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          emailVerified: profile.email_verified,
          image: profile.picture,
          role: UserRole.User,
          // role: user?.role ?? UserRole.User,
        };
      },
    }),
    ResendProvider({
      apiKey: env.AUTH_RESEND_KEY,
      from: "onboarding@resend.dev",
    }),
  ],
  adapter: DrizzleAdapter(db),
  callbacks: {
    async signIn({ user, email, profile }) {
      // const dbUser: User | null = null;
      // OAuth provider: it contains the full OAuth profile returned by your provider.
      // The user must have been created previously
      if (profile?.email) {
        // dbUser = await getUserInfo({ email: profile.email });

        // if (!dbUser) throw new TRPCError({ code: "UNAUTHORIZED" });

        return true;
      }

      // Email link: it is the first step of the email sign in flow.
      if (email?.verificationRequest && user.email) {
        // dbUser = dbUser ? dbUser : await getUserInfo({ email: user.email });
        // if (!dbUser?.role) return false;
      }

      return Boolean(user);
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        // @ts-expect-error -- TODO: fix this type issue
        token.userId = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      session.user.id = token.userId;
      return session;
    },
  },
} satisfies NextAuthConfig as NextAuthConfig;
