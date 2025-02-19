import { useQuery } from "@tanstack/react-query";
import { CareerModel } from "@/components/career-model";
import { Recommendations } from "@/components/recommendations";
import { Skeleton } from "@/components/ui/skeleton";
import { Assessment } from "@shared/schema";

export default function Results({ params }: { params: { id: string } }) {
  const { data, isLoading } = useQuery<Assessment>({
    queryKey: [`/api/assessment/${params.id}`],
  });

  if (isLoading || !data) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <Skeleton className="h-[400px] w-full" />
          <div className="space-y-4">
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[100px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Your Career Path</h1>
          <p className="text-muted-foreground mt-2">
            Explore your recommended careers and courses
          </p>
        </div>

        <CareerModel careers={data.results.careers} />

        <Recommendations {...data.results} />
      </div>
    </div>
  );
}