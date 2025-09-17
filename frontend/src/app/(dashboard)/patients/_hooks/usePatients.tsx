"use client";

import { getPatients } from "@/app/(dashboard)/patients/_services/patientQueries";
import { useQuery } from "@tanstack/react-query";
import { getAdultService } from "../_services/adult-queries";
import usePatientStore from "../_libs/use-patient-store";

export const usePatients = () => {
  const query = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });

  return query;
};

export const useAdult = () => {
  const { selectedPatientId } = usePatientStore();
  return useQuery({
    queryKey: ["adult", selectedPatientId],
    queryFn: () => getAdultService(selectedPatientId!),
    enabled: !!selectedPatientId,
  });
};
