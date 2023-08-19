import "server-only";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  const response = await fetch(`https://rubygems.org/api/v1/gems/${name}.json`);
  const exists = response.status === 200;

  return NextResponse.json(
    exists
      ? {
          provider: "rubygems",
          _exists: "yes",
          url: `https://rubygems.org/gems/${name}`,
        }
      : {
          provider: "rubygems",
          _exists: "no",
        },
  );
}
