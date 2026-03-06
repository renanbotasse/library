"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useAddToCollection,
  useIsInCollection,
  useUpdateCollectionEntry,
  useRemoveFromCollection,
} from "@/hooks/useCollection";
import { Toast } from "@/components/ui/Toast";
import type { BookDetail, ReadingStatus } from "@tomekeep/core";

interface Props {
  book: BookDetail;
}

const STATUS_OPTIONS: { value: ReadingStatus; label: string }[] = [
  { value: "to_read",  label: "To Read"  },
  { value: "reading",  label: "Reading"  },
  { value: "read",     label: "Read"     },
];

const STATUS_COLORS: Record<ReadingStatus, { color: string; bg: string; border: string }> = {
  to_read: { color: "#C4A8D4", bg: "rgba(75,46,94,0.12)",  border: "rgba(75,46,94,0.35)"  },
  reading: { color: "#C88C9A", bg: "rgba(107,31,51,0.15)", border: "rgba(200,140,154,0.3)" },
  read:    { color: "#7EC87E", bg: "rgba(49,67,56,0.18)",  border: "rgba(49,67,56,0.38)"  },
};

export function AddToCollectionButton({ book }: Props) {
  const addMutation    = useAddToCollection();
  const updateMutation = useUpdateCollectionEntry();
  const removeMutation = useRemoveFromCollection();
  const existing       = useIsInCollection(book.id);

  const [toast, setToast] = useState<{ visible: boolean; message: string; type: "success" | "error" }>({
    visible: false, message: "", type: "success",
  });

  const showToast = (message: string, type: "success" | "error" = "success") =>
    setToast({ visible: true, message, type });

  const handleAdd = async () => {
    try {
      await addMutation.mutateAsync({
        googleBookId: book.id,
        title: book.title,
        author: book.authors[0] ?? null,
        coverUrl: book.coverUrl,
      });
      showToast("Added to your library!");
    } catch {
      showToast("Please sign in to add books.", "error");
    }
  };

  const handleStatus = async (status: ReadingStatus) => {
    if (!existing) return;
    try {
      await updateMutation.mutateAsync({ id: existing.id, updates: { status } });
    } catch {
      showToast("Failed to update status.", "error");
    }
  };

  const handleRating = async (rating: number) => {
    if (!existing) return;
    try {
      await updateMutation.mutateAsync({ id: existing.id, updates: { rating } });
    } catch {
      showToast("Failed to update rating.", "error");
    }
  };

  const handleNotes = async (notes: string) => {
    if (!existing) return;
    try {
      await updateMutation.mutateAsync({ id: existing.id, updates: { notes } });
      showToast("Notes saved!");
    } catch {
      showToast("Failed to save notes.", "error");
    }
  };

  const handleRemove = async () => {
    if (!existing) return;
    try {
      await removeMutation.mutateAsync(existing.id);
      showToast("Removed from your library.");
    } catch {
      showToast("Failed to remove.", "error");
    }
  };

  return (
    <>
      {existing ? (
        <div className="w-full space-y-4">
          {/* Status selector */}
          <div className="space-y-1.5">
            <p className="font-sans text-xs uppercase tracking-widest text-muted opacity-60">Status</p>
            <div className="flex gap-2">
              {STATUS_OPTIONS.map((opt) => {
                const active = existing.status === opt.value;
                const c = STATUS_COLORS[opt.value];
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleStatus(opt.value)}
                    disabled={updateMutation.isPending}
                    className="flex-1 rounded-lg py-1.5 font-sans text-xs font-medium transition-all duration-200 disabled:opacity-50"
                    style={{
                      color: active ? c.color : "#C9C1B4",
                      backgroundColor: active ? c.bg : "transparent",
                      border: `1px solid ${active ? c.border : "rgba(163,130,74,0.12)"}`,
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer links */}
          <div className="flex items-center justify-between pt-1">
            <Link
              href="/collection"
              className="font-sans text-xs text-muted opacity-60 transition-opacity hover:opacity-100"
            >
              View collection →
            </Link>
            <button
              onClick={handleRemove}
              disabled={removeMutation.isPending}
              className="font-sans text-xs transition-opacity hover:opacity-100 disabled:opacity-30"
              style={{ color: "#C88C9A", opacity: 0.5 }}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleAdd}
          disabled={addMutation.isPending}
          className="btn-gold-solid flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm active:scale-95 disabled:opacity-60"
        >
          {addMutation.isPending ? (
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          )}
          Add to library
        </button>
      )}

      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onHide={() => setToast((t) => ({ ...t, visible: false }))}
      />
    </>
  );
}
