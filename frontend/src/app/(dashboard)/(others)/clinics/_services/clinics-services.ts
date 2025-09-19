import apiClient from "@/clients/apiClient";
import { API_ROUTES } from "@/constants/API_ROUTES";
import { ClinicType } from "../_types/clinic-schema";

export const getClinics = async () => {
  const response = await apiClient.get(API_ROUTES.CLINICS.LIST);
  return response.data;
};

export const deleteClinic = async (id: string) => {
  const response = await apiClient.delete(
    `${API_ROUTES.CLINICS.DELETE}/${id}/`,
  );
  return response.data;
};

export const deleteClinics = async (ids: string[]) => {
  const response = await apiClient.delete(API_ROUTES.CLINICS.BULK_DELETE, {
    data: {
      clinic_ids: ids,
    },
  });
  return response.data;
};

export const createClinic = async (data: ClinicType) => {
  const response = await apiClient.post(API_ROUTES.CLINICS.CREATE, data);
  return response.data;
};

export const updateClinic = async (data: ClinicType) => {
  const response = await apiClient.put(
    `${API_ROUTES.CLINICS.UPDATE}/${data.id}/`,
    data,
  );
  return response.data;
};
