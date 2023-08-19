import "server-only";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

//TODO: Very inacurate, can be improved.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  const response = await fetch(`https://packagist.org/search.json?q=${name}`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await response.json();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const existsUrl = json.results
    .filter((item: { name: string }) => item.name.split("/")[1] === name)
    .sort(
      (a: { downloads: number }, b: { downloads: number }) =>
        a.downloads < b.downloads,
    )
    .pop()?.url as string;

  return NextResponse.json(
    existsUrl
      ? {
          provider: "packagist",
          exists: "yes",
          url: existsUrl,
        }
      : {
          provider: "packagist",
          _exists: "no",
        },
  );
}
