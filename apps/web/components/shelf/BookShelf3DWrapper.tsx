"use client";

import dynamic from "next/dynamic";
import type { CollectionEntry } from "@tomekeep/core";

const BookShelf3D = dynamic(
  () => import("./BookShelf3D").then((m) => ({ default: m.BookShelf3D })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[60vh] w-full items-center justify-center rounded-2xl border border-stone-800 bg-stone-900/40">
        <div className="space-y-2 text-center">
          <svg className="mx-auto h-6 w-6 animate-spin text-amber-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-xs text-stone-500">Loading 3D shelf…</p>
        </div>
      </div>
    ),
  }
);

export function BookShelf3DWrapper({ entries }: { entries: CollectionEntry[] }) {
  return <BookShelf3D entries={entries} />;
}
