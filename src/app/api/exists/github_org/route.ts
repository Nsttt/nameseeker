import "server-only";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    const response = await octokit.request(`GET /orgs/${name}`);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const exists = response?.data?.html_url as string;

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
  } catch (error) {
    return NextResponse.json({
      provider: "github_org",
      _exists: "no",
    });
  }
}
