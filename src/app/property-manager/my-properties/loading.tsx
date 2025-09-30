function Loading() {
  const skeletonCards = Array.from({ length: 6 });
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-48 bg-gray-200 rounded-md animate-pulse" />
          <div className="h-4 w-64 bg-gray-200 rounded-md animate-pulse" />
        </div>
        <div className="h-10 w-40 bg-gray-200 rounded-lg animate-pulse" />
      </div>

      {/* Filters Skeleton */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-10 w-44 bg-gray-200 rounded-lg animate-pulse" />
          <div className="flex h-10 w-32 rounded-lg overflow-hidden">
            <div className="flex-1 bg-gray-200 animate-pulse" />
            <div className="flex-1 bg-gray-200 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Properties Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {skeletonCards.map((_, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-48 w-full bg-gray-200 animate-pulse" />
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <div className="h-5 w-3/4 bg-gray-200 rounded-md animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-200 rounded-md animate-pulse" />
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="h-6 w-24 bg-gray-200 rounded-md animate-pulse" />
                <div className="flex space-x-2">
                  <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse" />
                  <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse" />
                  <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Loading;