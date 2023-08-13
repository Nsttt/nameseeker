"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getBaseURL } from "@/lib/utils";
import { useSuspenseQueries } from "@tanstack/react-query";
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
  searchTerm: string | undefined,
) {
  const response = await fetch(
    `${getBaseURL()}/api/exists/${name}?name=${searchTerm}`,
  );

  const parsed = ApiResponseSchema.parse(response);

  return parsed;
}

function useServiceQuery(searchTerm: string | undefined) {
  return useSuspenseQueries({
    queries: services.map((service) => {
      return {
        queryKey: [service, searchTerm],
        queryFn: () => fetchDataForService(service, searchTerm),
      };
    }),
  });
}

export default function ServiceList(props: { searchTerm: string | undefined }) {
  const data = useServiceQuery(props.searchTerm);

  return data.map((service) => {
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
  });
}
