"use client";
import React from "react";
import { Flame } from "lucide-react";
import { motion } from "framer-motion";

function StreakTracker() {
  const streak = 14;
  const record = 28;

  // Заглушка: 4 недели по 7 дней (28 квадратов)
  // 1 — активный день, 0 — неактивный
  const activity = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1,
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 400, // жёсткость пружины
        damping: 20, // затухание: чем меньше — тем больше раскачка
        mass: 1, // масса: чем больше — тем инертнее
        delay: 0.4,
      }}
      className="col-span-4 border  background-block p-5  flex flex-col gap-5"
    >
      <h2 className="text-xl font-semibold text-white">Ударный режим</h2>

      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-accent-primary/12 flex items-center justify-center">
          <Flame className="w-8 h-8 text-accent-primary" />
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-bold text-white">
            {streak} дней подряд
          </span>
          <span className="text-sm text-text-secondary">
            Рекорд за всё время: {record} дней
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-sm text-text-secondary">
          Активность за последние 4 недели
        </span>

        <div className="grid grid-cols-7 gap-x-2 gap-y-2 w-fit">
          {activity.map((active, index) => (
            <div
              key={index}
              className={[
                "w-4 h-4 rounded-sm",
                active ? "bg-accent-primary" : "bg-white/10",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default StreakTracker;
