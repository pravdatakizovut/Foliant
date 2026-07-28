import Link from "next/link";
import { Book } from "@/types/book";
import { BookCard } from "@/components/catalog/BookCard";
import { SimilarBooksSkeleton } from "./SimilarBooksSkeleton";

interface SimilarBooksProps {
  books: Book[];
  loading?: boolean;
}

export function SimilarBooks({ books, loading }: SimilarBooksProps) {
  if (loading) {
    return <SimilarBooksSkeleton />;
  }

  if (books.length === 0) return null;

  return (
    <section className="mt-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Похожие книги</h2>
        <Link
          href="/catalog"
          className="text-[#8A8A8F] hover:text-white transition flex items-center gap-1 text-sm"
        >
          Смотреть все →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {books.map((book, index) => (
          <BookCard key={`${book.key}-${index}`} book={book} />
        ))}
      </div>
    </section>
  );
}
