"use client";

import React from "react";
import { useClinics } from "./_hooks/useClinics";
import { ClinicType } from "./_types/clinic-schema";

export default function ClinicsPage() {
  const clinics = useClinics();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-1 flex-col gap-4 py-4 lg:gap-6 lg:py-6">
        <div className="flex flex-row flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Clinics Management</h1>
        </div>
        <div className="flex flex-wrap gap-4">
          {clinics.data?.map((clinic: ClinicType) => (
            <div
              key={clinic.id}
              className="flex min-w-[300px] flex-1 flex-col gap-2 rounded-md border p-4"
            >
              <h2 className="text-lg font-bold">{clinic.name}</h2>
              <p className="text-sm text-gray-500">{clinic.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
