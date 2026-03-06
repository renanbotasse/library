import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const workRes = await fetch(`https://openlibrary.org/works/${id}.json`, { next: { revalidate: 86400 } });

  if (workRes.status === 404) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (!workRes.ok) return NextResponse.json({ error: "Open Library error" }, { status: workRes.status });

  const work = await workRes.json();

  // Fetch author names in parallel (max 3 authors)
  const authorRefs: { author: { key: string } }[] = work.authors ?? [];
  const authorNames: string[] = await Promise.all(
    authorRefs.slice(0, 3).map(async ({ author }) => {
      try {
        const r = await fetch(`https://openlibrary.org${author.key}.json`, { next: { revalidate: 86400 } });
        if (!r.ok) return null;
        const a = await r.json();
        return a.name ?? null;
      } catch {
        return null;
      }
    })
  ).then((names) => names.filter(Boolean) as string[]);

  return NextResponse.json({ ...work, author_names: authorNames });
}
