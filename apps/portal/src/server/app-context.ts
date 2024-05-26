import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { v4 as generateUuidV4 } from "uuid";
import { Container } from "@package/trpc/container";
import { auth } from "@module/auth";
import { ContainerTokens, Headers } from "@module/shared/constants";

export const createContext = async (opts?: FetchCreateContextFnOptions) => {
  // This is a server-side request
  if (!opts) {
    const currentSession = await auth();

    const container = Container.createChildContainer()
      .register(ContainerTokens.RequestId, {
        useValue: `server_${generateUuidV4()}`,
      })
      .register(ContainerTokens.UserId, {
        useValue: currentSession?.user.id,
      });

    return {
      container,
      session: currentSession,
    };
  }

  // This is a client-side request
  const requestId = opts.req.headers.get(Headers.RequestId);
  const userId = opts.req.headers.get(Headers.UserId);

  // Apply header with unique ID to every request
  requestId && opts.resHeaders.set(Headers.RequestId, requestId);
  userId && opts.resHeaders.set(Headers.UserId, userId);
  // Add all headers here instead of next.config.js as it is throwing error( Cannot set headers after they are sent to the client) for OPTIONS method
  // It is known to happen only in Dev Mode.
  opts.resHeaders.set(Headers.AllowCreadentials, "true");
  opts.resHeaders.set(Headers.AllowOrigin, "*"); // Change this to your domain
  opts.resHeaders.set(Headers.AllowMethods, "GET, OPTIONS, PATCH, DELETE, POST, PUT");
  opts.resHeaders.set(
    Headers.AllowHeaders,
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Content-Type, api_key, Authorization",
  );
  opts.resHeaders.set(Headers.ReferrerPolicy, "no-referrer");

  const container = Container.createChildContainer().register(ContainerTokens.RequestId, {
    useValue: requestId,
  });

  return {
    ...opts,
    container,
    // @ts-expect-error -- need to extends FetchCreateContextFnOptions
    session: opts.req.auth ? opts.req.auth : await auth(),
  };
};
