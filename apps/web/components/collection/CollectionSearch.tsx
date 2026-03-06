"use client";

import { useUIStore } from "@/store/useUIStore";

export function CollectionSearch() {
  const { collectionSearch, setCollectionSearch } = useUIStore();

  return (
    <div className="relative">
      <svg
        className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted opacity-40"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="search"
        value={collectionSearch}
        onChange={(e) => setCollectionSearch(e.target.value)}
        placeholder="Search your library…"
        className="input-wl w-full rounded-2xl py-3 pl-11 pr-4 text-sm"
      />
    </div>
  );
}
