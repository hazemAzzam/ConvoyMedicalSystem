"use client";

import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AdultForm from "./_components/AdultForm";
import PediatricForm from "./_components/PediatricForm";
import { useForm, FormProvider } from "react-hook-form";
import {
  CreateAdultType,
  CreatePediatricType,
  DEFAULT_ADULT_VALUES,
  DEFAULT_PEDIATRIC_VALUES,
} from "../_types/patientSchema";
import { toast } from "sonner";
import { useCreateAdult } from "../_hooks/usePatientsMutations";

export default function AddPatientPage() {
  const [patientType, setPatientType] = useState<string>("adult");
  const createAdultMutation = useCreateAdult();

  // Create form instances for each patient type
  const adultForm = useForm<CreateAdultType>({
    defaultValues: DEFAULT_ADULT_VALUES,
  });

  const pediatricForm = useForm<CreatePediatricType>({
    defaultValues: DEFAULT_PEDIATRIC_VALUES,
  });

  const handleSubmit = async (data: CreateAdultType | CreatePediatricType) => {
    try {
      if (patientType === "adult") {
      } else {
        // For pediatric, we need to create a pediatric service or use adult service with pediatric data
        toast.error("Pediatric patient creation not implemented yet");
        return;
      }
    } catch (error) {
      toast.error("Failed to create patient");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Add Patient</h1>
      </div>
      <div className="flex items-center gap-4 rounded-md border p-4">
        <Label className="text-nowrap">Patient Type</Label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={patientType === "adult" ? "default" : "outline"}
            onClick={() => setPatientType("adult")}
            className={cn(
              "border transition-all",
              patientType === "adult" && "text-secondary",
            )}
          >
            Adult
          </Button>
          <Button
            type="button"
            variant={patientType === "pediatric" ? "default" : "outline"}
            onClick={() => setPatientType("pediatric")}
            className={cn(
              "border transition-all",
              patientType === "pediatric" && "text-secondary",
            )}
          >
            Pediatric
          </Button>
        </div>
      </div>

      {patientType === "adult" && <AdultForm />}

      {patientType === "pediatric" && <PediatricForm />}
    </div>
  );
}
