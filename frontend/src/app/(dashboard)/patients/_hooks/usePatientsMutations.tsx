import { toast } from "sonner";
import { deletePatient } from "../_services/patientQueries";
import { deletePatients } from "../_services/patientQueries";
import {
  createAdultService,
  updateAdultService,
} from "../_services/adult-queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateAdult = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAdultService,
    onSuccess: () => {
      toast.success("Adult created successfully");
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
    onError: (error) => {
      toast.error("Failed to create adult", {
        description: error.message,
      });
    },
  });
};

export const useUpdateAdult = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAdultService,
    onSuccess: () => {
      toast.success("Adult updated successfully");
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
    onError: (error) => {
      toast.error("Failed to update adult", {
        description: error.message,
      });
    },
  });
};

export const useDeletePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePatient,
    onSuccess: () => {
      toast.success("Patient deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
    onError: (error) => {
      toast.error("Failed to delete patient", {
        description: error.message,
      });
    },
  });
};

export const useDeletePatients = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePatients,
    onSuccess: () => {
      toast.success("Patients deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
    onError: (error) => {
      toast.error("Failed to delete patients", {
        description: error.message,
      });
    },
  });
};
