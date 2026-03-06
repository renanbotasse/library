"use client";

import { useIsInCollection, useUpdateCollectionEntry } from "@/hooks/useCollection";
import { StarRating } from "@/components/ui/StarRating";
import { NoteEditor } from "@/components/ui/NoteEditor";
import { useState } from "react";
import { Toast } from "@/components/ui/Toast";

interface Props {
  bookId: string;
}

export function BookReview({ bookId }: Props) {
  const existing       = useIsInCollection(bookId);
  const updateMutation = useUpdateCollectionEntry();
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: "success" | "error" }>({
    visible: false, message: "", type: "success",
  });

  if (!existing) return null;

  const handleRating = async (rating: number) => {
    try {
      await updateMutation.mutateAsync({ id: existing.id, updates: { rating } });
    } catch {
      setToast({ visible: true, message: "Failed to update rating.", type: "error" });
    }
  };

  const handleNotes = async (notes: string) => {
    try {
      await updateMutation.mutateAsync({ id: existing.id, updates: { notes } });
      setToast({ visible: true, message: "Notes saved!", type: "success" });
    } catch {
      setToast({ visible: true, message: "Failed to save notes.", type: "error" });
    }
  };

  return (
    <>
      <div
        className="space-y-4 pt-5"
        style={{ borderTop: "1px solid rgba(163,130,74,0.08)" }}
      >
        <div className="space-y-1.5">
          <p className="font-sans text-xs uppercase tracking-widest text-muted opacity-60">Your Rating</p>
          <StarRating value={existing.rating} onChange={handleRating} size="md" />
        </div>

        <NoteEditor
          value={existing.notes}
          onSave={handleNotes}
          loading={updateMutation.isPending}
        />
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onHide={() => setToast((t) => ({ ...t, visible: false }))}
      />
    </>
  );
}
