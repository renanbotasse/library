export type { BookSummary, BookDetail } from "./models/book.model";
export type {
  CollectionEntry,
  CreateCollectionEntry,
  UpdateCollectionEntry,
  ReadingStatus,
} from "./models/collection.model";
export {
  mapOLDocToSummary,
  mapOLWorkToDetail,
  mapGoogleVolumeToSummary,
  mapGoogleVolumeToDetail,
} from "./mappers/book.mapper";
