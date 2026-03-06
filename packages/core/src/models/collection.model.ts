export type ReadingStatus = "to_read" | "reading" | "read";

export interface CollectionEntry {
  id: string;
  userId: string;
  googleBookId: string;
  title: string;
  author: string | null;
  coverUrl: string | null;
  status: ReadingStatus;
  rating: number | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export type CreateCollectionEntry = Pick<
  CollectionEntry,
  "googleBookId" | "title" | "author" | "coverUrl"
>;

export type UpdateCollectionEntry = Partial<Pick<CollectionEntry, "status" | "rating" | "notes">>;
