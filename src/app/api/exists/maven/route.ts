import "server-only";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const response = await fetch(
    `https://search.maven.org/solrsearch/select?q=a:${name}&rows=1&wt=json`,
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await response.json();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const exists = json.response.numFound > 0;

  return NextResponse.json(
    exists
      ? {
          provider: "maven",
          _exists: "yes",
          url: `https://central.sonatype.com/search?name=${name}&sort=name&q=${name}`,
        }
      : {
          provider: "maven",
          _exists: "no",
        },
  );
}
