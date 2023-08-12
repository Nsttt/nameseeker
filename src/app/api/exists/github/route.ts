import "server-only";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  const response = await octokit.request(
    `GET /search/repositories?q=${name}&type=repositories`,
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const existsUrl = response.data.items.find(
    (item: { name: string }) => item.name.toLowerCase() === name?.toLowerCase(),
  )?.html_url as string | undefined;

  return NextResponse.json(
    existsUrl
      ? {
          provider: "github",
          _exists: "yes",
          url: existsUrl,
        }
      : {
          provider: "github",
          _exists: "no",
        },
  );
}
