import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  careers: Array<{ title: string; confidence: number }>;
  courses: string[];
  explanation: string;
}

export function Recommendations({ careers, courses, explanation }: Props) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recommended Careers</CardTitle>
          <CardDescription>
            Based on your skills, interests, and academic performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px]">
            {careers.map((career) => (
              <div
                key={career.title}
                className="flex items-center justify-between mb-4"
              >
                <span className="font-medium">{career.title}</span>
                <Badge variant="secondary">
                  {Math.round(career.confidence * 100)}% Match
                </Badge>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommended Courses</CardTitle>
          <CardDescription>
            Educational pathways to help you achieve your career goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px]">
            <ul className="list-disc pl-6 space-y-2">
              {courses.map((course) => (
                <li key={course}>{course}</li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{explanation}</p>
        </CardContent>
      </Card>
    </div>
  );
}
