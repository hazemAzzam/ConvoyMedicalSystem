"use server";

import apiClient from "@/clients/apiClient";
import { API_ROUTES } from "@/constants/API_ROUTES";
import { CreateAdultType, AdultType } from "../_types/patientSchema";

export const getAdultService = async (adultId: string): Promise<AdultType> => {
  const response = await apiClient.get(`${API_ROUTES.ADULTS.LIST}/${adultId}`);
  return response.data;
};

export const createAdultService = async (
  adult: CreateAdultType,
): Promise<AdultType> => {
  const response = await apiClient.post(API_ROUTES.ADULTS.CREATE, adult);
  return response.data;
};

export const updateAdultService = async (
  adult: AdultType,
): Promise<AdultType> => {
  const response = await apiClient.put(
    `${API_ROUTES.ADULTS.UPDATE}/${adult.id}`,
    adult,
  );
  return response.data;
};
