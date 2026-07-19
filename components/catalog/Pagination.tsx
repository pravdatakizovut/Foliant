interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Возвращает список кнопок пагинации: текущая страница ± 1, первая, последняя,
// многоточия ("...") обозначаются значением "…".
function getPageButtons(
  page: number,
  totalPages: number,
): (number | "…")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "…")[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);

  if (start > 2) pages.push("…");
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < totalPages - 1) pages.push("…");
  pages.push(totalPages);

  return pages;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="w-10 h-10 rounded-full flex items-center justify-center
                   disabled:opacity-30 text-[#8A8A8F] hover:text-white transition-colors cursor-pointer"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {getPageButtons(page, totalPages).map((item, index) =>
        item === "…" ? (
          <span key={`ellipsis-${index}`} className="text-[#5A5A5F]">
            …
          </span>
        ) : (
          <button
            key={`page-${item}`}
            onClick={() => onPageChange(item)}
            className={`min-w-10 h-10 px-2 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer
                       ${
                         page === item
                           ? "bg-[#E8A838] text-black"
                           : "text-[#8A8A8F] hover:text-white"
                       }`}
          >
            {item}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="w-10 h-10 rounded-full flex items-center justify-center
                   disabled:opacity-30 text-[#8A8A8F] hover:text-white transition-colors cursor-pointer"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
