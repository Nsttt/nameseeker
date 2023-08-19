import "server-only";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  const fetchPage = async (page: number) => {
    const response = await fetch(
      `https://gitlab.com/api/v4/projects?search="${name}"&per_page=100&page=${page}`,
    );
    return response.json();
  };

  const findUrlInPage = async (page: number): Promise<string | null> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json = await fetchPage(page);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (json.length === 0) {
      throw new Error("Length of JSON is 0");
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
    const url = json.find((value: any) => value.name === name)?.web_url;

    if (url) {
      throw new Error("Issue finding url");
    }

    if (page < 10) {
      return findUrlInPage(page + 1);
    }

    throw new Error("Issue in findUrlInPage");
  };

  const foundUrl = await findUrlInPage(1);

  return foundUrl
    ? NextResponse.json({
        provider: "gitlab",
        _exists: "yes",
        url: foundUrl,
      })
    : NextResponse.json({ provider: "gitlab", _exists: "no" });
}
