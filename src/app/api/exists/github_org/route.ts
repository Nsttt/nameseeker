import "server-only";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  const response = await octokit.request(`GET /orgs/${name}`);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const exists = response?.data?.html_url as string | undefined;

  return NextResponse.json(
    exists
      ? {
          provider: "github_org",
          _exists: "yes",
          url: exists,
        }
      : {
          provider: "github_org",
          _exists: "no",
        },
  );
}
