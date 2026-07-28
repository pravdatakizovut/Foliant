export function BookDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-10 md:gap-16 animate-pulse">
      <div className="relative aspect-2/3 rounded-xl overflow-hidden bg-[#1A1A1F] w-full max-w-[320px] mx-auto md:mx-0" />

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="h-8 md:h-10 bg-[#1A1A1F] rounded w-3/4" />
          <div className="h-5 bg-[#1A1A1F] rounded w-1/2" />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="h-7 w-24 bg-[#1A1A1F] rounded-full" />
          <div className="h-7 w-20 bg-[#1A1A1F] rounded-full" />
          <div className="h-7 w-28 bg-[#1A1A1F] rounded-full" />
        </div>

        <div className="h-5 w-32 bg-[#1A1A1F] rounded" />

        <div className="space-y-2">
          <div className="h-4 bg-[#1A1A1F] rounded w-full" />
          <div className="h-4 bg-[#1A1A1F] rounded w-full" />
          <div className="h-4 bg-[#1A1A1F] rounded w-5/6" />
          <div className="h-4 bg-[#1A1A1F] rounded w-4/5" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-t border-b border-secondary-stroke">
          <div className="space-y-2">
            <div className="h-3 bg-[#1A1A1F] rounded w-20" />
            <div className="h-4 bg-[#1A1A1F] rounded w-32" />
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-[#1A1A1F] rounded w-16" />
            <div className="h-4 bg-[#1A1A1F] rounded w-24" />
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-[#1A1A1F] rounded w-14" />
            <div className="h-4 bg-[#1A1A1F] rounded w-40" />
          </div>
        </div>

        <div className="h-10 w-40 bg-[#1A1A1F] rounded" />
      </div>
    </div>
  );
}
