import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackLink() {
  return (
    <Link
      href="/catalog"
      className="inline-flex items-center gap-2 text-[#8A8A8F] hover:text-white transition-colors mb-8"
    >
      <ArrowLeft size={18} /> Назад в каталог
    </Link>
  );
}
