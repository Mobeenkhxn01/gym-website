import { z } from "zod";

export const consultationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name too long").trim(),
  email: z.string().email("Invalid email address").max(254, "Email too long").trim().toLowerCase(),
  phone: z
    .string()
    .min(7, "Phone number too short")
    .max(20, "Phone number too long")
    .regex(/^[+\d\s\-().]+$/, "Invalid phone number format")
    .trim(),
  goal: z.string().min(1).max(200).trim().default("Build muscle"),
  plan: z.enum(["Starter", "Performance", "Elite Coaching"]).default("Performance"),
});

export type ConsultationInput = z.infer<typeof consultationSchema>;
