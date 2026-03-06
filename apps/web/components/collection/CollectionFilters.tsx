"use client";

import { useUIStore } from "@/store/useUIStore";
import type { ReadingStatus } from "@tomekeep/core";

const STATUS_FILTERS: { label: string; symbol: string; value: ReadingStatus | "all" }[] = [
  { label: "All",     symbol: "✦", value: "all"     },
  { label: "To Read", symbol: "♦", value: "to_read" },
  { label: "Reading", symbol: "♥", value: "reading" },
  { label: "Read",    symbol: "♣", value: "read"    },
];

export function CollectionFilters() {
  const { activeFilter, setFilter, ratingFilter, setRatingFilter } = useUIStore();

  return (
    <div className="space-y-2">
      {/* Status filters */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className="flex-shrink-0 flex items-center gap-1.5 rounded-full border px-4 py-1.5 font-sans text-xs font-medium transition-all"
            style={
              activeFilter === f.value
                ? { borderColor: "rgba(163,130,74,0.5)", backgroundColor: "rgba(163,130,74,0.1)", color: "#A3824A" }
                : { borderColor: "rgba(163,130,74,0.12)", backgroundColor: "rgba(21,19,27,0.5)", color: "#C9C1B4" }
            }
          >
            <span>{f.symbol}</span>
            {f.label}
          </button>
        ))}
      </div>

      {/* Star rating filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="flex-shrink-0 font-sans text-xs text-muted opacity-50">Rating:</span>
        <button
          onClick={() => setRatingFilter(0)}
          className="flex-shrink-0 rounded-full border px-3 py-1 font-sans text-xs font-medium transition-all"
          style={
            ratingFilter === 0
              ? { borderColor: "rgba(163,130,74,0.5)", backgroundColor: "rgba(163,130,74,0.1)", color: "#A3824A" }
              : { borderColor: "rgba(163,130,74,0.12)", backgroundColor: "rgba(21,19,27,0.5)", color: "#C9C1B4" }
          }
        >
          All
        </button>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRatingFilter(ratingFilter === star ? 0 : star)}
            className="flex-shrink-0 flex items-center gap-1 rounded-full border px-3 py-1 font-sans text-xs font-medium transition-all"
            style={
              ratingFilter === star
                ? { borderColor: "rgba(163,130,74,0.5)", backgroundColor: "rgba(163,130,74,0.1)", color: "#A3824A" }
                : { borderColor: "rgba(163,130,74,0.12)", backgroundColor: "rgba(21,19,27,0.5)", color: "#C9C1B4" }
            }
          >
            {star}
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="#A3824A">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
