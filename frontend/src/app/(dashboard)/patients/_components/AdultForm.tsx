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
import { setServerErrors } from "@/lib/setServerError";

const FORM_DATA = {
  basicInfo: [
    [
      {
        name: "code",
        label: "Code",
        component: ControlledInput<CreateAdultType>,
      },
      {
        name: "house_number",
        label: "House Number",
        component: ControlledInput<CreateAdultType>,
      },
    ],
  ],
  personalInfo: [
    [
      {
        name: "name",
        label: "Name",
        component: ControlledInput<CreateAdultType>,
      },
      {
        name: "gender",
        label: "Gender",
        component: ControlledSelect<CreateAdultType>,
      },
      {
        name: "age",
        label: "Age",
        component: ControlledInput<CreateAdultType>,
      },
      {
        name: "occupation",
        label: "Occupation",
        component: ControlledInput<CreateAdultType>,
      },
    ],
    [
      {
        name: "mobile_number",
        label: "Mobile Number",
        component: ControlledInput<CreateAdultType>,
      },
      {
        name: "marital_status",
        label: "Marital Status",
        component: ControlledSelect<CreateAdultType>,
      },
    ],
    [
      {
        name: "children_number",
        label: "Children Number",
        component: ControlledInput<CreateAdultType>,
        condition: (form: CreateAdultType) => form.marital_status !== "single",
      },
      {
        name: "age_of_the_youngest",
        label: "Age of the Youngest",
        component: ControlledInput<CreateAdultType>,
        condition: (form: CreateAdultType) => form.marital_status !== "single",
      },
    ],
  ],
};

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

      setServerErrors(error, form);
    }
  };

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <FormProvider {...form}>
        <div className="flex flex-col gap-4 rounded-md">
          <Accordion type="single" className="space-y-4">
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

            {/* Menstruation Section - Only for Females */}
            {form.watch("gender") === "female" && (
              <AccordionItem
                value="menstruation"
                className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
              >
                <AccordionHeader>
                  <AccordionPrimitive.Trigger className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md py-2 text-left text-sm text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
                    <h2 className="font-medium">
                      Menstruation & Contraception
                    </h2>
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
                      options={[
                        { value: "false", label: "No" },
                        { value: "true", label: "Yes" },
                      ]}
                    />
                    {form.watch("contraception") === "true" && (
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

            {/* General Examination Section */}
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
                  <ControlledInput<CreateAdultType>
                    name="bp"
                    label="Blood Pressure"
                  />
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
                    options={[
                      { value: "false", label: "No" },
                      { value: "true", label: "Yes" },
                    ]}
                  />
                  <ControlledSelect<CreateAdultType>
                    name="pallor"
                    label="Pallor"
                    options={[
                      { value: "false", label: "No" },
                      { value: "true", label: "Yes" },
                    ]}
                  />
                </Row>
              </AccordionContent>
            </AccordionItem>

            {/* Past History Section */}
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
                    options={[
                      { value: "false", label: "No" },
                      { value: "true", label: "Yes" },
                    ]}
                  />
                  {form.watch("allergy") === "true" && (
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
                    <ControlledInput<CreateAdultType>
                      name="icu"
                      label="ICU Details"
                    />
                  )}
                </Row>
              </AccordionContent>
            </AccordionItem>

            {/* Medical Data Arrays Section */}
            <AccordionItem
              value="medical-data"
              className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
            >
              <AccordionHeader>
                <AccordionPrimitive.Trigger className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md py-2 text-left text-sm text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
                  <h2 className="font-medium">Medical Data (Arrays)</h2>
                  <PlusIcon
                    size={16}
                    className="pointer-events-none shrink-0 opacity-60 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionHeader>

              <AccordionContent className="flex flex-col gap-4 p-2">
                <div className="text-muted-foreground text-sm">
                  <p>
                    This section contains array fields that will be implemented
                    with autocomplete functionality:
                  </p>
                  <ul className="mt-2 space-y-1">
                    <li>
                      • <strong>Complaints:</strong> Medical complaints and
                      symptoms
                    </li>
                    <li>
                      • <strong>Cyanosis:</strong> Cyanosis conditions
                    </li>
                    <li>
                      • <strong>Medical History:</strong> Past medical
                      conditions
                    </li>
                    <li>
                      • <strong>Drugs:</strong> Current medications
                    </li>
                    <li>
                      • <strong>Family History:</strong> Family medical history
                    </li>
                  </ul>
                  <p className="mt-2 text-xs">
                    These fields will be connected to the respective API
                    endpoints for autocomplete functionality.
                  </p>
                </div>
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
