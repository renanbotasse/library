"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { mapOLDocToSummary } from "@tomekeep/core";
import type { OLSearchResponse } from "@tomekeep/api-client";

const PAGE_SIZE = 20;

export function useBookSearch(query: string, type: "title" | "author" = "title") {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  return useInfiniteQuery({
    queryKey: ["books", "search", debouncedQuery, type],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetch(
        `/api/books/search?q=${encodeURIComponent(debouncedQuery)}&type=${type}&offset=${pageParam}`
      );
      if (!res.ok) throw new Error("Search failed");
      const data: OLSearchResponse = await res.json();
      return {
        books: (data.docs ?? []).map(mapOLDocToSummary),
        numFound: data.numFound,
        nextOffset: (pageParam as number) + PAGE_SIZE,
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      const fetched = (lastPageParam as number) + PAGE_SIZE;
      return fetched < lastPage.numFound ? fetched : undefined;
    },
    enabled: debouncedQuery.trim().length > 2,
    staleTime: 1000 * 60 * 10,
  });
}
