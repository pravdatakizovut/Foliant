export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  ratings_average?: number;
  first_publish_year?: number;
  number_of_pages_median?: number;
}

export type BookStatus =
  | "want_to_read"
  | "reading"
  | "finished"
  | "dropped";

export interface CachedBook {
  key: string;
  title: string;
  author_name: string | null;
  cover_url: string | null;
  first_publish_year: number | null;
  number_of_pages_median: number | null;
  subjects: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface UserBook {
  id: string;
  user_id: string;
  book_key: string;
  status: BookStatus;
  started_at: string | null;
  finished_at: string | null;
  rating: number | null;
  review_text: string | null;
  created_at: string;
  updated_at: string;
}

export interface ReadingProgress {
  id: string;
  user_book_id: string;
  progress_percent: number;
  progress_pages: number | null;
  updated_at: string;
}

export interface UserBookWithDetails extends UserBook {
  books: CachedBook | null;
  reading_progress: ReadingProgress | null;
}
