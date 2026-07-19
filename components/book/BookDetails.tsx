import { BookDetails as BookDetailsType } from "@/types/book";
import { BookCover } from "./BookCover";
import { BookInfo } from "./BookInfo";

interface BookDetailsProps {
  book: BookDetailsType;
}

export function BookDetails({ book }: BookDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-10 md:gap-16">
      <BookCover coverId={book.cover_i} title={book.title} />
      <BookInfo book={book} />
    </div>
  );
}
