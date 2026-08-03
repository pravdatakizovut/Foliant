"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Book, BookStatus } from "@/types/book";

interface AddOrUpdateUserBookInput {
  book: Book;
  status: BookStatus;
  rating?: number | null;
  reviewText?: string | null;
  progressPercent?: number | null;
}

function buildCoverUrl(coverId?: number): string | null {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
}

export async function addOrUpdateUserBook(input: AddOrUpdateUserBookInput) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Необходимо авторизоваться" };
  }

  const { book, status, rating, reviewText, progressPercent } = input;

  // 1. Кэшируем книгу в public.books
  const { error: bookError } = await supabase
    .from("books")
    .upsert(
      {
        key: book.key,
        title: book.title,
        author_name: book.author_name?.[0] ?? null,
        cover_url: buildCoverUrl(book.cover_i),
        first_publish_year: book.first_publish_year ?? null,
        number_of_pages_median: book.number_of_pages_median ?? null,
        subjects: null,
      },
      { onConflict: "key" },
    );

  if (bookError) {
    return { error: bookError.message };
  }

  // 2. Добавляем/обновляем user_books
  const startedAt = status === "reading" ? new Date().toISOString() : null;
  const finishedAt = status === "finished" ? new Date().toISOString() : null;

  const { data: userBook, error: userBookError } = await supabase
    .from("user_books")
    .upsert(
      {
        user_id: user.id,
        book_key: book.key,
        status,
        started_at: startedAt,
        finished_at: finishedAt,
        rating: rating ?? null,
        review_text: reviewText ?? null,
      },
      { onConflict: "user_id, book_key" },
    )
    .select("id")
    .single();

  if (userBookError || !userBook) {
    return { error: userBookError?.message ?? "Не удалось сохранить книгу" };
  }

  // 3. Если книга в процессе чтения и передан прогресс — сохраняем его
  if (status === "reading" && progressPercent !== undefined && progressPercent !== null) {
    const { error: progressError } = await supabase
      .from("reading_progress")
      .upsert(
        {
          user_book_id: userBook.id,
          progress_percent: Math.min(100, Math.max(0, progressPercent)),
          progress_pages: null,
        },
        { onConflict: "user_book_id" },
      );

    if (progressError) {
      return { error: progressError.message };
    }
  }

  revalidatePath(`/profile/${user.id}`);
  return { success: true };
}

export async function updateReadingProgress(
  userBookId: string,
  progressPercent: number,
  progressPages?: number | null,
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Необходимо авторизоваться" };
  }

  const clampedProgress = Math.min(100, Math.max(0, progressPercent));

  const { error: progressError } = await supabase
    .from("reading_progress")
    .upsert(
      {
        user_book_id: userBookId,
        progress_percent: clampedProgress,
        progress_pages: progressPages ?? null,
      },
      { onConflict: "user_book_id" },
    );

  if (progressError) {
    return { error: progressError.message };
  }

  // Если дочитали 100%, автоматом помечаем книгу как finished
  if (clampedProgress === 100) {
    await supabase
      .from("user_books")
      .update({ status: "finished", finished_at: new Date().toISOString() })
      .eq("id", userBookId)
      .eq("user_id", user.id);
  }

  revalidatePath(`/profile/${user.id}`);
  return { success: true };
}

export async function removeUserBook(userBookId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Необходимо авторизоваться" };
  }

  const { error } = await supabase
    .from("user_books")
    .delete()
    .eq("id", userBookId)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/profile/${user.id}`);
  return { success: true };
}
