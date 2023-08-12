"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

import "./globals.css";

import { useState } from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const inter = Inter({ subsets: ["latin"] });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const metadata = {
  title: "Name Seeker",
  description: "Find out if your project name is taken",
  authors: [{ name: "Néstor López", url: "https://github.com/nsttt" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://name.nstlopez.com",
    title: "Name Seeker",
    description: "Find out if your project name is taken",
    siteName: "Name Seeker",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  const [client, _] = useState(new QueryClient());

  return (
    <html lang="en">
      <head>
        <title>Name Seeker</title>
      </head>
      <body className="h-full">
        <QueryClientProvider client={client}>
          <ReactQueryStreamedHydration>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">{children}</div>
              </div>
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </ReactQueryStreamedHydration>
        </QueryClientProvider>
      </body>
    </html>
  );
}
