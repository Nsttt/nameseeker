import "server-only";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  const response = await fetch(`https://crates.io/api/v1/crates/${name}`);
  const exists = response.status === 200;

  return exists
    ? NextResponse.json({
        provider: "crates",
        _exists: "yes",
        url: `https://crates.io/crates/${name}`,
      })
    : NextResponse.json({
        provider: "crates",
        _exists: "no",
      });
}
