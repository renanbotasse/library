"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/motion/variants";
import { BookCard } from "@/components/book/BookCard";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { BookShelf3DWrapper } from "@/components/shelf/BookShelf3DWrapper";
import { useCollection } from "@/hooks/useCollection";
import { useUIStore } from "@/store/useUIStore";
import type { BookSummary } from "@tomekeep/core";

export function CollectionGrid() {
  const { data: collection, isLoading } = useCollection();
  const { activeFilter, collectionSearch, ratingFilter, viewMode } = useUIStore();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!collection || collection.length === 0) {
    return (
      <EmptyState
        title="Your library is empty"
        description="Search for books and add them to your personal collection."
        action={
          <Link href="/search" className="btn-gold-solid inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm">
            Search books
          </Link>
        }
      />
    );
  }

  const q = collectionSearch.trim().toLowerCase();
  const filtered = collection.filter((e) => {
    if (activeFilter !== "all" && e.status !== activeFilter) return false;
    if (ratingFilter !== 0 && e.rating !== ratingFilter) return false;
    if (q && !e.title.toLowerCase().includes(q) && !(e.author ?? "").toLowerCase().includes(q)) return false;
    return true;
  });

  if (filtered.length === 0) {
    return (
      <EmptyState
        title="No books here"
        description={`You have no books with status "${activeFilter.replace("_", " ")}".`}
      />
    );
  }

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  if (viewMode === "shelf" && !isMobile) {
    return <BookShelf3DWrapper entries={filtered} />;
  }

  return (
    <motion.div
      key={activeFilter}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
    >
      {filtered.map((entry) => {
        const book: BookSummary = {
          id: entry.googleBookId,
          title: entry.title,
          authors: entry.author ? [entry.author] : [],
          coverUrl: entry.coverUrl,
          publishedYear: null,
          pageCount: null,
          categories: [],
          averageRating: null,
        };
        return <BookCard key={entry.id} book={book} collectionEntry={entry} />;
      })}
    </motion.div>
  );
}
