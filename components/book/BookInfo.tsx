import { BookDetails } from "@/types/book";
import { StarRating } from "@/components/catalog/StarRating";
import { BookActions } from "./BookActions";

interface BookInfoProps {
  book: BookDetails;
}

export function BookInfo({ book }: BookInfoProps) {
  const metaItems = [
    book.first_publish_year ? String(book.first_publish_year) : null,
    book.subjects?.[0] || null,
    book.number_of_pages_median ? `${book.number_of_pages_median} стр.` : null,
  ].filter(Boolean);

  const extraInfo = [
    { label: "Издательство", value: book.publisher || "—" },
    {
      label: "Язык",
      value: book.language === "eng" ? "Русский" : book.language || "—",
    },
    { label: "ISBN", value: book.isbn || "—" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{book.title}</h1>
        <p className="text-lg text-[#8A8A8F]">
          {book.author_name?.[0] || "Неизвестный автор"}
        </p>
      </div>

      {metaItems.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {metaItems.map((item, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-sm border border-secondary-stroke text-[#8A8A8F]"
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {book.ratings_average && (
        <div className="flex items-center gap-2">
          <StarRating rating={book.ratings_average} />
          <span className="text-[#8A8A8F]">
            {book.ratings_average.toFixed(1)}
          </span>
        </div>
      )}

      <p className="text-[#B0B0B5] leading-relaxed text-base">
        {book.description}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-t border-b border-secondary-stroke">
        {extraInfo.map((item) => (
          <div key={item.label}>
            <p className="text-[#5A5A5F] text-sm mb-1">{item.label}</p>
            <p className="text-white">{item.value}</p>
          </div>
        ))}
      </div>

      <BookActions book={book} />
    </div>
  );
}
