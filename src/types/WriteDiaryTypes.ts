import { z } from "zod";

export const DiaryFormSchema = z.object({
  mood: z.string(),
  weather: z.string(),
  title: z.string().min(1).max(15),
  image: z.string().optional(),
  story: z.string().min(1).max(240),
});

export type DiaryFormData = z.infer<typeof DiaryFormSchema>;
