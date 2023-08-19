import "server-only";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  const formulaUrl = `https://formulae.brew.sh/api/formula/${name}.json`;
  const caskUrl = `https://formulae.brew.sh/api/cask/${name}.json`;

  const resFormula = await fetch(formulaUrl);
  const resCask = await fetch(caskUrl);

  //   await new Promise((r) => setTimeout(r, 1000));

  const exists = resFormula.status !== 404 || resCask.status !== 404;

  return exists
    ? NextResponse.json({
        provider: "homebrew",
        _exists: "yes",
        url: resCask.status !== 404 ? caskUrl : formulaUrl,
      })
    : NextResponse.json({ provider: "homebrew", _exists: "no" });
}
