export function BookSkeleton() {
  return (
    <div className="text-left">
      <div className="relative mb-3 overflow-hidden rounded-lg shadow-md h-48 bg-muted animate-pulse" />
      <div className="h-4 bg-muted rounded animate-pulse mb-2 w-3/4" />
      <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
    </div>
  )
}

export function BookSkeletonGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <BookSkeleton key={i} />
      ))}
    </div>
  )
}
