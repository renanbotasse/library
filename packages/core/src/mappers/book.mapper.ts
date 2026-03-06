import type { OLSearchDoc, OLWork } from "@tomekeep/api-client";
import type { BookSummary, BookDetail } from "../models/book.model";

function coverUrl(coverId: number, size: "S" | "M" | "L" = "L"): string {
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}

export function mapOLDocToSummary(doc: OLSearchDoc): BookSummary {
  return {
    id: doc.key.replace("/works/", ""),
    title: doc.title ?? "Unknown Title",
    authors: doc.author_name ?? [],
    coverUrl: doc.cover_i ? coverUrl(doc.cover_i) : null,
    publishedYear: doc.first_publish_year ? String(doc.first_publish_year) : null,
    pageCount: doc.number_of_pages_median ?? null,
    categories: doc.subject?.slice(0, 3) ?? [],
    averageRating: doc.ratings_average ?? null,
  };
}

export function mapOLWorkToDetail(work: OLWork & { author_names?: string[] }, doc?: OLSearchDoc): BookDetail {
  const desc = work.description;
  const description = typeof desc === "string" ? desc : (desc?.value ?? null);
  const coverId = work.covers?.[0] ?? doc?.cover_i;

  return {
    id: work.key.replace("/works/", ""),
    title: work.title,
    authors: work.author_names ?? doc?.author_name ?? [],
    coverUrl: coverId ? coverUrl(coverId) : null,
    publishedYear: doc?.first_publish_year ? String(doc.first_publish_year) : null,
    pageCount: doc?.number_of_pages_median ?? null,
    categories: work.subjects?.slice(0, 3) ?? doc?.subject?.slice(0, 3) ?? [],
    averageRating: doc?.ratings_average ?? null,
    description,
    publisher: doc?.publisher?.[0] ?? null,
    isbn13: doc?.isbn?.find((i) => i.length === 13) ?? null,
    isbn10: doc?.isbn?.find((i) => i.length === 10) ?? null,
    language: doc?.language?.[0] ?? null,
    previewLink: `https://openlibrary.org/works/${work.key.replace("/works/", "")}`,
  };
}

// Keep old names as aliases so any remaining references don't break
export const mapGoogleVolumeToSummary = mapOLDocToSummary;
export const mapGoogleVolumeToDetail  = mapOLWorkToDetail;
