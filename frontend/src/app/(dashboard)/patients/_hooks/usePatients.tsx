"use client";

import { getPatients } from "@/app/(dashboard)/patients/_services/patientQueries";
import { useQuery } from "@tanstack/react-query";
import { getAdultService } from "../_services/adult-queries";

export const usePatients = () => {
  const query = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });

  return query;
};

export const useAdult = (id: string) => {
  return useQuery({
    queryKey: ["patients", id],
    queryFn: () => getAdultService(id),
    enabled: !!id,
  });
};
