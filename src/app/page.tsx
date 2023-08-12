"use client";

import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getBaseURL } from "@/lib/utils";
import { useQueries } from "@tanstack/react-query";
import ky from "ky";
import { Terminal } from "lucide-react";
import { literal, object, string, union } from "valibot";

const services = [
  "pypi",
  "github",
  // "github_org",
  // "gitlab",
  // "domain_name",
  // "homebrew",
  // "apt",
  // "crates",
  // "maven",
  // "npm",
  // "rubygems",
  // "nuget",
  // "go",
  // "packagist",
] as const;

const ServiceSchema = union([literal("pypi"), literal("github")]);

const ApiResponseSchema = union([
  object({
    provider: ServiceSchema,
    _exists: literal("yes"),
    url: string(),
  }),
  object({
    provider: ServiceSchema,
    _exists: literal("no"),
  }),
]);

async function fetchDataForService(
  name: (typeof services)[number],
  searchTerm: string,
) {
  const response = await ky(
    `${getBaseURL()}/api/exists/${name}?name=${searchTerm ?? ""}`,
  ).json();

  const parsed = ApiResponseSchema.parse(response);

  return parsed;
}

function useServiceQuery(searchTerm: string | undefined) {
  return useQueries({
    queries: services.map((service) => {
      return {
        queryKey: [service, searchTerm],
        queryFn: () => fetchDataForService(service, searchTerm ?? ""),
        enabled: !!searchTerm,
        retry: false,
      };
    }),
  });
}

export default function Home() {
  const [name, setName] = useState<string | undefined>(undefined);
  const [searchName, setSearchName] = useState<string | undefined>(undefined);
  const data = useServiceQuery(searchName);

  return (
    <>
      <h1 className="text-center text-4xl font-bold tracking-tight sm:text-6xl">
        Name Seeker
      </h1>
      <p className="mt-2 text-center text-lg text-gray-500">
        Search if the name if your next idea is available everywhere
      </p>
      <div className="my-4 flex w-full items-center space-x-2">
        <Input
          type="text"
          placeholder="Name"
          onChange={(newName) => setName(newName.target.value)}
        />
        <Button
          type="submit"
          variant="default"
          onClick={() => {
            if (name !== searchName) {
              setSearchName(name);
            }
          }}
        >
          Seek
        </Button>
      </div>
      {data.map((service) => {
        if (service.isPending) {
          return null;
        }

        if (service.isLoading) {
          return (
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          );
        }

        if (service.isError) {
          console.error(service.error);
          return (
            <Alert
              variant="destructive"
              key={JSON.stringify(service.error.message)}
            >
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error Fetching</AlertTitle>
              <AlertDescription>{service.error.message}</AlertDescription>
            </Alert>
          );
        }

        if (service.data._exists === "yes") {
          return (
            <Alert
              variant="destructive"
              key={JSON.stringify(service.data.provider)}
            >
              <Terminal className="h-4 w-4" />
              <AlertTitle>{service.data.provider}</AlertTitle>
              <AlertDescription>
                This name is already taken, try another one.
              </AlertDescription>
            </Alert>
          );
        }

        return (
          <Alert key={JSON.stringify(service.data.provider)}>
            <Terminal className="h-4 w-4" />
            <AlertTitle>{service.data.provider}</AlertTitle>
            <AlertDescription>
              Congratulations. This name is available for anyone to take !
            </AlertDescription>
          </Alert>
        );
      })}
    </>
  );
}
