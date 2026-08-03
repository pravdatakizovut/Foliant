"use client";

import React from "react";
import { motion } from "framer-motion";
import { PieChart } from "lucide-react";

export interface Genre {
  name: string;
  percentage: number;
  color: string;
}

interface FavoriteGenresProps {
  genres?: Genre[];
}

const placeholderGenres: Genre[] = [
  { name: "Научная фантастика", percentage: 35, color: "bg-accent-primary" },
  { name: "Классика", percentage: 25, color: "bg-green" },
  { name: "Детектив", percentage: 15, color: "bg-link" },
  { name: "Фэнтези", percentage: 15, color: "bg-purple-500" },
  { name: "Нон-фикшн", percentage: 10, color: "bg-white/40" },
];

function FavoriteGenres({ genres }: FavoriteGenresProps) {
  const hasGenres = genres && genres.length > 0;
  const items = hasGenres ? genres : placeholderGenres;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 20,
        mass: 1,
        delay: 0.3,
      }}
      className="col-span-4 background-block p-5 flex flex-col gap-5"
    >
      <h2 className="text-xl font-semibold text-white">Любимые жанры</h2>

      {!hasGenres ? (
        <div className="flex flex-col items-center justify-center gap-5 py-6 text-center">
          <PieChart className="w-16 h-16 text-white/20" strokeWidth={1.5} />
          <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
            Здесь появится статистика по вашим любимым жанрам, как только вы
            добавите прочитанные книги.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((genre) => (
            <div key={genre.name} className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/90">{genre.name}</span>
                <span className="text-text-secondary">{genre.percentage}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className={`h-full rounded-full ${genre.color} transition-all duration-500`}
                  style={{ width: `${genre.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default FavoriteGenres;
