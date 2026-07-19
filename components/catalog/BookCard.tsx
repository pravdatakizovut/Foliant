import Image from "next/image";
import Link from "next/link";
import { Book } from "@/types/book";
import { StarRating } from "./StarRating";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/book/${encodeURIComponent(book.key)}`} className="block">
      <div className="group cursor-pointer">
        {/* Обложка */}
        <div className="relative aspect-2/3 rounded-xl overflow-hidden mb-3 bg-[#1A1A1F]">
          {book.cover_i ? (
            <Image
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
              alt={book.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover group-hover:scale-[1.05] transition-transform duration-500 ease-out will-change-transform"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#5A5A5F]">
              Нет обложки
            </div>
          )}

          {/* Лайк (для вида) */}
          <button
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 
                             flex items-center justify-center opacity-0 group-hover:opacity-100 
                             transition-opacity"
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* Информация */}
        <h3 className="font-medium text-white mb-1 line-clamp-2 group-hover:text-accent-primary transition-colors">
          {book.title}
        </h3>
        <p className="text-[#8A8A8F] text-sm mb-2">
          {book.author_name?.[0] || "Неизвестный автор"}
        </p>

        {/* Рейтинг */}
        <div className="flex items-center gap-2">
          <StarRating rating={book.ratings_average} />
          <span className="text-text-secondary text-sm">
            {book.ratings_average?.toFixed(1) || "—"}
          </span>
        </div>

        {/* Мета */}
        <div className="flex items-center gap-2 mt-2 text-[#5A5A5F] text-xs">
          <span className="px-2 py-1 rounded-md border border-secondary-stroke ">
            {book.first_publish_year}
          </span>
          <span className="px-2 py-1 rounded-md border border-secondary-stroke ">
            {book.number_of_pages_median} стр.
          </span>
        </div>
      </div>
    </Link>
  );
}
