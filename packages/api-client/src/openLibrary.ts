import type { OLSearchDoc, OLSearchResponse, OLWork, OLError } from "./types";

const SEARCH_URL = "https://openlibrary.org/search.json";
const WORKS_URL  = "https://openlibrary.org/works";

const FIELDS = [
  "key", "title", "author_name", "cover_i",
  "first_publish_year", "number_of_pages_median",
  "subject", "isbn", "language", "ratings_average",
  "ratings_count", "publisher",
].join(",");

class OLClientError extends Error {
  constructor(public readonly error: OLError) {
    super(error.message);
    this.name = "OLClientError";
  }
}

async function fetchJson<T>(url: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url);
  } catch {
    throw new OLClientError({ type: "network", message: "Network error. Check your connection." });
  }
  if (res.status === 404) throw new OLClientError({ type: "not_found", message: "Book not found." });
  if (!res.ok) throw new OLClientError({ type: "unknown", message: `Open Library error: ${res.status}` });
  return res.json() as Promise<T>;
}

export async function searchBooks(query: string): Promise<OLSearchDoc[]> {
  if (!query.trim()) return [];
  const url = `${SEARCH_URL}?q=${encodeURIComponent(query.trim())}&limit=20&fields=${FIELDS}`;
  const data = await fetchJson<OLSearchResponse>(url);
  return data.docs ?? [];
}

export async function getBookById(id: string): Promise<OLWork & { author_names: string[] }> {
  const work = await fetchJson<OLWork>(`${WORKS_URL}/${id}.json`);

  const authorRefs: { author: { key: string } }[] = (work as any).authors ?? [];
  const author_names: string[] = (
    await Promise.all(
      authorRefs.slice(0, 3).map(async ({ author }) => {
        try {
          const a = await fetchJson<{ name?: string }>(`https://openlibrary.org${author.key}.json`);
          return a.name ?? null;
        } catch {
          return null;
        }
      })
    )
  ).filter(Boolean) as string[];

  return { ...work, author_names };
}

export { OLClientError };
