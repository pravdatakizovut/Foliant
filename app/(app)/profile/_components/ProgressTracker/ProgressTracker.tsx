import React from "react";

function ProgressTracker() {
  const currentYear = new Date().getFullYear();
  const read = 23;
  const goal = 50;
  const percentage = Math.round((read / goal) * 100);
  const ahead = 2;

  return (
    <div className="col-span-4 border border-border-input rounded-3xl p-5 bg-bg-secondary flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-white">Цель на {currentYear} год</h2>

      <div className="flex items-end justify-between gap-4">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-bold text-accent-primary">{read}</span>
          <span className="text-lg text-white/60">из</span>
          <span className="text-3xl font-bold text-accent-primary">{goal}</span>
          <span className="text-sm text-text-secondary uppercase tracking-wide ml-1">книг</span>
        </div>
        <span className="text-2xl font-semibold text-white">{percentage}%</span>
      </div>

      <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-accent-primary transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-sm text-text-secondary">
        Вы опережаете график на {ahead} книги! Так держать.
      </p>
    </div>
  );
}

export default ProgressTracker;
