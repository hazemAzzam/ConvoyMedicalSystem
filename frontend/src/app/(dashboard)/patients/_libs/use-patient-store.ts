import { createStore } from "@/lib/createStore";

type State = {
  selectedPatientId: string | null;
  selectedPatientType: "adult" | "pediatric";
  patientDiaglogOpen: boolean;
};

type Actions = {
  updateSelectedPatient: (
    patientId: string,
    patientType: "adult" | "pediatric",
  ) => void;
  updatePatientDiaglogOpen: (open: boolean) => void;
};

type Store = State & Actions;

const usePatientStore = createStore<Store>(
  (set) => ({
    selectedPatientId: null,
    selectedPatientType: "adult",
    patientDiaglogOpen: false,
    updateSelectedPatient: (patientId, patientType) =>
      set({ selectedPatientId: patientId, selectedPatientType: patientType }),
    updatePatientDiaglogOpen: (open) => set({ patientDiaglogOpen: open }),
  }),
  {
    name: "patient-store",
  },
);

export default usePatientStore;
