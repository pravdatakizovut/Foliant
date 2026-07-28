"use client";

import { useParams } from "next/navigation";
import { useBook } from "@/components/book/useBook";
import { useSimilarBooks } from "@/components/book/useSimilarBooks";
import { BackLink } from "@/components/book/BackLink";
import { BookDetails } from "@/components/book/BookDetails";
import { BookDetailsSkeleton } from "@/components/book/BookDetailsSkeleton";
import { BookError } from "@/components/book/BookError";
import { SimilarBooks } from "@/components/book/SimilarBooks";
import { SimilarBooksSkeleton } from "@/components/book/SimilarBooksSkeleton";

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

  if (error) {
    return <BookError message={error} />;
  }

  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white  pt-40 pb-10">
      <div className="foliant-container">
        <BackLink />

        {loading ? (
          <BookDetailsSkeleton />
        ) : book ? (
          <BookDetails book={book} />
        ) : (
          <BookError message="Книга не найдена" />
        )}

        {book && (similarLoading ? <SimilarBooksSkeleton /> : <SimilarBooks books={similarBooks} />)}
      </div>
    </main>
  );
}
