import React from "react";
import { useSymptomDiaglog } from "../_hooks/use-symptom-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormProvider, useForm } from "react-hook-form";
import { ControlledInput } from "@/components/controlled/controlled-input";
import { ControlledSelect } from "@/components/controlled/controlled-select";
import { SymptomType } from "../_types/symptom-type";
import { useCreateSymptom } from "../_hooks/useSymptoms";
import { useClinics } from "../../clinics/_hooks/useClinics";
import { ClinicType } from "../../clinics/_types/clinic-schema";
import { toast } from "sonner";

export const SymptomDialog = () => {
  const { isOpen, updateDialogState } = useSymptomDiaglog();

  const form = useForm<SymptomType>();
  const createSymptomMutation = useCreateSymptom();
  const { data: clinics, isLoading: clinicsLoading } = useClinics();

  const onSubmit = (data: SymptomType) => {
    // Remove clinic_name as it's read-only, only send clinic ID
    const { clinic_name, ...symptomData } = data;
    createSymptomMutation.mutate(symptomData, {
      onSuccess: () => {
        form.reset();
        updateDialogState(false);
      },
    });
  };

  // Transform clinics data for the select component
  const clinicOptions =
    clinics?.map((clinic: ClinicType) => ({
      value: clinic.id,
      label: clinic.name,
    })) || [];
  return (
    <Dialog open={isOpen} onOpenChange={updateDialogState}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Symptoms</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <form
            id="symptom-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormProvider {...form}>
              <ControlledInput<SymptomType>
                name="name"
                type="text"
                placeholder="Enter symptom name"
                label="Symptom Name"
              />
              <ControlledInput<SymptomType>
                name="description"
                type="text"
                placeholder="Enter symptom description (optional)"
                label="Description"
              />
              <ControlledSelect<SymptomType>
                name="clinic"
                label="Clinic"
                placeholder="Select a clinic"
                options={clinicOptions}
              />
            </FormProvider>
          </form>
        </DialogDescription>
        <DialogFooter>
          <Button onClick={() => updateDialogState(false)}>Close</Button>
          <Button
            type="submit"
            form="symptom-form"
            disabled={createSymptomMutation.isPending}
          >
            {createSymptomMutation.isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
