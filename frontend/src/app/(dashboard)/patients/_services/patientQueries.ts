"use server";

import apiClient from "@/clients/apiClient";
import { API_ROUTES } from "@/constants/API_ROUTES";
import { Patient } from "../_types/patient";

export const getPatients = async () => {
  const response = await apiClient.get(API_ROUTES.PATIENTS.LIST);
  return response.data;
};

export const createPatient = async (patient: Patient) => {
  const response = await apiClient.post(API_ROUTES.PATIENTS.CREATE, patient);
  return response.data;
};

export const updatePatient = async (patient: Patient) => {
  const response = await apiClient.put(
    `${API_ROUTES.PATIENTS.UPDATE}/${patient.id}`,
    patient,
  );
  return response.data;
};

export const deletePatient = async (patientId: string) => {
  const response = await apiClient.delete(
    `${API_ROUTES.PATIENTS.DELETE}/${patientId}`,
  );
  return response.data;
};

export const deletePatients = async (patientIds: string[]) => {
  const response = await apiClient.delete(API_ROUTES.PATIENTS.BULK_DELETE, {
    data: {
      patient_ids: patientIds,
    },
  });
  return response.data;
};
