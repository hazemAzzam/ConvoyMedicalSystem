export interface Patient {
  id: string;
  patient_type: "adult" | "pediatric";
  code: string;
  age: string;
  house_number: string;
  name: string;
  gender: "male" | "female";
  mobile_number: string;
  created_at: string;
  updated_at: string;
}

export interface Adult extends Patient {
  // Basic info
  occupation: string;
  marital_status: "married" | "single" | "divorced" | "widowed";
  children_number: number;
  age_of_the_youngest: number;
  education_level:
    | "illiterate"
    | "read_write"
    | "primary"
    | "preparatory"
    | "secondary"
    | "university"
    | "postgraduate";

  // Smoking habits
  smoking: "yes" | "no";
  smoking_rate?: string | null;
  smoking_type?: string | null;
  other_smoking?: string | null;
  cessation: "yes" | "no";
  cessation_duration?: string | null;

  // Menstruation (for females)
  menstruation?: "regular" | "irregular" | "menopause" | null;
  gravidal_number?: string | null;
  abortion_number?: string | null;

  // Contraception
  contraception?: "yes" | "no";
  contraception_method?: "implant" | "iud" | "coc" | "other" | null;
  contraception_other_method?: string | null;

  // Complaints (ManyToMany - array of IDs)
  complaints: string[];

  // General Examination
  bp?: string | null;
  hr?: number | null;
  temp?: number | null;
  rbs?: number | null;
  spo2?: number | null;
  cyanosis: string[];
  jaundice: "yes" | "no";
  pallor: "yes" | "no";

  // Past History
  medical: string[];
  allergy: "yes" | "no";
  allergy_specification?: string | null;
  blood_transfusion: "no" | "occasional" | "regular";
  blood_transfusion_duration?: string | null;
  surgical?: "icu" | "operation" | null;
  surgical_operation?: string | null;
  icu?: string | null;
  drugs: string[];

  // Family History
  family_history: string[];
}

// Pediatric patients inherit from Patient
export interface Pediatric extends Patient {
  // Pediatric-specific fields can be added here in the future
}

// Union type for all patient types
export type PatientUnion = Adult | Pediatric;

// API Response types
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  page_size: number;
  current_page: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
  results: T[];
}

export type PaginatedPatientsResponse = PaginatedResponse<PatientUnion>;
export type PaginatedAdultsResponse = PaginatedResponse<Adult>;

// Autocomplete types (minimal data)
export interface PatientAutocomplete {
  id: string;
  name: string;
  mobile_number: string;
}

export interface AdultAutocomplete {
  id: string;
  name: string;
  mobile_number: string;
  age: number;
  occupation: string;
}

// Form types (for creating/updating)
export type CreatePatient = Omit<Patient, "id" | "created_at" | "updated_at">;
export type CreateAdult = Omit<Adult, "id" | "created_at" | "updated_at">;
export type CreatePediatric = Omit<
  Pediatric,
  "id" | "created_at" | "updated_at"
>;

export type UpdatePatient = Partial<CreatePatient>;
export type UpdateAdult = Partial<CreateAdult>;
export type UpdatePediatric = Partial<CreatePediatric>;
