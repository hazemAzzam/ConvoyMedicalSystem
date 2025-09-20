"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import AdultForm from "./AdultForm";
import PediatricForm from "./PediatricForm";

export default function PatientsFormLayout({
  title,
  id,
  editing,
}: {
  title: string;
  id?: string;
  editing: boolean | false;
}) {
  const [patientType, setPatientType] = useState<string>("adult");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div className="flex items-center gap-4 rounded-md border p-4">
        <Label className="text-nowrap">Patient Type</Label>
        <div className="flex">
          <Button
            type="button"
            variant={patientType === "adult" ? "default" : "outline"}
            onClick={() => !editing && setPatientType("adult")}
            className={cn(
              "rounded-none transition-all",
              patientType === "adult" && "text-secondary",
              editing && "cursor-not-allowed",
              // editing && "bg-gray-200",
            )}
          >
            Adult
          </Button>
          <Button
            type="button"
            variant={patientType === "pediatric" ? "default" : "outline"}
            onClick={() => !editing && setPatientType("pediatric")}
            className={cn(
              "rounded-none transition-all",
              patientType === "pediatric" && "text-secondary",
              editing && "cursor-not-allowed",
              // editing && "bg-gray-200",
            )}
          >
            Pediatric
          </Button>
        </div>
      </div>

      {patientType === "adult" && <AdultForm id={id} editing={editing} />}

      {patientType === "pediatric" && <PediatricForm />}
    </div>
  );
}
