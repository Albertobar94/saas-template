"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { useMemo } from "react";
import { SuperJSON } from "superjson";
import { v4 as generateUuidV4 } from "uuid";
import { env } from "@/config/env/client";
import { AppRouter } from "@/server";

export const trpc = createTRPCReact<typeof AppRouter>();

export function TrpcProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useMemo(() => new QueryClient(), []);
  const trpcClient = useMemo(
    () =>
      trpc.createClient({
        links: [
          httpBatchLink({
            url: `${env.BASE_URL}/api/trpc`,
            transformer: SuperJSON,
            headers() {
              const requestId = generateUuidV4();

              return {
                "X-Request-ID": `client_${requestId}`,
              };
            },
          }),
        ],
      }),
    [],
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
