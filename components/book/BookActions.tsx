"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, BookOpen, Check } from "lucide-react";
import { addOrUpdateUserBook } from "@/app/actions/userBooks";
import type { BookDetails } from "@/types/book";

interface BookActionsProps {
  book: BookDetails;
}

export function BookActions({ book }: BookActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const router = useRouter();

  async function handleStartReading() {
    setIsLoading(true);
    const result = await addOrUpdateUserBook({
      book: {
        key: book.key,
        title: book.title,
        author_name: book.author_name,
        cover_i: book.cover_i ?? undefined,
        ratings_average: book.ratings_average,
        first_publish_year: book.first_publish_year,
        number_of_pages_median: book.number_of_pages_median,
      },
      status: "reading",
    });
    setIsLoading(false);

    if (!result.error) {
      setIsAdded(true);
      router.push("/profile");
    }
  }

  return (
    <div className="flex flex-wrap gap-4">
      <button
        onClick={handleStartReading}
        disabled={isLoading || isAdded}
        className="bg-accent-primary text-black font-medium px-6 py-3 rounded-full hover:brightness-110 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {isAdded ? <Check size={18} /> : <BookOpen size={18} />}
        {isLoading ? "Добавляем..." : isAdded ? "Добавлено" : "Читать"}
      </button>
      <button className="border border-secondary-stroke text-white px-6 py-3 rounded-full hover:bg-white/5 transition flex items-center gap-2 cursor-pointer">
        <Heart size={18} /> В избранное
      </button>
    </div>
  );
}
