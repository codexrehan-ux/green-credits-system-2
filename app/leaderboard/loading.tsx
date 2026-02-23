import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="mx-auto max-w-3xl px-4 py-8">
            <div className="text-center mb-8">
                <Skeleton className="h-8 w-48 mx-auto" />
                <Skeleton className="h-5 w-72 mx-auto mt-2" />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-8">
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-32 rounded-xl" />
                ))}
            </div>
            <Skeleton className="h-80 rounded-xl" />
        </div>
    );
}
