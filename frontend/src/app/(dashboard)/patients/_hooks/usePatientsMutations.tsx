"use server";

import { executeActions } from "@/lib/excuteActions";
import { createPatient, updatePatient } from "../_services/patientQueries";
import { Patient } from "../_types/patient";
import { deletePatient } from "../_services/patientQueries";
import { deletePatients } from "../_services/patientQueries";

export const useCreatePatient = async (patient: Patient) => {
  return executeActions({
    actionFn: () => createPatient(patient),
  });
};

export const useUpdatePatient = async (patient: Patient) => {
  return executeActions({
    actionFn: () => updatePatient(patient),
  });
};

export const useDeletePatient = async (id: string) => {
  return executeActions({
    actionFn: () => deletePatient(id),
  });
};

export const useDeletePatients = async (ids: string[]) => {
  return executeActions({
    actionFn: () => deletePatients(ids),
  });
};
