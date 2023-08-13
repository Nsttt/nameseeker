"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

export default function Providers({
  children,
}: {
  children: React.ReactElement;
}) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 1000,
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={client}>
      <ReactQueryStreamedHydration>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
}
