// Mock career recommendations based on skills and interests
export function getCareerRecommendations(assessment: {
  skills: string[];
  interests: string[];
  academicPerformance: string;
}): {
  careers: Array<{ title: string; confidence: number }>;
  courses: string[];
  explanation: string;
} {
  const careerMap = {
    Technology: [
      { title: "Software Engineer", confidence: 0.9 },
      { title: "Data Scientist", confidence: 0.85 },
      { title: "UX Designer", confidence: 0.8 },
    ],
    Arts: [
      { title: "Graphic Designer", confidence: 0.9 },
      { title: "Art Director", confidence: 0.85 },
      { title: "Content Creator", confidence: 0.8 },
    ],
    Science: [
      { title: "Research Scientist", confidence: 0.9 },
      { title: "Laboratory Technician", confidence: 0.85 },
      { title: "Environmental Scientist", confidence: 0.8 },
    ],
    Business: [
      { title: "Business Analyst", confidence: 0.9 },
      { title: "Project Manager", confidence: 0.85 },
      { title: "Marketing Manager", confidence: 0.8 },
    ],
  };

  const courseMap = {
    Technology: [
      "Bachelor of Computer Science",
      "Web Development Bootcamp",
      "Machine Learning Certification",
    ],
    Arts: [
      "Bachelor of Fine Arts",
      "Digital Design Certificate",
      "Creative Writing Program",
    ],
    Science: [
      "Bachelor of Science",
      "Research Methodology Course",
      "Laboratory Techniques Certificate",
    ],
    Business: [
      "Bachelor of Business Administration",
      "Project Management Professional (PMP)",
      "Digital Marketing Certificate",
    ],
  };

  // Get careers based on interests
  const recommendedCareers = assessment.interests.flatMap(
    (interest) => careerMap[interest as keyof typeof careerMap] || []
  );

  // Get courses based on interests
  const recommendedCourses = Array.from(
    new Set(
      assessment.interests.flatMap(
        (interest) => courseMap[interest as keyof typeof courseMap] || []
      )
    )
  );

  return {
    careers: recommendedCareers.slice(0, 5), // Return top 5 careers
    courses: recommendedCourses.slice(0, 5), // Return unique top 5 courses
    explanation: `Based on your ${assessment.academicPerformance} academic performance and interests in ${assessment.interests.join(
      ", "
    )}, along with skills in ${assessment.skills.join(
      ", "
    )}, these career paths and courses would be most suitable for you.`,
  };
}