import { NextAuth } from "@package/auth";
import { authConfig } from "./config";

export const nextAuth = NextAuth(authConfig);
export const auth: typeof nextAuth.auth = nextAuth.auth;
export const signIn: typeof nextAuth.signIn = nextAuth.signIn;
export const signOut: typeof nextAuth.signOut = nextAuth.signOut;
export const handlers: typeof nextAuth.handlers = nextAuth.handlers;
