import Image from "next/image";

interface BookCoverProps {
  coverId?: number;
  title: string;
}

export function BookCover({ coverId, title }: BookCoverProps) {
  return (
    <div className="relative aspect-2/3 rounded-xl overflow-hidden bg-[#1A1A1F] w-full max-w-[320px] mx-auto md:mx-0">
      {coverId ? (
        <Image
          src={`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`}
          alt={title}
          fill
          sizes="320px"
          className="object-cover"
          priority
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-[#5A5A5F]">
          Нет обложки
        </div>
      )}
    </div>
  );
}
