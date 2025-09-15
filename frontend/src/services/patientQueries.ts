"use server";

import apiClient from "@/clients/apiClient";

export const getPatients = async () => {
  const response = await apiClient.get("/patients/patients");
  return response.data;
};
