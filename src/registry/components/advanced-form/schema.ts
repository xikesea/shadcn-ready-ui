import * as z from "zod";

export const formSchema = z.object({
  // Step 1: Personal Information
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  
  // Step 2: Professional Details
  role: z.string().min(1, "Please select a role"),
  experience: z.string().min(1, "Please select your experience level"),
  portfolio: z.string().url("Invalid URL").optional().or(z.literal("")),
  
  // Step 3: Preferences & Terms
  notifications: z.boolean(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export type FormValues = z.infer<typeof formSchema>;
