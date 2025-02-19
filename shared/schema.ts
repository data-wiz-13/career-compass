import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  googleId: text("google_id").notNull().unique(),
  email: text("email").notNull(),
  name: text("name").notNull(),
});

export const assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  skills: text("skills").array().notNull(),
  interests: text("interests").array().notNull(),
  academicPerformance: text("academic_performance").notNull(),
  results: jsonb("results").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertAssessmentSchema = createInsertSchema(assessments).omit({ id: true });

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Assessment = typeof assessments.$inferSelect;
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;

export const assessmentFormSchema = z.object({
  skills: z.array(z.string()),  
  interests: z.array(z.string()).min(1, "Select at least one interest"), 
  academicPerformance: z.enum(["excellent", "good", "average", "poor"]),
});

export type AssessmentForm = z.infer<typeof assessmentFormSchema>;