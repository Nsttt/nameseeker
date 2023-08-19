import "server-only";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

async function checkPackageExists(packageName: string): Promise<boolean> {
  const url = `https://packages.ubuntu.com/kinetic/${packageName}`;
  try {
    const response = await fetch(url);
    return response.status === 200;
  } catch (err) {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  const exists = await checkPackageExists(name ?? "");

  return exists
    ? NextResponse.json({
        provider: "apt",
        _exists: "yes",
        url: `https://packages.ubuntu.com/kinetic/${name}`,
      })
    : NextResponse.json({
        provider: "apt",
        _exists: "no",
      });
}
