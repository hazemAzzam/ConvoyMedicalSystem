import { z } from "zod";

export interface ClinicType {
  id: string | null;
  name: string;
  description?: string;
}

export const clinicSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const updateClinicSchema = z.intersection(
  clinicSchema,
  z.object({
    id: z.string(),
  }),
);

export type ClinicSchema = z.infer<typeof clinicSchema>;
export type UpdateClinicSchema = z.infer<typeof updateClinicSchema>;
