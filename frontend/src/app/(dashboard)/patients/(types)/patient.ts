export interface Patient {
  id: string;
  code: string;
  name: string;
  house_number: string;
  mobile_number: string;
  dateOfBirth: string;
  gender: "Male" | "Female" | "Other";
  address: string;
  status: "Active" | "Inactive" | "Pending";
  lastVisit: string;
  totalVisits: number;
  insuranceProvider: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface Adult {
  id: string;
  code: string;
  house_number: string;
  name: string;
  gender: string;
  mobile_number: string;
  created_at: string;
  updated_at: string;
}

export interface AdultDetails {
  id: string;
  name: string;
  mobile_number: string;
  created_at: string;
  updated_at: string;
  occupation: string;
  marital_status: string;
  children_number: number;
  age_of_the_youngest: number;
  education_level: string;
  age: number;
  smoking: boolean;
  smoking_rate: string;
  smoking_type: string;
  other_smoking: string;
  cessation: boolean;
  cessation_duration: string;
  menstruation: string;
  gravidal_number: string;
  abortion_number: string;
  contraception: boolean;
  contraception_method: string;
  contraception_other_method: string;
  complaints: string[];
  bp: string;
  hr: number;
  temp: number;
  rbs: number;
  spo2: number;
  cyanosis: string[];
  jaundice: boolean;
  pallor: boolean;
  medical: string[];
  allergy: boolean;
  allergy_specification: string;
  blood_transfusion: string;
  blood_transfusion_duration: string;
  surgical: string;
  surgical_operation: string;
  icu: string;
  drugs: string[];
  family_history: string[];
}
