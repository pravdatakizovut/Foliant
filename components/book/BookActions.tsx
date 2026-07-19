import { Heart } from "lucide-react";

export function BookActions() {
  return (
    <div className="flex flex-wrap gap-4">
      <button className="bg-accent-primary text-black font-medium px-6 py-3 rounded-full hover:brightness-110 transition cursor-pointer">
        Добавить на полку →
      </button>
      <button className="border border-secondary-stroke text-white px-6 py-3 rounded-full hover:bg-white/5 transition flex items-center gap-2 cursor-pointer">
        <Heart size={18} /> В избранное
      </button>
    </div>
  );
}
