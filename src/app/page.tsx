import { Suspense } from "react";
import { redirect } from "next/navigation";
import ServiceList from "@/components/serviceList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home(props: { searchParams: { search?: string } }) {
  const searchTerm = props.searchParams.search;

  return (
    <>
      <h1 className="text-center text-4xl font-bold tracking-tight sm:text-6xl">
        Name Seeker
      </h1>
      <p className="mt-2 text-center text-lg text-gray-500">
        Search if the name if your next idea is available everywhere
      </p>
      <form
        action={
          // eslint-disable-next-line
          async (event) => {
            "use server";
            const name = event.get("name")?.toString();
            redirect(`/?search=${name ?? ""}`);
          }
        }
      >
        <div className="my-4 flex w-full items-center space-x-2">
          <Input type="text" placeholder="Name" name="name" />
          <Button type="submit" variant="default">
            Seek
          </Button>
        </div>
      </form>
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
        <ServiceList searchTerm={searchTerm} />
      </Suspense>
    </>
  );
}
