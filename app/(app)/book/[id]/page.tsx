"use client";

import { useParams } from "next/navigation";
import { useBook } from "@/components/book/useBook";
import { useSimilarBooks } from "@/components/book/useSimilarBooks";
import { BackLink } from "@/components/book/BackLink";
import { BookDetails } from "@/components/book/BookDetails";
import { BookError } from "@/components/book/BookError";
import { BookSkeleton } from "@/components/book/BookSkeleton";
import { SimilarBooks } from "@/components/book/SimilarBooks";

export default function BookPage() {
  const params = useParams();
  const id = decodeURIComponent(params.id as string);

  const { book, loading, error } = useBook(id);
  const { books: similarBooks, loading: similarLoading } = useSimilarBooks(
    book?.subjects?.[0],
    book?.key,
  );

  if (!id || id === "undefined") {
    return <BookError message="Книга не найдена" />;
  }

  if (loading) {
    return <BookSkeleton />;
  }

  if (error || !book) {
    return <BookError message={error || "Книга не найдена"} />;
  }

  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white  pt-40 pb-10">
      <div className="foliant-container">
        <BackLink />
        <BookDetails book={book} />
        <SimilarBooks books={similarBooks} loading={similarLoading} />
      </div>
    </main>
  );
}
