"use client";

import { useState } from "react";
import { useCatalog } from "./useCatalog";
import { SearchInput } from "./SearchInput";
import { GenreFilter } from "./GenreFilter";
import { BookCard } from "./BookCard";
import { BookCardSkeleton } from "./BookCardSkeleton";
import { Pagination } from "./Pagination";
import type { Genre } from "./GenreFilter";

const genres: Genre[] = [
  { label: "Все" },
  { label: "Фантастика", value: "science_fiction" },
  { label: "Классика", value: "classics" },
  { label: "Детектив", value: "mystery" },
  { label: "Научпоп", value: "popular_science" },
  { label: "Роман", value: "romance" },
  { label: "Поэзия", value: "poetry" },
];

interface CatalogProps {
  title?: string;
  showSearch?: boolean;
  showFilters?: boolean;
  showPagination?: boolean;
  limit?: number;
}

export function Catalog({
  title,
  showSearch = true,
  showFilters = true,
  showPagination = true,
  limit = 8,
}: CatalogProps) {
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState<string | undefined>(undefined);
  const [query, setQuery] = useState("");
  const { books, loading, error, totalPages } = useCatalog({
    page,
    subject: genre,
    query,
    limit,
  });

  function handleGenreChange(nextGenre?: string) {
    setGenre(nextGenre);
    setPage(1);
  }

  function handleSearchChange(nextQuery: string) {
    setQuery(nextQuery);
    setPage(1);
  }

  return (
    <div className="min-h-screen foliant-container bg-[#0A0A0F] text-white   ">
      {title && <h1 className="text-3xl font-bold mb-8">{title}</h1>}

      {showSearch && (
        <SearchInput value={query} onChange={handleSearchChange} />
      )}
      {showFilters && (
        <GenreFilter
          genres={genres}
          active={genre}
          onSelect={handleGenreChange}
        />
      )}

      {/* Сетка книг */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: limit }).map((_, i) => (
            <BookCardSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20 text-[#E8A838]">{error}</div>
      ) : books.length === 0 ? (
        <div className="text-center py-20 text-[#8A8A8F]">Книги не найдены</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <BookCard key={`${book.key}-${index}`} book={book} />
          ))}
        </div>
      )}

      {showPagination && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
