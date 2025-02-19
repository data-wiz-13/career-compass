import { useLocation } from "wouter";
import { AssessmentForm } from "@/components/assessment-form";
import { type AssessmentForm as FormData } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Assessment() {
  const [_, navigate] = useLocation();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await apiRequest("POST", "/api/assessment", data);
      return res.json();
    },
    onSuccess: (data) => {
      navigate(`/results/${data.id}`);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Career Assessment</h1>
          <p className="text-muted-foreground mt-2">
            Tell us about your skills and interests to get personalized recommendations
          </p>
        </div>

        <AssessmentForm onSubmit={mutate} isSubmitting={isPending} />
      </div>
    </div>
  );
}