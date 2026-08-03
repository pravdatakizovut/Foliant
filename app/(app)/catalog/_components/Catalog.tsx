"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCatalog } from "../../../../components/catalog/useCatalog";
import { SearchInput } from "../../../../components/catalog/SearchInput";
import { GenreFilter } from "../../../../components/catalog/GenreFilter";
import { BookCard } from "../../../../components/catalog/BookCard";
import { BookCardSkeleton } from "../../../../components/catalog/BookCardSkeleton";
import { Pagination } from "../../../../components/catalog/Pagination";
import type { Genre } from "../../../../components/catalog/GenreFilter";
import Image from "next/image";

const genres: Genre[] = [
  { label: "Все" },
  { label: "Фантастика", value: "science_fiction" },
  { label: "Классика", value: "classics" },
  { label: "Детектив", value: "mystery" },
  { label: "Научпоп", value: "popular_science" },
  { label: "Роман", value: "romance" },
  { label: "Поэзия", value: "poetry" },
];

const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

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
    <div className="min-h-screen   text-white  mb-10 foliant-container">
      <Image
        src="/catalog_dc3.png"
        width={1979.5}
        height={168}
        alt="bg"
        className="absolute inset-0 -z-1"
        draggable={false}
      />
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 ">
          {Array.from({ length: limit }).map((_, i) => (
            <BookCardSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20 text-[#E8A838]">{error}</div>
      ) : books.length === 0 ? (
        <div className="text-center py-20 text-[#8A8A8F]">Книги не найдены</div>
      ) : (
        <motion.div
          key={`${page}-${genre ?? "all"}-${query}`}
          variants={gridVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {books.map((book, index) => (
            <motion.div key={`${book.key}-${index}`} variants={itemVariants}>
              <BookCard book={book} />
            </motion.div>
          ))}
        </motion.div>
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
