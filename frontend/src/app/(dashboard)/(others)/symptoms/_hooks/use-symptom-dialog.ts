import { createStore } from "@/lib/createStore";

type SymtpomState = {
  isOpen: boolean;
};

type SymptomAction = {
  //   toggleDialogState: () => void;
  updateDialogState: (isOpen: boolean) => void;
};

type Slice = SymtpomState & SymptomAction;

export const useSymptomDiaglog = createStore<Slice>(
  (set) => ({
    isOpen: false,
    // toggleDialogState: () => set((state) => ({ isOpen: !state.isOpen })),
    updateDialogState: (isOpen) => set((state) => ({ isOpen })),
  }),
  {
    name: "symptom-dialog",
  },
);
