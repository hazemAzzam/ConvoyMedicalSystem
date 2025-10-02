"use client";

import React, { useEffect } from "react";

import {
  CreateAdultType,
  DEFAULT_ADULT_VALUES,
  FORM_OPTIONS,
  UpdateAdultType,
} from "../_types/patientSchema";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

import {
  Accordion,
  AccordionItem,
  AccordionContent,
} from "@/components/ui/accordion";
import { PlusIcon } from "lucide-react";
import { ControlledSelect } from "@/components/controlled/controlled-select";
import { ControlledInput } from "@/components/controlled/controlled-input";
import { useCreateAdult, useUpdateAdult } from "../_hooks/usePatientsMutations";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateAdultSchema } from "../_types/patientSchema";
import { cn } from "@/lib/utils";
import { useAdult } from "../_hooks/usePatients";
import { setServerErrors } from "@/lib/setServerError";
import { Skeleton } from "@/components/ui/skeleton";
import { ControlledMultiSelect } from "@/components/controlled/controlled-multiselect";
import { SymptomDialog } from "../../(others)/symptoms/_components/SymptomDialog";
import { useSymptomDiaglog } from "../../(others)/symptoms/_hooks/use-symptom-dialog";
import { fetchSymptomsAutocomplete } from "../../(others)/symptoms/_services/symptoms-query";

function Row({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex w-full flex-wrap gap-4 py-2", className)}>
      {children}
    </div>
  );
}

function AccordionHeader({ children }: { children: React.ReactNode }) {
  return (
    <AccordionPrimitive.Header className="flex py-2">
      {children}
    </AccordionPrimitive.Header>
  );
}

export default function AdultForm({
  id,
  editing,
}: {
  id?: string;
  editing: boolean | false;
}) {
  const form = useForm<CreateAdultType>({
    defaultValues: DEFAULT_ADULT_VALUES,
    resolver: zodResolver(CreateAdultSchema) as any,
  });
  const symptomDialog = useSymptomDiaglog();

  const createAdultMutation = useCreateAdult();
  const updateAdultMutation = useUpdateAdult();
  const adult = useAdult(id!);

  useEffect(() => {
    if (editing && id && adult.data) {
      form.reset(adult.data);
    }
  }, [editing, id, adult.data, form]);

  // Show loading state while fetching patient data
  if (editing && id && adult.isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col gap-4 rounded-md">
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-background relative rounded-md border px-4 py-4"
              >
                <Skeleton className="mb-4 h-6 w-32" />
                <div className="flex flex-wrap gap-4">
                  {Array.from({ length: 3 }).map((_, fieldIndex) => (
                    <Skeleton key={fieldIndex} className="h-10 w-48" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show error state if data fetching failed
  if (editing && id && adult.isError) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-destructive mb-4">Failed to load patient data</p>
        <Button onClick={() => adult.refetch()}>Retry</Button>
      </div>
    );
  }

  const onSubmit = async (data: CreateAdultType) => {
    try {
      if (editing && id) {
        const updatedAdult = await updateAdultMutation.mutateAsync({
          id: id,
          ...data,
        } as UpdateAdultType);
        form.reset(updatedAdult);
      } else {
        await createAdultMutation.mutateAsync(data as CreateAdultType);
      }
      form.reset();
    } catch (error) {
      toast.error("Failed to create patient");

      setServerErrors(error, form);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="space-y-4"
        onSubmit={
          symptomDialog.isOpen ? undefined : form.handleSubmit(onSubmit as any)
        }
      >
        {Object.keys(form.formState.errors).map((error) => (
          <p className="text-destructive flex gap-2 text-sm" key={error}>
            <span>{error}:</span>
            <span>
              {form.formState.errors[error as keyof CreateAdultType]?.message}
            </span>
          </p>
        ))}
        <div className="flex flex-col gap-4 rounded-md">
          <Accordion type="single" className="space-y-4">
            <BasicInfo />

            <PersonalInfo />

            <SmokingHabits />

            {/* Menstruation Section - Only for Females */}
            <Menstruation />

            {/* General Examination Section */}
            <GeneralExamination />

            {/* Past History Section */}
            <PastHistory />

            <Complaints />

            <div className="flex justify-end">
              {editing ? (
                <Button type="submit" disabled={updateAdultMutation.isPending}>
                  {updateAdultMutation.isPending
                    ? "Updating..."
                    : "Update Patient"}
                </Button>
              ) : (
                <Button type="submit" disabled={createAdultMutation.isPending}>
                  {createAdultMutation.isPending
                    ? "Creating..."
                    : "Create Patient"}
                </Button>
              )}
            </div>
          </Accordion>
        </div>
      </form>
    </FormProvider>
  );
}

const BasicInfo = () => {
  return (
    <AccordionItem
      value="basic-info"
      className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
    >
      <AccordionHeader>
        <AccordionPrimitive.Trigger className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md py-2 text-left text-sm text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
          <h2 className="font-medium">Basic Info</h2>
          <PlusIcon
            size={16}
            className="pointer-events-none shrink-0 opacity-60 transition-transform duration-200"
            aria-hidden="true"
          />
        </AccordionPrimitive.Trigger>
      </AccordionHeader>

      <AccordionContent className="flex gap-4 p-2">
        <Row>
          <ControlledInput<CreateAdultType> name="code" label="Code" />
          <ControlledInput<CreateAdultType>
            name="house_number"
            label="House Number"
          />
        </Row>
      </AccordionContent>
    </AccordionItem>
  );
};

const PersonalInfo = () => {
  const form = useFormContext<CreateAdultType>();
  return (
    <AccordionItem
      value="personal-info"
      className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
    >
      <AccordionHeader>
        <AccordionPrimitive.Trigger className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md py-2 text-left text-sm text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
          <h2 className="font-medium">Personal Info</h2>
          <PlusIcon
            size={16}
            className="pointer-events-none shrink-0 opacity-60 transition-transform duration-200"
            aria-hidden="true"
          />
        </AccordionPrimitive.Trigger>
      </AccordionHeader>

      <AccordionContent className="flex flex-col gap-4 p-2">
        <Row>
          <ControlledInput<CreateAdultType> name="name" label="Name" />
          <ControlledSelect<CreateAdultType>
            name="gender"
            label="Gender"
            options={[...FORM_OPTIONS.genders]}
          />
          <ControlledInput<CreateAdultType> name="age" label="Age" />
          <ControlledInput<CreateAdultType>
            name="occupation"
            label="Occupation"
          />
        </Row>
        <Row className="flex-col md:flex-row">
          <ControlledInput<CreateAdultType>
            name="mobile_number"
            label="Mobile Number"
          />
          <ControlledSelect<CreateAdultType>
            name="marital_status"
            label="Marital Status"
            options={[...FORM_OPTIONS.maritalStatuses]}
          />
        </Row>
        {form.watch("marital_status") !== "single" && (
          <Row>
            <ControlledInput<CreateAdultType>
              name="children_number"
              label="Children Number"
            />
            <ControlledInput<CreateAdultType>
              name="age_of_the_youngest"
              label="Age of the Youngest"
            />
          </Row>
        )}
        <Row>
          <ControlledSelect<CreateAdultType>
            name="education_level"
            label="Education Level"
            options={[...FORM_OPTIONS.educationLevels]}
          />
        </Row>
      </AccordionContent>
    </AccordionItem>
  );
};

const SmokingHabits = () => {
  const form = useFormContext<CreateAdultType>();
  return (
    <AccordionItem
      value="smoking-habits"
      className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
    >
      <AccordionHeader>
        <AccordionPrimitive.Trigger className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md py-2 text-left text-sm text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
          <h2 className="font-medium">Habits of Medical Importance</h2>
          <PlusIcon
            size={16}
            className="pointer-events-none shrink-0 opacity-60 transition-transform duration-200"
            aria-hidden="true"
          />
        </AccordionPrimitive.Trigger>
      </AccordionHeader>

      <AccordionContent className="flex flex-col gap-4 p-2">
        <Row>
          <ControlledSelect<CreateAdultType>
            name="smoking"
            label="Smoking"
            options={[...FORM_OPTIONS.smoking]}
          />
          {form.watch("smoking") === "yes" && (
            <>
              <ControlledInput<CreateAdultType>
                name="smoking_rate"
                label="Smoking Rate"
              />
              <ControlledInput<CreateAdultType>
                name="smoking_type"
                label="Smoking Type"
              />
              <ControlledInput<CreateAdultType>
                name="other_smoking"
                label="Smoking Other"
              />
            </>
          )}
        </Row>
        <Row>
          <ControlledSelect<CreateAdultType>
            name="cessation"
            label="Smoking Cessations"
            options={[...FORM_OPTIONS.cessation]}
          />
          {form.watch("cessation") === "yes" && (
            <ControlledInput<CreateAdultType>
              name="cessation_duration"
              label="Cessation Duration"
            />
          )}
        </Row>
      </AccordionContent>
    </AccordionItem>
  );
};

const Menstruation = () => {
  const form = useFormContext<CreateAdultType>();
  return (
    <>
      {form.watch("gender") === "female" && (
        <AccordionItem
          value="menstruation"
          className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
        >
          <AccordionHeader>
            <AccordionPrimitive.Trigger className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md py-2 text-left text-sm text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
              <h2 className="font-medium">Menstruation & Contraception</h2>
              <PlusIcon
                size={16}
                className="pointer-events-none shrink-0 opacity-60 transition-transform duration-200"
                aria-hidden="true"
              />
            </AccordionPrimitive.Trigger>
          </AccordionHeader>

          <AccordionContent className="flex flex-col gap-4 p-2">
            <Row>
              <ControlledSelect<CreateAdultType>
                name="menstruation"
                label="Menstruation"
                options={[...FORM_OPTIONS.menstruations]}
              />
              <ControlledInput<CreateAdultType>
                name="gravidal_number"
                label="Gravidal Number"
              />
              <ControlledInput<CreateAdultType>
                name="abortion_number"
                label="Abortion Number"
              />
            </Row>
            <Row>
              <ControlledSelect<CreateAdultType>
                name="contraception"
                label="Contraception"
                options={[...FORM_OPTIONS.contraception]}
              />
              {form.watch("contraception") === "yes" && (
                <>
                  <ControlledSelect<CreateAdultType>
                    name="contraception_method"
                    label="Contraception Method"
                    options={[...FORM_OPTIONS.contraceptionMethods]}
                  />
                  <ControlledInput<CreateAdultType>
                    name="contraception_other_method"
                    label="Other Method"
                  />
                </>
              )}
            </Row>
          </AccordionContent>
        </AccordionItem>
      )}
    </>
  );
};

const GeneralExamination = () => {
  return (
    <AccordionItem
      value="general-examination"
      className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
    >
      <AccordionHeader>
        <AccordionPrimitive.Trigger className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md py-2 text-left text-sm text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
          <h2 className="font-medium">General Examination</h2>
          <PlusIcon
            size={16}
            className="pointer-events-none shrink-0 opacity-60 transition-transform duration-200"
            aria-hidden="true"
          />
        </AccordionPrimitive.Trigger>
      </AccordionHeader>

      <AccordionContent className="flex flex-col gap-4 p-2">
        <Row>
          <ControlledInput<CreateAdultType> name="bp" label="Blood Pressure" />
          <ControlledInput<CreateAdultType>
            name="hr"
            label="Heart Rate"
            type="number"
          />
          <ControlledInput<CreateAdultType>
            name="temp"
            label="Temperature"
            type="number"
          />
        </Row>
        <Row>
          <ControlledInput<CreateAdultType>
            name="rbs"
            label="Random Blood Sugar"
            type="number"
          />
          <ControlledInput<CreateAdultType>
            name="spo2"
            label="SpO2"
            type="number"
          />
        </Row>
        <Row>
          <ControlledSelect<CreateAdultType>
            name="jaundice"
            label="Jaundice"
            options={[...FORM_OPTIONS.jaundice]}
          />
          <ControlledSelect<CreateAdultType>
            name="pallor"
            label="Pallor"
            options={[...FORM_OPTIONS.pallor]}
          />
        </Row>
      </AccordionContent>
    </AccordionItem>
  );
};

const PastHistory = () => {
  const form = useFormContext<CreateAdultType>();
  return (
    <AccordionItem
      value="past-history"
      className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
    >
      <AccordionHeader>
        <AccordionPrimitive.Trigger className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md py-2 text-left text-sm text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
          <h2 className="font-medium">Past History</h2>
          <PlusIcon
            size={16}
            className="pointer-events-none shrink-0 opacity-60 transition-transform duration-200"
            aria-hidden="true"
          />
        </AccordionPrimitive.Trigger>
      </AccordionHeader>

      <AccordionContent className="flex flex-col gap-4 p-2">
        <Row>
          <ControlledSelect<CreateAdultType>
            name="allergy"
            label="Allergy"
            options={[...FORM_OPTIONS.allergy]}
          />
          {form.watch("allergy") === "yes" && (
            <ControlledInput<CreateAdultType>
              name="allergy_specification"
              label="Allergy Specification"
            />
          )}
        </Row>
        <Row>
          <ControlledSelect<CreateAdultType>
            name="blood_transfusion"
            label="Blood Transfusion"
            options={[...FORM_OPTIONS.bloodTransfusions]}
          />
          {form.watch("blood_transfusion") !== "no" && (
            <ControlledInput<CreateAdultType>
              name="blood_transfusion_duration"
              label="Transfusion Duration"
            />
          )}
        </Row>
        <Row>
          <ControlledSelect<CreateAdultType>
            name="surgical"
            label="Surgical History"
            options={[...FORM_OPTIONS.surgicals]}
          />
          {form.watch("surgical") === "operation" && (
            <ControlledInput<CreateAdultType>
              name="surgical_operation"
              label="Surgical Operation"
            />
          )}
          {form.watch("surgical") === "icu" && (
            <ControlledInput<CreateAdultType> name="icu" label="ICU Details" />
          )}
        </Row>
      </AccordionContent>
    </AccordionItem>
  );
};

const Complaints = () => {
  return (
    <AccordionItem
      value="complaints"
      className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
    >
      <AccordionHeader>
        <AccordionPrimitive.Trigger className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md py-2 text-left text-sm text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
          <h2 className="font-medium">Complaints</h2>
          <PlusIcon
            size={16}
            className="pointer-events-none shrink-0 opacity-60 transition-transform duration-200"
            aria-hidden="true"
          />
        </AccordionPrimitive.Trigger>
      </AccordionHeader>
      <AccordionContent className="h-[400px]">
        <Row className="items-center justify-center">
          <ControlledMultiSelect<CreateAdultType>
            name="complaints"
            loadOptions={fetchSymptomsAutocomplete}
            defaultOptions={true}
            placeholder="Type to search symptoms..."
            noOptionsMessage="No symptoms found"
            className="flex-1"
          />
          <SymptomDialog />
        </Row>
      </AccordionContent>
    </AccordionItem>
  );
};
