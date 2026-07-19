import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BookErrorProps {
  message?: string;
}

export function BookError({ message = "Книга не найдена" }: BookErrorProps) {
  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white py-24 px-6">
      <div className="foliant-container text-center">
        <p className="text-[#E8A838]">{message}</p>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 mt-4 text-accent-primary hover:underline"
        >
          <ArrowLeft size={16} /> Вернуться в каталог
        </Link>
      </div>
    </main>
  );
}
