import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Back button skeleton */}
                <div className="mb-6 flex items-center space-x-2">
                    <Skeleton className="w-5 h-5 rounded" />
                    <Skeleton className="h-4 w-32 rounded" />
                </div>

                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    {/* Image skeleton */}
                    <Skeleton className="w-full h-64 rounded-none" />
                    
                    <div className="p-6">
                        {/* Title and price skeleton */}
                        <div className="flex justify-between items-start mb-4">
                            <Skeleton className="h-8 w-2/3 rounded" />
                            <Skeleton className="h-8 w-24 rounded" />
                        </div>

                        {/* Location skeleton */}
                        <div className="flex items-center mb-4">
                            <Skeleton className="w-5 h-5 rounded mr-2" />
                            <Skeleton className="h-4 w-40 rounded" />
                        </div>

                        {/* Labels/tags skeleton */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} className="h-6 w-20 rounded-full" />
                            ))}
                        </div>

                        {/* Description skeleton */}
                        <div className="prose max-w-none mb-8">
                            <Skeleton className="h-6 w-32 rounded mb-3" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full rounded" />
                                <Skeleton className="h-4 w-5/6 rounded" />
                                <Skeleton className="h-4 w-4/6 rounded" />
                            </div>
                        </div>

                        {/* Action buttons skeleton */}
                        <div className="flex gap-4">
                            <Skeleton className="flex-1 h-12 rounded-lg" />
                            <Skeleton className="h-12 w-32 rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading