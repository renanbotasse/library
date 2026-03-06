import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBookById } from "@tomekeep/api-client";
import { mapGoogleVolumeToDetail } from "@tomekeep/core";
import { AddToCollectionButton } from "./AddToCollectionButton";
import { BookReview } from "./BookReview";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const volume = await getBookById(params.id);
    const book = mapGoogleVolumeToDetail(volume);
    return {
      title: book.title,
      description: book.description?.slice(0, 160) ?? undefined,
    };
  } catch {
    return { title: "Book" };
  }
}

export default async function BookDetailPage({ params }: Props) {
  let book;
  try {
    const volume = await getBookById(params.id);
    book = mapGoogleVolumeToDetail(volume);
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pb-28 pt-6 md:pb-6">
      <div className="grid gap-8 md:grid-cols-[240px_1fr]">
        {/* Cover */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative aspect-[2/3] w-40 overflow-hidden rounded-xl shadow-2xl md:w-full">
            {book.coverUrl ? (
              <Image
                src={book.coverUrl}
                alt={`Cover of ${book.title}`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 160px, 240px"
              />
            ) : (
              <div
                className="flex h-full w-full flex-col items-center justify-center p-4 text-center"
                style={{ backgroundColor: "#15131B" }}
              >
                <svg
                  className="mb-2 h-10 w-10"
                  style={{ color: "rgba(163,130,74,0.3)" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            )}
          </div>

          {/* Add to collection */}
          <AddToCollectionButton book={book} />

          {/* Preview link */}
          {book.previewLink && (
            <a
              href={book.previewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dark flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm"
            >
              Preview on Open Library
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>

        {/* Info */}
        <div className="space-y-5">
          <div>
            <h1 className="font-serif text-3xl font-bold text-text">{book.title}</h1>
            {book.authors.length > 0 && (
              <p className="mt-1 font-serif text-lg italic text-muted">{book.authors.join(", ")}</p>
            )}
          </div>

          {/* Metadata chips */}
          <div className="flex flex-wrap gap-2">
            {book.publishedYear && (
              <span
                className="rounded-full border px-3 py-1 font-sans text-xs text-muted"
                style={{ borderColor: "rgba(163,130,74,0.15)", backgroundColor: "rgba(21,19,27,0.6)" }}
              >
                {book.publishedYear}
              </span>
            )}
            {book.pageCount && (
              <span
                className="rounded-full border px-3 py-1 font-sans text-xs text-muted"
                style={{ borderColor: "rgba(163,130,74,0.15)", backgroundColor: "rgba(21,19,27,0.6)" }}
              >
                {book.pageCount} pages
              </span>
            )}
            {book.language && (
              <span
                className="rounded-full border px-3 py-1 font-sans text-xs uppercase text-muted"
                style={{ borderColor: "rgba(163,130,74,0.15)", backgroundColor: "rgba(21,19,27,0.6)" }}
              >
                {book.language}
              </span>
            )}
            {book.categories.slice(0, 2).map((cat) => (
              <span
                key={cat}
                className="rounded-full border px-3 py-1 font-sans text-xs text-gold"
                style={{ borderColor: "rgba(163,130,74,0.3)", backgroundColor: "rgba(163,130,74,0.08)" }}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Description */}
          {book.description && (
            <p className="font-sans text-sm leading-relaxed text-muted">{book.description}</p>
          )}

          {/* Rating + Notes — only shown when book is in collection */}
          <BookReview bookId={book.id} />

          {/* Publisher / ISBN */}
          <div
            className="space-y-1.5 pt-4"
            style={{ borderTop: "1px solid rgba(163,130,74,0.08)" }}
          >
            {book.publisher && (
              <p className="font-sans text-xs text-muted opacity-60">
                <span className="opacity-80">Publisher: </span>
                {book.publisher}
              </p>
            )}
            {book.isbn13 && (
              <p className="font-sans text-xs text-muted opacity-60">
                <span className="opacity-80">ISBN-13: </span>
                {book.isbn13}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
