"use client";

import { getPatients } from "@/app/(dashboard)/patients/(services)/patientQueries";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const usePatients = () => {
  const query = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });

  return query;
};
