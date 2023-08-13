import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getBaseURL } from "@/lib/utils";
// import { useQueries, useSuspenseQueries } from "@tanstack/react-query";
import { Terminal } from "lucide-react";
import { literal, object, string, union, ValiError } from "valibot";

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
  try {
    const response = await fetch(
      `${getBaseURL()}/api/exists/${name}?name=${searchTerm}`,
    );
    if (!response.ok) {
      throw new Error("There has been an issue in the Request");
    }
    const parsed = ApiResponseSchema.parse(await response.json());

    return parsed;
  } catch (error) {
    if (error instanceof ValiError) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error("Something went wrong");
  }
}

export default function ServiceList(props: { searchTerm: string }) {
  return services.map((service) => (
    <ServiceItem serviceName={service} searchTerm={props.searchTerm} />
  ));
}

async function ServiceItem(props: {
  serviceName: (typeof services)[number];
  searchTerm: string;
}) {
  const data = await fetchDataForService(props.serviceName, props.searchTerm);

  return (
    <Alert key={data.provider}>
      <Terminal className="h-4 w-4" />
      <AlertTitle>{data.provider}</AlertTitle>
      <AlertDescription>
        Congratulations. This name is available for anyone to take !
      </AlertDescription>
    </Alert>
  );
}
