"use client";

import { useEffect, useState } from "react";
import { Book } from "@/types/book";

interface UseSimilarBooksResult {
  books: Book[];
  loading: boolean;
}

export function useSimilarBooks(
  subject?: string,
  currentKey?: string,
  count = 8,
): UseSimilarBooksResult {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!subject) return;

    const searchSubject = subject;
    let cancelled = false;

    async function loadSimilar() {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/search?subject=${encodeURIComponent(searchSubject)}&limit=${count + 1}`,
        );
        if (!res.ok) throw new Error("Ошибка");
        const data = await res.json();
        if (!cancelled) {
          const filtered = (data.books as Book[]).filter(
            (b) => b.key !== currentKey,
          );
          setBooks(filtered.slice(0, count));
        }
      } catch {
        // игнорируем ошибки похожих книг
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadSimilar();

    return () => {
      cancelled = true;
    };
  }, [subject, currentKey, count]);

  return { books, loading };
}
