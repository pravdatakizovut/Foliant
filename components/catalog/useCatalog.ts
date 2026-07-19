"use client";

import { useState, useEffect } from "react";
import { Book } from "@/types/book";

interface UseCatalogOptions {
  page: number;
  subject?: string;
  query?: string;
  limit?: number;
}

interface UseCatalogResult {
  books: Book[];
  loading: boolean;
  error: string | null;
  totalPages: number;
}

export function useCatalog({
  page,
  subject,
  query,
  limit = 8,
}: UseCatalogOptions): UseCatalogResult {
  const [books, setBooks] = useState<Book[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadBooks() {
      setLoading(true);
      setError(null);

      const requestLimit = Math.min(limit, 20);
      const params = new URLSearchParams({
        page: String(page),
        limit: String(requestLimit),
      });
      if (subject) {
        params.set("subject", subject);
      }
      if (query) {
        params.set("q", query);
      }

      try {
        const res = await fetch(`/api/search?${params.toString()}`);

        if (!res.ok) {
          throw new Error(`Ошибка сервера: ${res.status}`);
        }

        const data = await res.json();

        if (!cancelled) {
          setBooks(data.books ?? []);
          setTotalPages(data.totalPages ?? 1);
        }
      } catch (err) {
        if (!cancelled) {
          setBooks([]);
          setError(
            err instanceof Error ? err.message : "Не удалось загрузить книги",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadBooks();

    return () => {
      cancelled = true;
    };
  }, [page, subject, query, limit]);

  return { books, loading, error, totalPages };
}
