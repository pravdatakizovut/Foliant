import Link from "next/link";
import { Book } from "@/types/book";
import { BookCard } from "@/components/catalog/BookCard";

interface SimilarBooksProps {
  books: Book[];
  loading?: boolean;
}

export function SimilarBooks({ books, loading }: SimilarBooksProps) {
  if (books.length === 0 && !loading) return null;

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

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-2/3 bg-[#1A1A1F] rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <BookCard key={`${book.key}-${index}`} book={book} />
          ))}
        </div>
      )}
    </section>
  );
}
