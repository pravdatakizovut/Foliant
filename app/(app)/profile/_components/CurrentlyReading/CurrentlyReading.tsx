"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import type { UserBookWithDetails } from "@/types/book";

interface CurrentlyReadingProps {
  userBook?: UserBookWithDetails | null;
}

function CurrentlyReading({ userBook }: CurrentlyReadingProps) {
  const isEmpty = !userBook;
  const book = userBook?.books;
  const progress = userBook?.reading_progress?.progress_percent ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 20,
        mass: 1,
        delay: 0.25,
      }}
      className="col-span-8 background-block p-5 flex flex-col gap-5"
    >
      <h2 className="text-xl font-semibold text-white">Читаю сейчас</h2>

      {isEmpty || !book ? (
        <div className="flex items-center gap-5">
          <div className="w-18 h-25 rounded-lg bg-bg-input border border-white/10 flex items-center justify-center shrink-0">
            <BookOpen className="w-7 h-7 text-white/20" strokeWidth={1.5} />
          </div>

          <div className="flex flex-col gap-1.5 flex-1">
            <p className="text-base font-semibold text-white">
              Вы пока ничего не читаете
            </p>
            <p className="text-sm text-text-secondary leading-relaxed max-w-md">
              Добавьте книгу из нашего огромного каталога, чтобы начать
              отслеживать свой прогресс.
            </p>
          </div>

          <Link
            href="/catalog"
            className="inline-flex items-center justify-center shrink-0 rounded-xl bg-accent-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-accent-primary/90"
          >
            Найти книгу
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-5">
          <div className="w-18 h-25 rounded-lg bg-bg-input border border-white/10 overflow-hidden shrink-0">
            {book.cover_url ? (
              <Image
                src={book.cover_url}
                alt={book.title}
                width={72}
                height={100}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-accent-primary/20 to-bg-input">
                <BookOpen className="w-7 h-7 text-white/30" strokeWidth={1.5} />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <div className="flex flex-col gap-1">
              <p className="text-base font-semibold text-white">{book.title}</p>
              <p className="text-sm text-text-secondary">{book.author_name}</p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary">Прогресс чтения</span>
                <span className="text-accent-primary font-medium">
                  {progress}%
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-accent-primary transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <Link
            href={`/book/${encodeURIComponent(userBook.book_key)}`}
            className="inline-flex items-center justify-center shrink-0 rounded-xl bg-accent-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-accent-primary/90"
          >
            Продолжить
          </Link>
        </div>
      )}
    </motion.div>
  );
}

export default CurrentlyReading;
