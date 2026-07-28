export function SimilarBooksSkeleton() {
  return (
    <section className="mt-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Похожие книги</h2>
        <div className="h-4 w-28 bg-[#1A1A1F] rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="aspect-2/3 bg-[#1A1A1F] rounded-xl animate-pulse"
          />
        ))}
      </div>
    </section>
  );
}
