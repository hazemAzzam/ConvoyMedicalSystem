import React, { useEffect } from "react";
import {
  CreateAdultType,
  DEFAULT_ADULT_VALUES,
  FORM_OPTIONS,
  GENDERS,
  UpdateAdultType,
} from "../_types/patientSchema";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { Form, FormProvider, useForm, useFormContext } from "react-hook-form";

import {
  Accordion,
  AccordionItem,
  AccordionContent,
} from "@/components/ui/accordion";
import { PlusIcon } from "lucide-react";
import { ControlledSelect } from "@/components/controlled/controlled-select";
import { ControlledInput } from "@/components/controlled/controlled-input";
import { ControlledOTP } from "@/components/controlled/controlled-otp";
import { ControlledRadioGroup } from "@/components/controlled/controlled-radio-group";
import { useCreateAdult, useUpdateAdult } from "../_hooks/usePatientsMutations";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateAdultSchema } from "../_types/patientSchema";
import { cn } from "@/lib/utils";
import { useAdult } from "../_hooks/usePatients";

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
    <AccordionPrimitive.Header className="w-full rounded-md py-2">
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
  const createAdultMutation = useCreateAdult();
  const updateAdultMutation = useUpdateAdult();

  if (editing && id) {
    const { data: adultData, refetch } = useAdult(id || "");
    useEffect(() => {
      if (adultData) {
        form.reset(adultData);
      }
    }, [adultData, form]);
  }

  const onSubmit = async (data: CreateAdultType) => {
    try {
      if (editing && id) {
        const updatedAdult = await updateAdultMutation.mutateAsync({
          id: id,
          ...data,
        } as UpdateAdultType);
        toast.success("Patient updated successfully");
        form.reset(updatedAdult);
      } else {
        await createAdultMutation.mutateAsync(data as CreateAdultType);
        toast.success("Patient created successfully");
      }
      form.reset();
    } catch (error) {
      toast.error("Failed to create patient");
    }
  };

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <FormProvider {...form}>
        <div className="flex flex-col gap-4 rounded-md">
          <Accordion type="multiple" className="space-y-4">
            <AccordionItem
              value="basic-info"
              className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
            >
              <AccordionHeader>
                <AccordionPrimitive.Trigger className="flex w-full items-center justify-between p-2">
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

            <AccordionItem
              value="personal-info"
              className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
            >
              <AccordionHeader>
                <AccordionPrimitive.Trigger className="flex w-full items-center justify-between p-2">
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
                  <ControlledOTP<CreateAdultType>
                    name="mobile_number"
                    label="Mobile Number"
                    length={11}
                    maxLength={11}
                  />
                  <ControlledRadioGroup<CreateAdultType>
                    name="marital_status"
                    label="Marital Status"
                    options={[...FORM_OPTIONS.maritalStatuses]}
                    orientation="horizontal"
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
                  <ControlledRadioGroup<CreateAdultType>
                    name="education_level"
                    label="Education Level"
                    options={[...FORM_OPTIONS.educationLevels]}
                    orientation="horizontal"
                  />
                </Row>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="smoking-habits"
              className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
            >
              <AccordionHeader>
                <AccordionPrimitive.Trigger className="flex w-full items-center justify-between p-2">
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
                  <ControlledRadioGroup<CreateAdultType>
                    name="smoking"
                    label="Smoking"
                    options={[...FORM_OPTIONS.smoking]}
                    orientation="horizontal"
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
                  <ControlledRadioGroup<CreateAdultType>
                    name="cessation"
                    label="Smoking Cessations"
                    options={[...FORM_OPTIONS.cessation]}
                    orientation="horizontal"
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
      </FormProvider>
    </form>
  );
}
