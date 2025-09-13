import { createStore } from "@/lib/createStore";
import { AlertConfigType } from "@/types";

type AlertState = {
  isOpen: boolean;
  alertConfig: AlertConfigType | null;
};

type AlertActions = {
  updateAlertState: (state: AlertState["isOpen"]) => void;
  showAlert: (alertConfig: AlertConfigType) => void;
};

type Slice = AlertState & AlertActions;

const useAlertStore = createStore<Slice>(
  (set) => ({
    isOpen: false,
    alertConfig: null,
    updateAlertState: (isOpen: AlertState["isOpen"]) =>
      set((state) => {
        state.isOpen = isOpen;
        if (!isOpen) {
          state.alertConfig = null;
        }
      }),
    showAlert: (alertConfig: AlertConfigType) =>
      set({ isOpen: true, alertConfig: alertConfig }),
  }),
  {
    name: "alert-store",
    excludeFromPersist: ["isOpen"],
  },
);

const showAlert = (config: AlertConfigType) =>
  useAlertStore.getState().showAlert(config);

export { useAlertStore, showAlert };
