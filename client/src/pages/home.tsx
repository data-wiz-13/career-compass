import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { HeroSphere } from "@/components/hero-sphere";
import { motion } from "framer-motion";

export default function Home() {
  const [_, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <HeroSphere />

      <div className="max-w-2xl text-center space-y-8 relative">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent sm:text-6xl"
        >
          Career Compass
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-muted-foreground"
        >
          AI-powered career guidance to help you discover your perfect path.
          Get personalized recommendations based on your skills, interests,
          and academic performance.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            onClick={() => setLocation("/assessment")}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transform hover:scale-105 transition-all"
          >
            Get Started
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          {[
            {
              title: "Smart Analysis",
              description: "Advanced algorithms analyze your profile to suggest the best career paths",
            },
            {
              title: "3D Visualization",
              description: "Interactive 3D models help you visualize career opportunities",
            },
            {
              title: "Personalized Guidance",
              description: "Get tailored recommendations based on your unique profile",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="p-6 rounded-lg border bg-card text-card-foreground backdrop-blur-sm bg-opacity-80 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}