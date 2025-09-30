"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSymptom } from "../_services/symptoms-query";
import { toast } from "sonner";

export const useCreateSymptom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSymptom,
    onSuccess: () => {
      toast.success("Symptom created successfully");
      queryClient.invalidateQueries({ queryKey: ["symptoms"] });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.detail ||
        error?.message ||
        "Failed to create symptom";
      toast.error("Failed to create symptom", { description: errorMessage });
    },
  });
};
