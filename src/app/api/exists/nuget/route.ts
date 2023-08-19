import "server-only";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  const response = await fetch(
    `https://api.nuget.org/v3-flatcontainer/${
      name ? name.toLowerCase() : ""
    }/index.json`,
  );
  const exists = response.status === 200;

  return NextResponse.json(
    exists
      ? {
          provider: "nuget",
          _exists: "yes",
          url: `https://www.nuget.org/packages/${name}`,
        }
      : {
          provider: "nuget",
          _exists: "no",
        },
  );
}
