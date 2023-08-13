import { Suspense } from "react";
import ServiceList from "@/components/serviceList";
import { Skeleton } from "@/components/ui/skeleton";

export default function ResultsPage(props: {
  searchParams: { search?: string };
}) {
  const searchTerm = props.searchParams.search;
  return (
    <Suspense
      fallback={
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      }
    >
      <ServiceList searchTerm={searchTerm!} />
    </Suspense>
  );
}
