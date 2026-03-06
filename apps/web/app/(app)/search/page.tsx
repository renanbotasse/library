"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/motion/variants";
import { useBookSearch } from "@/hooks/useBookSearch";
import { BookCard } from "@/components/book/BookCard";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { EmptyState } from "@/components/ui/EmptyState";

const TYPES = [
  { value: "title",  label: "Title" },
  { value: "author", label: "Author" },
] as const;

type SearchType = typeof TYPES[number]["value"];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("title");

  const {
    data,
    isLoading,
    isFetchingNextPage,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useBookSearch(query, searchType);

  const books = data?.pages.flatMap((p) => p.books) ?? [];
  const totalFound = data?.pages[0]?.numFound ?? 0;
  const showSkeleton = isLoading && query.length > 2;

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 pb-28 pt-6 md:pb-6">
      {/* Search bar + toggle */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <svg
            className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted opacity-50"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchType === "title" ? "Search by book title…" : "Search by author name…"}
            autoFocus
            className="input-wl w-full rounded-2xl py-4 pl-11 pr-4 text-base"
          />
        </div>

        {/* Title / Author toggle */}
        <div
          className="flex shrink-0 overflow-hidden rounded-2xl"
          style={{ border: "1px solid rgba(163,130,74,0.2)" }}
        >
          {TYPES.map((t) => {
            const active = searchType === t.value;
            return (
              <button
                key={t.value}
                onClick={() => setSearchType(t.value)}
                className="w-20 py-3 font-sans text-sm font-medium transition-colors duration-200"
                style={{
                  backgroundColor: active ? "rgba(163,130,74,0.18)" : "transparent",
                  color: active ? "#A3824A" : "#C9C1B4",
                  borderRight: t.value === "title" ? "1px solid rgba(163,130,74,0.2)" : "none",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results */}
      {showSkeleton ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : isError ? (
        <EmptyState
          title="Something went wrong"
          description="Couldn't reach the book catalogue. Check your connection and try again."
        />
      ) : books.length > 0 ? (
        <>
          <p className="font-sans text-sm text-muted">
            Showing {books.length} of {totalFound.toLocaleString()} results for &quot;{query}&quot;
          </p>

          <motion.div
            key={query + searchType}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          >
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </motion.div>

          {hasNextPage && (
            <div className="flex justify-center pt-4">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="btn-gold-outline rounded-xl px-8 py-3 text-sm disabled:opacity-50"
              >
                {isFetchingNextPage ? "Loading…" : "Load more"}
              </button>
            </div>
          )}
        </>
      ) : query.length > 2 ? (
        <EmptyState
          title="No books found"
          description={`We couldn't find anything for "${query}". Try a different search term.`}
        />
      ) : (
        <div className="py-20 text-center">
          <p className="font-serif text-lg text-muted opacity-60">
            Search for any book in the world&apos;s largest library
          </p>
        </div>
      )}
    </div>
  );
}
