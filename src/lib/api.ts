"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import ky from "ky";

const services = [
  "pypi",
  "github",
  "github_org",
  "gitlab",
  "domain_name",
  "homebrew",
  "apt",
  "crates",
  "maven",
  "npm",
  "rubygems",
  "nuget",
  "go",
  "packagist",
] as const;

// This function makes a request based on the service name and sets the response using the appropriate setter function.
async function fetchDataForService(
  name: (typeof services)[number],
  searchTerm: string,
) {
  const response = await fetch(`/api/exists/${name}?name=${searchTerm}`);
  const json = await response.json();

  return json;
}

function useServiceQuery(name: (typeof services)[number], searchTerm: string) {
  return useSuspenseQuery({
    queryKey: [name, searchTerm],
    queryFn: () => fetchDataForService(name, searchTerm),
  });
}
