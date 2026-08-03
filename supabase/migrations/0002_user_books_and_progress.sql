-- Books cache: храним метаданные из Open Library, чтобы не дёргать их API постоянно
CREATE TABLE IF NOT EXISTS public.books (
  key text primary key,
  title text not null,
  author_name text,
  cover_url text,
  first_publish_year integer,
  number_of_pages_median integer,
  subjects text[],
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Books are viewable by everyone" ON public.books;
CREATE POLICY "Books are viewable by everyone"
  ON public.books FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can add books" ON public.books;
CREATE POLICY "Authenticated users can add books"
  ON public.books FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated users can update books" ON public.books;
CREATE POLICY "Authenticated users can update books"
  ON public.books FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- User books: книги пользователя и их статус
CREATE TABLE IF NOT EXISTS public.user_books (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  book_key text references public.books(key) on delete cascade not null,
  status text not null check (status in ('want_to_read', 'reading', 'finished', 'dropped')),
  started_at timestamptz,
  finished_at timestamptz,
  rating decimal(2,1) check (rating >= 0 and rating <= 5),
  review_text text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, book_key)
);

ALTER TABLE public.user_books ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "User books are viewable by everyone" ON public.user_books;
CREATE POLICY "User books are viewable by everyone"
  ON public.user_books FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can add own books" ON public.user_books;
CREATE POLICY "Users can add own books"
  ON public.user_books FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own books" ON public.user_books;
CREATE POLICY "Users can update own books"
  ON public.user_books FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own books" ON public.user_books;
CREATE POLICY "Users can delete own books"
  ON public.user_books FOR DELETE
  USING (auth.uid() = user_id);

-- Reading progress: прогресс чтения по каждой книге
CREATE TABLE IF NOT EXISTS public.reading_progress (
  id uuid primary key default gen_random_uuid(),
  user_book_id uuid references public.user_books(id) on delete cascade not null,
  progress_percent integer not null check (progress_percent >= 0 and progress_percent <= 100),
  progress_pages integer,
  updated_at timestamptz default now(),
  unique(user_book_id)
);

ALTER TABLE public.reading_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Reading progress is viewable by everyone" ON public.reading_progress;
CREATE POLICY "Reading progress is viewable by everyone"
  ON public.reading_progress FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can manage own reading progress" ON public.reading_progress;
CREATE POLICY "Users can manage own reading progress"
  ON public.reading_progress FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.user_books ub
      WHERE ub.id = reading_progress.user_book_id
      AND ub.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_books ub
      WHERE ub.id = reading_progress.user_book_id
      AND ub.user_id = auth.uid()
    )
  );

-- Trigger function для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS books_updated_at ON public.books;
CREATE TRIGGER books_updated_at
  BEFORE UPDATE ON public.books
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS user_books_updated_at ON public.user_books;
CREATE TRIGGER user_books_updated_at
  BEFORE UPDATE ON public.user_books
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
