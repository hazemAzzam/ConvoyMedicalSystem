"use client";
import apiClient from "@/clients/apiClient";
import { API_ROUTES } from "@/constants/API_ROUTES";
import { SymptomOptionType, SymptomType } from "../_types/symptom-type";

export const fetchSymptomsAutocomplete = async (
  search: string,
): Promise<SymptomOptionType[]> => {
  const response = await apiClient.get(API_ROUTES.SYMPTOMS.AUTOCOMPLETE, {
    params: { search },
  });

  return response.data;
};

export const createSymptom = async (data: SymptomType) => {
  const response = await apiClient.post(API_ROUTES.SYMPTOMS.CREATE, data);
  return response.data;
};
