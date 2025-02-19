# Career Compass Architecture

## Overview
Career Compass is an AI-powered career guidance platform built with React, TypeScript, and Express. The application provides personalized career recommendations through an intuitive interface with 3D visualizations.

## Key Components

### Frontend (`/client`)

#### Pages
- `home.tsx`: Landing page with 3D hero sphere
- `assessment.tsx`: Career assessment form
- `results.tsx`: Displays career recommendations with 3D visualization

#### Components
- `assessment-form.tsx`: Form for collecting user skills and interests
- `career-model.tsx`: 3D visualization of career matches using Three.js
- `hero-sphere.tsx`: Interactive 3D sphere for the landing page
- `recommendations.tsx`: Displays career and course recommendations

### Backend (`/server`)

#### Core Files
- `index.ts`: Express server setup
- `routes.ts`: API endpoints for assessments
- `storage.ts`: In-memory storage implementation

### Shared (`/shared`)
- `schema.ts`: TypeScript types and Zod schemas for type safety

## Data Flow

1. User fills out assessment form (`assessment-form.tsx`)
2. Form data sent to `/api/assessment` endpoint
3. Server processes data and stores in memory
4. Results displayed with 3D visualization (`career-model.tsx`)

## Key Features

### 1. Assessment System
- Skills selection
- Interest areas
- Academic performance rating

### 2. 3D Visualizations
- Interactive career spheres
- Dynamic sizing based on match confidence
- Smooth animations

### 3. Recommendations
- Career matches with confidence scores
- Relevant courses
- Detailed explanations

## Technical Stack

### Frontend
- React with TypeScript
- Three.js for 3D graphics
- shadcn/ui components
- TanStack Query for API calls
- Tailwind CSS for styling

### Backend
- Express.js server
- In-memory storage
- OpenAI integration (configured)

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Set environment variables:
```
VITE_OPENAI_API_KEY=your_api_key
```

3. Start development server:
```bash
npm run dev
```

## API Endpoints

### POST /api/assessment
Creates a new assessment

Request body:
```typescript
{
  skills: string[];
  interests: string[];
  academicPerformance: "excellent" | "good" | "average" | "poor";
}
```

### GET /api/assessment/:id
Retrieves an assessment by ID

Response:
```typescript
{
  id: number;
  userId: number;
  skills: string[];
  interests: string[];
  academicPerformance: string;
  results: {
    careers: Array<{ title: string; confidence: number }>;
    courses: string[];
    explanation: string;
  };
  createdAt: string;
}
```
