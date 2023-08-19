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

  const exists = resFormula.status !== 404 || resCask.status !== 404;

  return exists
    ? NextResponse.json({
        provider: "homebrew",
        _exists: "yes",
        url: `https://formulae.brew.sh/${
          resCask.status === 404 ? "formula" : "cask"
        }/${name}`,
      })
    : NextResponse.json({ provider: "homebrew", _exists: "no" });
}
