"use client";

import {
  createPatient,
  deletePatient,
  deletePatients,
  getPatients,
  updatePatient,
} from "@/app/(dashboard)/patients/_services/patientQueries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePatients = () => {
  const query = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });

  return query;
};

export const useCreatePatient = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      toast.success("Patient created successfully");
    },
  });
  return query;
};

export const useUpdatePatient = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: updatePatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      toast.success("Patient updated successfully");
    },
  });
  return query;
};

export const useDeletePatient = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: deletePatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      toast.success("Patient deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete patient");
      console.error(error);
    },
  });
  return query;
};

export const useDeletePatients = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: deletePatients,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      toast.success("Patients deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete patients");
      console.error(error);
    },
  });
  return query;
};
