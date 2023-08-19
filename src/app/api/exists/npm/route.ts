import "server-only";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  const response = await fetch(`https://registry.npmjs.org/${name}`);
  const exists = response.status === 200;

  return NextResponse.json(
    exists
      ? {
          provider: "npm",
          _exists: "yes",
          url: `https://www.npmjs.com/package/${name}`,
        }
      : {
          provider: "npm",
          _exists: "no",
        },
  );
}
