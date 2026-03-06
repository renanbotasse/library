import { NextRequest, NextResponse } from "next/server";

const FIELDS = [
  "key", "title", "author_name", "cover_i",
  "first_publish_year", "number_of_pages_median",
  "subject", "isbn", "language", "ratings_average",
  "ratings_count", "publisher",
].join(",");

export async function GET(req: NextRequest) {
  const q      = req.nextUrl.searchParams.get("q");
  const offset = req.nextUrl.searchParams.get("offset") ?? "0";
  if (!q || q.trim().length < 3) {
    return NextResponse.json({ numFound: 0, docs: [] });
  }

  const trimmed = q.trim();
  const type    = req.nextUrl.searchParams.get("type") ?? "title";
  const field   = type === "author" ? "author" : "title";
  const query   = `${field}:${trimmed}`;
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&sort=editions&limit=20&offset=${offset}&fields=${FIELDS}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });

  if (!res.ok) {
    return NextResponse.json({ error: "Open Library error" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
