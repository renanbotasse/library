import { create } from "zustand";
import type { ReadingStatus } from "@tomekeep/core";

type ViewMode = "grid" | "shelf";

interface UIStore {
  // Collection filters
  activeFilter: ReadingStatus | "all";
  setFilter: (filter: ReadingStatus | "all") => void;

  // Collection search
  collectionSearch: string;
  setCollectionSearch: (q: string) => void;

  // Rating filter (0 = all)
  ratingFilter: number;
  setRatingFilter: (r: number) => void;

  // View mode (grid vs 3D shelf)
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;

  // Mobile nav
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  activeFilter: "all",
  setFilter: (filter) => set({ activeFilter: filter }),

  collectionSearch: "",
  setCollectionSearch: (q) => set({ collectionSearch: q }),

  ratingFilter: 0,
  setRatingFilter: (r) => set({ ratingFilter: r }),

  viewMode: "grid",
  setViewMode: (mode) => set({ viewMode: mode }),
  toggleViewMode: () =>
    set((state) => ({ viewMode: state.viewMode === "grid" ? "shelf" : "grid" })),

  mobileNavOpen: false,
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
}));
