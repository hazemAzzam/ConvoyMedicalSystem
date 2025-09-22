"use client";

import DataTable from "@/components/DataTable";
import { usePatientsTable } from "../_hooks/usePatientsTable";

export const PatientsTable = () => {
  const { tableConfig } = usePatientsTable();
  return <DataTable {...tableConfig} />;
};
