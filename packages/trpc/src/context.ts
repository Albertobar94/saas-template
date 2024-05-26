import { type DependencyContainer } from "tsyringe";
import { type Session } from "@package/auth";

export interface Context {
  container: DependencyContainer;
  session: Session | null;
}

export type ProtectedContext = Context & {
  session: Session;
};
