import { Suspense } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { getBaseURL } from "@/lib/utils";
import { Terminal } from "lucide-react";
import { literal, object, string, union, ValiError } from "valibot";

const services = [
  "pypi",
  "github",
  "github_org",
  "gitlab",
  "homebrew",
  "apt",
  "crates",
  "maven",
  "npm",
  "rubygems",
  // "nuget",
  // "go",
  // "packagist",
  // "domain_name",
] as const;

const ServiceSchema = union([
  literal("pypi"),
  literal("github"),
  literal("github_org"),
  literal("gitlab"),
  literal("homebrew"),
  literal("apt"),
  literal("crates"),
  literal("maven"),
  literal("npm"),
  literal("rubygems"),
  // literal("nuget"),
  // literal("go"),
  // literal("packagist"),
  // literal("domain_name"),
]);

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
    throw new Error(JSON.stringify(error));
  }
}

async function ServiceItem(props: {
  serviceName: (typeof services)[number];
  searchTerm: string;
}) {
  const data = await fetchDataForService(props.serviceName, props.searchTerm);

  if (data._exists === "no") {
    return (
      <Alert key={data.provider} className="my-3">
        <Terminal className="h-4 w-4" />
        <AlertTitle>{data.provider}</AlertTitle>
        <AlertDescription>
          Congratulations. This name is available for anyone to take !
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert key={data.provider} className="my-3" variant="destructive">
      <Terminal className="h-4 w-4" />
      <AlertTitle>{data.provider}</AlertTitle>
      <AlertDescription>
        Sorry, this name is already taken. Try another one.
      </AlertDescription>
    </Alert>
  );
}

export default function ResultsPage(props: {
  searchParams: { search?: string };
}) {
  return services.map((service) => (
    <Suspense
      fallback={
        <div className="my-3 flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      }
    >
      <ServiceItem
        serviceName={service}
        searchTerm={props.searchParams.search ?? ""}
      />
    </Suspense>
  ));
}
