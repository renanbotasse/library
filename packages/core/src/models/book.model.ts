export interface BookSummary {
  id: string;
  title: string;
  authors: string[];
  coverUrl: string | null;
  publishedYear: string | null;
  pageCount: number | null;
  categories: string[];
  averageRating: number | null;
}

export interface BookDetail extends BookSummary {
  description: string | null;
  publisher: string | null;
  isbn13: string | null;
  isbn10: string | null;
  language: string | null;
  previewLink: string | null;
}
