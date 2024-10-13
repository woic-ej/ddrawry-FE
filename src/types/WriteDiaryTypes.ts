import { z } from "zod";

export const DiaryFormSchema = z.object({
  mood: z.string(),
  weather: z.string(),
  title: z.string().max(15),
  image: z.string().optional(),
  story: z.string().min(150).max(240),
});

export type DiaryFormData = z.infer<typeof DiaryFormSchema>;
