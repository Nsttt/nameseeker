import "./globals.css";

import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Github } from "lucide-react";

import Providers from "./providers";

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
  return (
    <html lang="en">
      <head>
        <title>Name Seeker</title>
      </head>
      <body className="h-full">
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-lg">
                <div className="mt-3 flex flex-row justify-between">
                  <a
                    className="my-2.5 transition-opacity duration-200 ease-in-out hover:opacity-50"
                    href="https://github.com/nsttt/nameseeker"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Github />
                  </a>
                  <h1 className="text-center text-4xl font-bold tracking-tight sm:text-6xl">
                    Name Seeker
                  </h1>
                  <ModeToggle />
                </div>
                <p className="mt-2 text-center text-lg text-gray-500">
                  Got a cool name? See if it's taken
                </p>
                <form
                  action={
                    // eslint-disable-next-line
                    async (event) => {
                      "use server";
                      const name = event.get("name")?.toString();
                      redirect(`/results?search=${name}`);
                    }
                  }
                >
                  <div className="my-4 flex w-full items-center space-x-2">
                    <Input type="text" placeholder="Name" name="name" />
                    <Button type="submit" variant="default">
                      Seek
                    </Button>
                  </div>
                </form>
                {children}
                Gi
              </div>
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
