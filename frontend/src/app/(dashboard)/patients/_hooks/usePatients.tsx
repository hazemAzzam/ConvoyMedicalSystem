"use client";

import { getPatients } from "@/app/(dashboard)/patients/_services/patientQueries";
import { useQuery } from "@tanstack/react-query";

export const usePatients = () => {
  const query = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });

  return query;
};
