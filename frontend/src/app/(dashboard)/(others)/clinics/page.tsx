"use client";

import React from "react";
import { useClinicsTable } from "./_hooks/useClinicsTable";
import DataTable from "@/components/DataTable";

export default function ClinicsPage() {
  const { tableConfig } = useClinicsTable();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-1 flex-col gap-4 py-4 lg:gap-6 lg:py-6">
        <div className="flex flex-row flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Clinics Management</h1>
        </div>

        <DataTable {...tableConfig} />
      </div>
    </div>
  );
}
