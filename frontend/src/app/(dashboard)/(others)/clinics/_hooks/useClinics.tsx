import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createClinic,
  deleteClinic,
  deleteClinics,
  getClinics,
  updateClinic,
} from "../_services/clinics-services";
import { toast } from "sonner";

export const useClinics = () => {
  return useQuery({
    queryKey: ["clinics"],
    queryFn: getClinics,
  });
};

export const useCreateClinic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createClinic,
    onSuccess: () => {
      toast.success("Clinic created successfully");
      queryClient.invalidateQueries({ queryKey: ["clinics"] });
    },
    onError: (error) => {
      toast.error("Failed to create clinic", { description: error.message });
      throw error;
    },
  });
};

export const useUpdateClinic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateClinic,
    onSuccess: () => {
      toast.success("Clinic updated successfully");
      queryClient.invalidateQueries({ queryKey: ["clinics"] });
    },
    onError: (error) => {
      toast.error("Failed to update clinic", { description: error.message });
      throw error;
    },
  });
};

export const useDeleteClinic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteClinic,
    onSuccess: () => {
      toast.success("Clinic deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["clinics"] });
    },
    onError: (error) => {
      toast.error("Failed to delete clinic", { description: error.message });
      throw error;
    },
  });
};

export const useDeleteClinics = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteClinics,
    onSuccess: () => {
      toast.success("Clinics deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["clinics"] });
    },
    onError: (error) => {
      toast.error("Failed to delete clinics", { description: error.message });
      throw error;
    },
  });
};
