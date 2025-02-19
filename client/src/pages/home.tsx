import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Home() {
  const [_, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent sm:text-6xl">
          Career Compass
        </h1>

        <p className="text-xl text-muted-foreground">
          AI-powered career guidance to help you discover your perfect path.
          Get personalized recommendations based on your skills, interests,
          and academic performance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => setLocation("/assessment")}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            Get Started
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          <div className="p-6 rounded-lg border bg-card text-card-foreground">
            <h3 className="font-semibold mb-2">Smart Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Advanced algorithms analyze your profile to suggest the best career paths
            </p>
          </div>

          <div className="p-6 rounded-lg border bg-card text-card-foreground">
            <h3 className="font-semibold mb-2">3D Visualization</h3>
            <p className="text-sm text-muted-foreground">
              Interactive 3D models help you visualize career opportunities
            </p>
          </div>

          <div className="p-6 rounded-lg border bg-card text-card-foreground">
            <h3 className="font-semibold mb-2">Personalized Guidance</h3>
            <p className="text-sm text-muted-foreground">
              Get tailored recommendations based on your unique profile
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}