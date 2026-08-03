"use client";

import React from "react";
import { motion } from "framer-motion";
import { Circle } from "lucide-react";

export type ActivityType = "review" | "finished" | "shelf" | "achievement";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: React.ReactNode;
  description: string;
  date: string;
}

interface RecentActivityProps {
  activities?: ActivityItem[];
}

const placeholderActivities: ActivityItem[] = [
  {
    id: "1",
    type: "review",
    title: <>Добавил рецензию на «Дюна»</>,
    description: "«Потрясающее погружение в экологию и политику пустынной планеты...»",
    date: "Вчера, 18:40",
  },
  {
    id: "2",
    type: "finished",
    title: <>Прочитал книгу «1984»</>,
    description: "Оценка: 5.0 • Сильный финал, заставляющий задуматься.",
    date: "15 марта 2026",
  },
  {
    id: "3",
    type: "shelf",
    title: <>Добавил в полку «Солярис»</>,
    description: "В категорию: Хочу прочитать",
    date: "12 марта 2026",
  },
  {
    id: "4",
    type: "achievement",
    title: <>Получил достижение «Книжный червь»</>,
    description: "За чтение 14 дней подряд без перерывов!",
    date: "10 марта 2026",
  },
];

function RecentActivity({ activities }: RecentActivityProps) {
  const isEmpty = !activities || activities.length === 0;
  const items = isEmpty ? placeholderActivities : activities;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 20,
        mass: 1,
        delay: 0.4,
      }}
      className="col-span-8 background-block p-5 flex flex-col gap-5"
    >
      <h2 className="text-xl font-semibold text-white">Последняя активность</h2>

      {isEmpty ? (
        <div className="flex items-center gap-3 text-text-secondary">
          <Circle className="w-5 h-5 text-white/20" strokeWidth={1.5} />
          <p className="text-sm leading-relaxed">
            Пока нет активности. Начните с добавления первой книги на книжную
            полку или напишите короткую рецензию.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-0">
          {items.map((activity, index) => (
            <div key={activity.id} className="flex gap-4 relative">
              {/* Timeline line */}
              {index !== items.length - 1 && (
                <div className="absolute left-[9px] top-5 bottom-[-16px] w-px bg-white/10" />
              )}

              <div className="flex flex-col items-center pt-1 shrink-0">
                <div className="w-5 h-5 rounded-full bg-accent-primary flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-bg-primary" />
                </div>
              </div>

              <div className="flex-1 pb-6">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm font-semibold text-white">{activity.title}</p>
                  <span className="text-xs text-text-secondary whitespace-nowrap">
                    {activity.date}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default RecentActivity;
