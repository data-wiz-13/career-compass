import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { getCareerRecommendations } from "../client/src/lib/mock-data";
import { assessmentFormSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  // Assessment routes
  app.post("/api/assessment", async (req, res) => {
    try {
      const data = assessmentFormSchema.parse(req.body);

      const results = getCareerRecommendations({
        skills: data.skills,
        interests: data.interests,
        academicPerformance: data.academicPerformance,
      });

      const assessment = await storage.createAssessment({
        userId: 1, // Using default user ID since we removed auth
        ...data,
        results,
        createdAt: new Date().toISOString(),
      });

      res.json(assessment);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  });

  app.get("/api/assessment/:id", async (req, res) => {
    const assessment = await storage.getAssessment(parseInt(req.params.id));
    if (!assessment) {
      res.status(404).json({ message: "Assessment not found" });
      return;
    }
    res.json(assessment);
  });

  const httpServer = createServer(app);
  return httpServer;
}