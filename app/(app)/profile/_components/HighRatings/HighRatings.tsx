"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export interface RatedBook {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  rating: number;
}

interface HighRatingsProps {
  books?: RatedBook[];
}

const placeholderBooks: RatedBook[] = [
  {
    id: "1",
    title: "Проект «Аве Мария»",
    author: "Энди Вейр",
    rating: 4.8,
  },
  {
    id: "2",
    title: "Дюна",
    author: "Фрэнк Герберт",
    rating: 4.5,
  },
  {
    id: "3",
    title: "1984",
    author: "Джордж Оруэлл",
    rating: 4.7,
  },
];

function HighRatings({ books }: HighRatingsProps) {
  const isEmpty = !books || books.length === 0;
  const items = isEmpty ? placeholderBooks : books;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 20,
        mass: 1,
        delay: 0.35,
      }}
      className="col-span-8 background-block p-5 flex flex-col gap-5"
    >
      <h2 className="text-xl font-semibold text-white">Высокие оценки</h2>

      {isEmpty ? (
        <div className="flex items-center gap-3 text-text-secondary">
          <Star className="w-5 h-5 text-white/20" strokeWidth={1.5} />
          <p className="text-sm leading-relaxed">
            Ваши любимые произведения и высшие оценки появятся в этом блоке.
          </p>
        </div>
      ) : (
        <div className="flex gap-6 overflow-x-auto pb-2">
          {items.map((book) => (
            <div
              key={book.id}
              className="flex items-center gap-4 min-w-[260px]"
            >
              <div className="w-[72px] h-[100px] rounded-lg bg-bg-input border border-white/10 overflow-hidden shrink-0">
                {book.coverUrl ? (
                  <Image
                    src={book.coverUrl}
                    alt={book.title}
                    width={72}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-primary/20 to-bg-input">
                    <Star className="w-7 h-7 text-white/30" strokeWidth={1.5} />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-base font-semibold text-white">{book.title}</p>
                <p className="text-sm text-text-secondary">{book.author}</p>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-gold" fill="currentColor" strokeWidth={0} />
                  <span className="text-sm font-medium text-white">{book.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default HighRatings;
