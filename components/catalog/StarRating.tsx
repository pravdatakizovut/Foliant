"use client";

interface StarRatingProps {
  rating?: number;
}

export function StarRating({ rating }: StarRatingProps) {
  const percentage = Math.min(
    100,
    Math.max(0, ((rating ?? 0) / 5) * 100),
  );
  const starPath =
    "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

  return (
    <div className="relative inline-flex">
      {/* Пустые звёзды (фон) */}
      <div className="flex text-secondary-stroke">
        {[...Array(5)].map((_, i) => (
          <svg
            key={`star-empty-${i}`}
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d={starPath} />
          </svg>
        ))}
      </div>
      {/* Заполненные звёзды, обрезанные по рейтингу */}
      <div
        className="absolute top-0 left-0 flex overflow-hidden text-accent-primary whitespace-nowrap"
        style={{ width: `${percentage}%` }}
      >
        {[...Array(5)].map((_, i) => (
          <svg
            key={`star-filled-${i}`}
            className="w-4 h-4 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d={starPath} />
          </svg>
        ))}
      </div>
    </div>
  );
}
