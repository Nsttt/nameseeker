import "server-only";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// TODO: Can be improved to also return the proper URL direclty instead of the search list.
// TODO: Pretty inacurate, can be improved.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  const response = await fetch(`https://pkg.go.dev/search?q=${name}&m=package`);
  const text = await response.text();
  const regex = /Showing <strong>(\d+)<\/strong>/;
  const match = text.match(regex);
  let searchCount = 0;
  if (match?.[1]) {
    searchCount = parseInt(match[1]);
  }

  return NextResponse.json(
    searchCount > 0
      ? {
          provider: "go",
          _exists: "yes",
          url: `https://pkg.go.dev/search?q=${name}&m=package`,
        }
      : {
          provider: "go",
          _exists: "no",
        },
  );
}
