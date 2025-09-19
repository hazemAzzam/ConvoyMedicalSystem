import { z } from "zod";

// Choice constants from backend
export const EDUCATION_LEVELS = [
  "illiterate",
  "read_write",
  "primary",
  "preparatory",
  "secondary",
  "university",
  "postgraduate",
] as const;

export const MENSTRUATIONS = ["regular", "irregular", "menopause"] as const;

export const CONTRACEPTION_METHODS = [
  "implant",
  "iud",
  "coc",
  "other",
] as const;

export const BLOOD_TRANSFUSIONS = ["no", "occasional", "regular"] as const;

export const SURGICALS = ["icu", "operation"] as const;

export const PATIENT_TYPES = ["adult", "pediatric"] as const;
export const GENDERS = ["male", "female"] as const;
export const MARITAL_STATUSES = [
  "married",
  "single",
  "divorced",
  "widowed",
] as const;

// Base Patient Schema
export const PatientSchema = z.object({
  id: z.string(),
  patient_type: z.enum(PATIENT_TYPES),
  code: z.string().min(1, "Code is required"),
  house_number: z.string().min(1, "House number is required"),
  name: z.string().min(2, "Name must be at least 2 characters long"),
  gender: z.enum(GENDERS),
  mobile_number: z.string().min(11, "Mobile number must be at least 11 digits"),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

// Adult-specific fields schema
export const AdultFieldsSchema = z.object({
  // Basic info
  occupation: z.string().min(1, "Occupation is required"),
  marital_status: z.enum(MARITAL_STATUSES),
  children_number: z.coerce
    .number()
    .int()
    .min(0, "Children number cannot be negative")
    .nullable()
    .optional(),
  age_of_the_youngest: z.coerce
    .number()
    .int()
    .min(0, "Age of youngest child cannot be negative")
    .nullable()
    .optional(),
  education_level: z.enum(EDUCATION_LEVELS),
  age: z.coerce
    .number()
    .int()
    .min(0, "Age cannot be negative")
    .max(150, "Age seems unrealistic")
    .nullable()
    .optional(),

  // Smoking habits
  smoking: z.string().default("no"),
  smoking_rate: z.string().nullable().optional(),
  smoking_type: z.string().nullable().optional(),
  other_smoking: z.string().nullable().optional(),
  cessation: z.string().default("no"),
  cessation_duration: z.string().nullable().optional(),

  // Menstruation (for females)
  menstruation: z.enum(MENSTRUATIONS).nullable().optional(),
  gravidal_number: z.string().nullable().optional(),
  abortion_number: z.string().nullable().optional(),

  // Contraception
  contraception: z.string().default("no"),
  contraception_method: z.enum(CONTRACEPTION_METHODS).nullable().optional(),
  contraception_other_method: z.string().nullable().optional(),

  // Complaints (ManyToMany - will be array of IDs)
  complaints: z.array(z.string()).default([]),

  // General Examination
  bp: z.string().nullable().optional(),
  hr: z.number().nullable().optional(),
  temp: z.number().nullable().optional(),
  rbs: z.number().nullable().optional(),
  spo2: z.number().nullable().optional(),
  cyanosis: z.array(z.string()).default([]),
  jaundice: z.string().default("no"),
  pallor: z.string().default("no"),

  // Past History
  medical: z.array(z.string()).default([]),
  allergy: z.string().default("no"),
  allergy_specification: z.string().nullable().optional(),
  blood_transfusion: z.enum(BLOOD_TRANSFUSIONS).default("no"),
  blood_transfusion_duration: z.string().nullable().optional(),
  surgical: z.enum(SURGICALS).nullable().optional(),
  surgical_operation: z.string().nullable().optional(),
  icu: z.string().nullable().optional(),
  drugs: z.array(z.string()).default([]),

  // Family History
  family_history: z.array(z.string()).default([]),
});

// Complete Adult Schema (Patient + Adult fields)
export const AdultSchema = z.intersection(PatientSchema, AdultFieldsSchema);

// Pediatric Schema (inherits from Patient)
export const PediatricSchema = PatientSchema;

// Create Patient Schema (for forms - without read-only fields)
export const CreatePatientSchema = PatientSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const CreateAdultSchema = z.intersection(
  CreatePatientSchema,
  AdultFieldsSchema,
);

export const CreatePediatricSchema = PediatricSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

// Autocomplete schemas (minimal data)
export const PatientAutocompleteSchema = z.object({
  id: z.string(),
  name: z.string(),
  mobile_number: z.string(),
});

export const AdultAutocompleteSchema = z.object({
  id: z.string(),
  name: z.string(),
  mobile_number: z.string(),
});

// Default Values
export const DEFAULT_PATIENT_VALUES: z.infer<typeof CreatePatientSchema> = {
  patient_type: "adult",
  code: "",
  house_number: "",
  name: "",
  gender: "male",
  mobile_number: "",
};

export const DEFAULT_ADULT_VALUES: z.infer<typeof CreateAdultSchema> = {
  // Base patient fields
  patient_type: "adult",
  code: "",
  house_number: "",
  name: "",
  gender: "male",
  mobile_number: "",

  // Adult-specific fields
  occupation: "",
  marital_status: "single",
  children_number: 0,
  age_of_the_youngest: 0,
  education_level: "primary",
  age: null,

  // Smoking habits
  smoking: "no",
  smoking_rate: null,
  smoking_type: null,
  other_smoking: null,
  cessation: "no",
  cessation_duration: null,

  // Menstruation (for females)
  menstruation: null,
  gravidal_number: null,
  abortion_number: null,

  // Contraception
  contraception: false,
  contraception_method: null,
  contraception_other_method: null,

  // Complaints
  complaints: [],

  // General Examination
  bp: null,
  hr: null,
  temp: null,
  rbs: null,
  spo2: null,
  cyanosis: [],
  jaundice: false,
  pallor: false,

  // Past History
  medical: [],
  allergy: false,
  allergy_specification: null,
  blood_transfusion: "no",
  blood_transfusion_duration: null,
  surgical: null,
  surgical_operation: null,
  icu: null,
  drugs: [],

  // Family History
  family_history: [],
};

export const DEFAULT_PEDIATRIC_VALUES: z.infer<typeof CreatePediatricSchema> = {
  patient_type: "pediatric",
  code: "",
  house_number: "",
  name: "",
  gender: "male",
  mobile_number: "",
};

// Form field options for dropdowns
export const FORM_OPTIONS = {
  patientTypes: [
    { value: "adult", label: "Adult" },
    { value: "pediatric", label: "Pediatric" },
  ],
  genders: [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ],
  maritalStatuses: [
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
    { value: "divorced", label: "Divorced" },
    { value: "widowed", label: "Widowed" },
  ],
  educationLevels: [
    { value: "illiterate", label: "Illiterate" },
    { value: "read_write", label: "Read and Write" },
    { value: "primary", label: "Primary" },
    { value: "preparatory", label: "Preparatory" },
    { value: "secondary", label: "Secondary" },
    { value: "university", label: "University" },
    { value: "postgraduate", label: "Postgraduate" },
  ],
  menstruations: [
    { value: "regular", label: "Regular" },
    { value: "irregular", label: "Irregular" },
    { value: "menopause", label: "Menopause" },
  ],
  contraceptionMethods: [
    { value: "implant", label: "Implant" },
    { value: "iud", label: "IUD" },
    { value: "coc", label: "COC" },
    { value: "other", label: "Other" },
  ],
  bloodTransfusions: [
    { value: "no", label: "No" },
    { value: "occasional", label: "Occasional" },
    { value: "regular", label: "Regular" },
  ],
  surgicals: [
    { value: "icu", label: "ICU" },
    { value: "operation", label: "Operation" },
  ],
  smoking: [
    { value: "no", label: "No" },
    { value: "yes", label: "Yes" },
  ],
  cessation: [
    { value: "no", label: "No" },
    { value: "yes", label: "Yes" },
  ],
} as const;

// Type exports
export type Patient = z.infer<typeof PatientSchema>;
export type AdultType = z.infer<typeof AdultSchema>;
export type PediatricType = z.infer<typeof PediatricSchema>;

export type CreatePatient = z.infer<typeof CreatePatientSchema>;
export type CreateAdultType = z.infer<typeof CreateAdultSchema>;
export type UpdateAdultType = z.infer<typeof AdultSchema>;
export type CreatePediatricType = z.infer<typeof CreatePediatricSchema>;

export type PatientAutocomplete = z.infer<typeof PatientAutocompleteSchema>;
export type AdultAutocompleteType = z.infer<typeof AdultAutocompleteSchema>;

// Choice type exports
export type PatientType = (typeof PATIENT_TYPES)[number];
export type Gender = (typeof GENDERS)[number];
export type MaritalStatus = (typeof MARITAL_STATUSES)[number];
export type EducationLevel = (typeof EDUCATION_LEVELS)[number];
export type Menstruation = (typeof MENSTRUATIONS)[number];
export type ContraceptionMethod = (typeof CONTRACEPTION_METHODS)[number];
export type BloodTransfusion = (typeof BLOOD_TRANSFUSIONS)[number];
export type Surgical = (typeof SURGICALS)[number];
