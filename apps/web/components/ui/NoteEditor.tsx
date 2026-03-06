"use client";

import { useState } from "react";

interface NoteEditorProps {
  value: string | null;
  onSave: (notes: string) => void;
  loading?: boolean;
}

export function NoteEditor({ value, onSave, loading = false }: NoteEditorProps) {
  const [text, setText] = useState(value ?? "");
  const [editing, setEditing] = useState(false);
  const MAX = 500;

  const handleSave = () => {
    onSave(text);
    setEditing(false);
  };

  return (
    <div className="space-y-2">
      <label className="label-wl">Personal Notes</label>
      {editing ? (
        <div className="space-y-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, MAX))}
            rows={4}
            placeholder="Write your thoughts about this book..."
            className="input-wl resize-none"
            autoFocus
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={loading}
                className="btn-gold-solid rounded-lg px-4 py-1.5 text-xs disabled:opacity-50"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setText(value ?? "");
                  setEditing(false);
                }}
                className="btn-dark rounded-lg px-4 py-1.5 text-xs"
              >
                Cancel
              </button>
            </div>
            <span
              className="font-sans text-xs"
              style={{ color: text.length >= MAX ? "#E05C6A" : "rgba(201,193,180,0.4)" }}
            >
              {text.length}/{MAX}
            </span>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="w-full rounded-xl border px-4 py-3 text-left text-sm transition-all"
          style={{
            borderColor: "rgba(163,130,74,0.12)",
            backgroundColor: "rgba(21,19,27,0.6)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(163,130,74,0.28)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(163,130,74,0.12)";
          }}
        >
          {text ? (
            <p className="whitespace-pre-wrap text-text">{text}</p>
          ) : (
            <p className="italic text-muted opacity-50">Add a note...</p>
          )}
        </button>
      )}
    </div>
  );
}
