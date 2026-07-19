export function BookSkeleton() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white py-24 px-6">
      <div className="foliant-container animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-12">
          <div className="aspect-2/3 bg-[#1A1A1F] rounded-xl" />
          <div className="space-y-4">
            <div className="h-8 bg-[#1A1A1F] rounded w-1/2" />
            <div className="h-4 bg-[#1A1A1F] rounded w-1/3" />
            <div className="h-4 bg-[#1A1A1F] rounded w-3/4" />
            <div className="h-32 bg-[#1A1A1F] rounded w-full" />
          </div>
        </div>
      </div>
    </main>
  );
}
