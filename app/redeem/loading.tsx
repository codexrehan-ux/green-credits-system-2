import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="mx-auto max-w-5xl px-4 py-8">
            <div className="text-center mb-8">
                <Skeleton className="h-8 w-64 mx-auto" />
                <Skeleton className="h-5 w-80 mx-auto mt-2" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                    <Skeleton key={i} className="h-24 rounded-xl" />
                ))}
            </div>
            <Skeleton className="h-64 max-w-lg mx-auto rounded-xl" />
        </div>
    );
}
