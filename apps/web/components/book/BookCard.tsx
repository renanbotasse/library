"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion/variants";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { StarRating } from "@/components/ui/StarRating";
import type { BookSummary, CollectionEntry } from "@tomekeep/core";

interface BookCardProps {
  book: BookSummary;
  collectionEntry?: CollectionEntry | null;
}

export function BookCard({ book, collectionEntry }: BookCardProps) {
  return (
    <motion.div variants={fadeInUp}>
      <Link href={`/book/${book.id}`} className="group block">
        <div className="card-wl hover-gold overflow-hidden rounded-2xl transition-all duration-300 group-hover:-translate-y-1.5">
          {/* Cover */}
          <div className="relative aspect-[2/3] overflow-hidden" style={{ backgroundColor: "#15131B" }}>
            {book.coverUrl ? (
              <Image
                src={book.coverUrl}
                alt={`Cover of ${book.title}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
                <span className="font-serif text-3xl" style={{ color: "rgba(163,130,74,0.3)" }}>♜</span>
                <p className="line-clamp-3 font-serif text-xs text-muted">{book.title}</p>
              </div>
            )}

            {/* Gold shimmer line on hover */}
            <div
              className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: "linear-gradient(90deg, transparent, rgba(163,130,74,0.6), transparent)" }}
            />

          </div>

          {/* Info */}
          <div className="space-y-1.5 p-3">
            {collectionEntry && (
              <div className="flex items-center justify-between">
                <StatusBadge status={collectionEntry.status} />
                <StarRating value={collectionEntry.rating} readonly size="sm" />
              </div>
            )}
            <h3 className="line-clamp-2 min-h-[3.1rem] font-serif text-lg font-semibold leading-snug text-text">
              {book.title}
            </h3>
            <p className="line-clamp-1 font-sans text-lg italic text-muted">
              {book.authors.length > 0 ? book.authors[0] : "No author declared"}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
