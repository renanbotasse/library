"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type {
  CollectionEntry,
  CreateCollectionEntry,
  UpdateCollectionEntry,
} from "@tomekeep/core";

const supabase = createClient();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRow(row: any): CollectionEntry {
  return {
    id:           row.id,
    userId:       row.user_id,
    googleBookId: row.google_book_id,
    title:        row.title,
    author:       row.author ?? null,
    coverUrl:     row.cover_url ?? null,
    status:       row.status,
    rating:       row.rating ?? null,
    notes:        row.notes ?? null,
    createdAt:    row.created_at,
    updatedAt:    row.updated_at,
  };
}

async function getCollection(): Promise<CollectionEntry[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("collection")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapRow);
}

export function useCollection() {
  return useQuery({
    queryKey: ["collection"],
    queryFn: getCollection,
  });
}

export function useAddToCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (book: CreateCollectionEntry) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("collection").insert({
        user_id: user.id,
        google_book_id: book.googleBookId,
        title: book.title,
        author: book.author,
        cover_url: book.coverUrl,
      });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["collection"] }),
  });
}

export function useUpdateCollectionEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: UpdateCollectionEntry }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("collection")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .eq("user_id", user.id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["collection"] }),
  });
}

export function useRemoveFromCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("collection")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["collection"] }),
  });
}

export function useIsInCollection(googleBookId: string) {
  const { data } = useCollection();
  return data?.find((entry) => entry.googleBookId === googleBookId) ?? null;
}
