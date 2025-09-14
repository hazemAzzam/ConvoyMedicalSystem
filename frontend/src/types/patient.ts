export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
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
