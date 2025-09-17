"use server";

import apiClient from "@/clients/apiClient";
import { API_ROUTES } from "@/constants/API_ROUTES";

export const getPatients = async () => {
  const response = await apiClient.get(API_ROUTES.PATIENTS.LIST);
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
