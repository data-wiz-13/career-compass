import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { assessmentFormSchema, type AssessmentForm } from "@shared/schema";

const SKILLS = [
  "Programming",
  "Design",
  "Writing",
  "Analysis",
  "Communication",
  "Leadership",
  "Problem Solving",
  "Critical Thinking",
];

const INTERESTS = [
  "Technology",
  "Arts",
  "Science",
  "Business",
  "Healthcare",
  "Education",
  "Engineering",
  "Social Services",
];

interface Props {
  onSubmit: (data: AssessmentForm) => void;
  isSubmitting?: boolean;
}

export function AssessmentForm({ onSubmit, isSubmitting }: Props) {
  const form = useForm<AssessmentForm>({
    resolver: zodResolver(assessmentFormSchema),
    defaultValues: {
      skills: [],
      interests: [],
      academicPerformance: "good",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="skills"
          render={() => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <div className="grid grid-cols-2 gap-4">
                {SKILLS.map((skill) => (
                  <FormField
                    key={skill}
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(skill)}
                            onCheckedChange={(checked) => {
                              const value = field.value || [];
                              if (checked) {
                                field.onChange([...value, skill]);
                              } else {
                                field.onChange(value.filter((v) => v !== skill));
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{skill}</FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interests"
          render={() => (
            <FormItem>
              <FormLabel>Interests</FormLabel>
              <div className="grid grid-cols-2 gap-4">
                {INTERESTS.map((interest) => (
                  <FormField
                    key={interest}
                    control={form.control}
                    name="interests"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(interest)}
                            onCheckedChange={(checked) => {
                              const value = field.value || [];
                              if (checked) {
                                field.onChange([...value, interest]);
                              } else {
                                field.onChange(value.filter((v) => v !== interest));
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{interest}</FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="academicPerformance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Academic Performance</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3">
                    <FormControl>
                      <RadioGroupItem value="excellent" />
                    </FormControl>
                    <FormLabel className="font-normal">Excellent</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3">
                    <FormControl>
                      <RadioGroupItem value="good" />
                    </FormControl>
                    <FormLabel className="font-normal">Good</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3">
                    <FormControl>
                      <RadioGroupItem value="average" />
                    </FormControl>
                    <FormLabel className="font-normal">Average</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3">
                    <FormControl>
                      <RadioGroupItem value="poor" />
                    </FormControl>
                    <FormLabel className="font-normal">Poor</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Analyzing..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
