"use client";

import { useQuery } from "@tanstack/react-query";
import { mapOLWorkToDetail } from "@tomekeep/core";
import type { BookDetail } from "@tomekeep/core";
import type { OLWork } from "@tomekeep/api-client";

export function useBookDetail(id: string) {
  return useQuery<BookDetail>({
    queryKey: ["books", "detail", id],
    queryFn: async () => {
      const res = await fetch(`/api/books/detail?id=${encodeURIComponent(id)}`);
      if (!res.ok) throw new Error("Book not found");
      const work: OLWork = await res.json();
      return mapOLWorkToDetail(work);
    },
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 60,
  });
}
