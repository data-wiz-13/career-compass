import OpenAI from "openai";

const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY });

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024
export async function getCareerRecommendations(assessment: {
  skills: string[];
  interests: string[];
  academicPerformance: string;
}): Promise<{
  careers: Array<{ title: string; confidence: number }>;
  courses: string[];
  explanation: string;
}> {
  const prompt = `Based on the following assessment, recommend suitable careers and courses:
    Skills: ${assessment.skills.join(", ")}
    Interests: ${assessment.interests.join(", ")}
    Academic Performance: ${assessment.academicPerformance}

    Provide recommendations in this JSON format:
    {
      "careers": [{ "title": string, "confidence": number }],
      "courses": string[],
      "explanation": string
    }

    The confidence should be between 0 and 1.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  const content = response.choices[0].message?.content;
  if (!content) {
    throw new Error("No content returned from OpenAI");
  }
  return JSON.parse(content);
}