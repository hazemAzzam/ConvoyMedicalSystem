import z from "zod";

export type SymptomType = {
  id?: string;
  name: string;
  description?: string;
  clinic: string; // This should be the clinic ID, not name
  clinic_name?: string; // This is read-only from backend
};

export type SymptomOptionType = {
  value: string;
  label: string;
};

export const SymptomSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  clinic: z.string().min(1, "Clinic is required"),
  clinic_name: z.string().optional(),
});
