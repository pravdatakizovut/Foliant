"use client";

import { useEffect, useState } from "react";
import { BookDetails } from "@/types/book";

interface UseBookResult {
  book: BookDetails | null;
  loading: boolean;
  error: string | null;
}

export function useBook(id: string): UseBookResult {
  const [book, setBook] = useState<BookDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || id === "undefined") {
      return;
    }

    let cancelled = false;

    async function loadBook() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/book/${encodeURIComponent(id)}`);
        if (!res.ok) throw new Error("Ошибка загрузки");
        const data = await res.json();
        if (!cancelled) setBook(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Ошибка");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadBook();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { book, loading, error };
}
