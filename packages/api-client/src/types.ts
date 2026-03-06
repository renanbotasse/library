// ── Open Library Search ────────────────────────────────────────────────────
export interface OLSearchDoc {
  key: string;                     // "/works/OL123W"
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  number_of_pages_median?: number;
  subject?: string[];
  isbn?: string[];
  language?: string[];
  ratings_average?: number;
  ratings_count?: number;
  publisher?: string[];
}

export interface OLSearchResponse {
  numFound: number;
  docs: OLSearchDoc[];
}

// ── Open Library Work (detail) ─────────────────────────────────────────────
export interface OLWork {
  key: string;
  title: string;
  description?: string | { value: string };
  subjects?: string[];
  covers?: number[];
  first_publish_date?: string;
}

export type OLError = {
  type: "not_found" | "rate_limit" | "network" | "unknown";
  message: string;
};
