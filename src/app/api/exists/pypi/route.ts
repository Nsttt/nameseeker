import "server-only";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  const response = await fetch(`https://pypi.org/pypi/${name}/json`);

  return NextResponse.json(
    response.status === 200
      ? {
          provider: "pypi",
          _exists: "yes",
          url: `https://pypi.org/project/${name}/`,
        }
      : {
          provider: "pypi",
          _exists: "no",
        },
  );
}
