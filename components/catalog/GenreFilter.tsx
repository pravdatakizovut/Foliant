export interface Genre {
  label: string;
  value?: string;
}

interface GenreFilterProps {
  genres: Genre[];
  active?: string;
  onSelect: (value?: string) => void;
}

export function GenreFilter({ genres, active, onSelect }: GenreFilterProps) {
  return (
    <div className="flex gap-2 mb-8">
      {genres.map((genre) => {
        const isActive = genre.value === active;
        return (
          <button
            key={genre.value ?? "all"}
            onClick={() => onSelect(genre.value)}
            className={`text-sm px-4 py-2 rounded-full border cursor-pointer transition-colors
              ${
                isActive
                  ? "bg-accent-primary text-black border-transparent font-medium"
                  : "bg-[#1A1A1F] text-[#8A8A8F] border-secondary-stroke hover:text-white"
              }`}
          >
            {genre.label}
          </button>
        );
      })}
    </div>
  );
}
