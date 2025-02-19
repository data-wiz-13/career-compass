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
      { title: "IT Consultant", confidence: 0.75 },
      { title: "System Administrator", confidence: 0.7 },
    ],
    Arts: [
      { title: "Graphic Designer", confidence: 0.9 },
      { title: "Art Director", confidence: 0.85 },
      { title: "Content Creator", confidence: 0.8 },
      { title: "UI Designer", confidence: 0.75 },
      { title: "Brand Designer", confidence: 0.7 },
    ],
    Science: [
      { title: "Research Scientist", confidence: 0.9 },
      { title: "Laboratory Technician", confidence: 0.85 },
      { title: "Environmental Scientist", confidence: 0.8 },
      { title: "Data Analyst", confidence: 0.75 },
      { title: "Biotechnologist", confidence: 0.7 },
    ],
    Business: [
      { title: "Business Analyst", confidence: 0.9 },
      { title: "Project Manager", confidence: 0.85 },
      { title: "Marketing Manager", confidence: 0.8 },
      { title: "Financial Analyst", confidence: 0.75 },
      { title: "Management Consultant", confidence: 0.7 },
    ],
    Healthcare: [
      { title: "Medical Researcher", confidence: 0.9 },
      { title: "Healthcare Administrator", confidence: 0.85 },
      { title: "Clinical Data Manager", confidence: 0.8 },
      { title: "Health Informatics Specialist", confidence: 0.75 },
    ],
    Education: [
      { title: "Educational Technologist", confidence: 0.9 },
      { title: "Curriculum Developer", confidence: 0.85 },
      { title: "E-learning Specialist", confidence: 0.8 },
      { title: "Academic Advisor", confidence: 0.75 },
    ],
    Engineering: [
      { title: "Software Architect", confidence: 0.9 },
      { title: "DevOps Engineer", confidence: 0.85 },
      { title: "Cloud Engineer", confidence: 0.8 },
      { title: "Systems Engineer", confidence: 0.75 },
    ],
    "Social Services": [
      { title: "Career Counselor", confidence: 0.9 },
      { title: "HR Specialist", confidence: 0.85 },
      { title: "Training Coordinator", confidence: 0.8 },
      { title: "Organizational Development Consultant", confidence: 0.75 },
    ],
  };

  const courseMap = {
    Technology: [
      "Bachelor of Computer Science",
      "Web Development Bootcamp",
      "Machine Learning Certification",
      "Cloud Computing Certification",
      "Cybersecurity Fundamentals",
    ],
    Arts: [
      "Bachelor of Fine Arts",
      "Digital Design Certificate",
      "Creative Writing Program",
      "UI/UX Design Bootcamp",
      "Motion Graphics Course",
    ],
    Science: [
      "Bachelor of Science",
      "Research Methodology Course",
      "Laboratory Techniques Certificate",
      "Data Analysis Certification",
      "Scientific Computing Course",
    ],
    Business: [
      "Bachelor of Business Administration",
      "Project Management Professional (PMP)",
      "Digital Marketing Certificate",
      "Business Analytics Course",
      "Leadership Development Program",
    ],
    Healthcare: [
      "Health Informatics Certificate",
      "Medical Research Methods",
      "Healthcare Management Degree",
      "Clinical Data Management Course",
    ],
    Education: [
      "Educational Technology Certificate",
      "Instructional Design Course",
      "E-learning Development Program",
      "Education Management Degree",
    ],
    Engineering: [
      "Software Engineering Degree",
      "Cloud Architecture Certification",
      "DevOps Engineering Course",
      "Systems Design Certificate",
    ],
    "Social Services": [
      "Career Development Certification",
      "HR Management Degree",
      "Training and Development Course",
      "Organizational Psychology Program",
    ],
  };

  // Get careers based on interests (handle single interest case)
  const recommendedCareers = assessment.interests.flatMap((interest) => {
    const careers = careerMap[interest as keyof typeof careerMap] || [];
    // Add confidence boost for matching skills
    return careers.map(career => ({
      ...career,
      confidence: Math.min(1, career.confidence + (
        assessment.skills.length > 0 ? 0.1 : 0
      ))
    }));
  });

  // Get courses based on interests
  const recommendedCourses = Array.from(
    new Set(
      assessment.interests.flatMap(
        (interest) => courseMap[interest as keyof typeof courseMap] || []
      )
    )
  );

  // Ensure we always return some results even with one selection
  const careers = recommendedCareers.length > 0 ? recommendedCareers : [
    { title: "Career Counselor", confidence: 0.7 },
    { title: "Professional Coach", confidence: 0.65 }
  ];

  const courses = recommendedCourses.length > 0 ? recommendedCourses : [
    "Career Development Fundamentals",
    "Professional Skills Workshop"
  ];

  // Create a more detailed explanation
  const explanation = `Based on your ${assessment.academicPerformance} academic performance and ${
    assessment.interests.length === 1 ? 
    `interest in ${assessment.interests[0]}` : 
    `interests in ${assessment.interests.join(", ")}`
  }${
    assessment.skills.length > 0 ? 
    `, combined with your skills in ${assessment.skills.join(", ")}` :
    ""
  }, these career paths and courses would be most suitable for you. ${
    assessment.interests.length === 1 ? 
    "Consider exploring related fields to broaden your opportunities." :
    "Your diverse interests open up multiple career possibilities."
  }`;

  return {
    careers: careers.slice(0, 5), // Return top 5 careers
    courses: courses.slice(0, 5), // Return top 5 courses
    explanation,
  };
}