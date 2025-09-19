"use client";

import React from "react";
import { useClinicsTable } from "./_hooks/useClinicsTable";
import DataTable from "@/components/DataTable";

export default function ClinicsPage() {
  const { tableConfig } = useClinicsTable();
  return (
    <div>
      <h1>Clinics</h1>
      <DataTable {...tableConfig} />
    </div>
  );
}
