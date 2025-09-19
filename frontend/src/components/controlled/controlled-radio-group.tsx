import React, { ComponentProps } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type RadioOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type ControlledRadioGroupProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  containerClassName?: string;
  options: readonly RadioOption[];
  orientation?: "horizontal" | "vertical";
} & Omit<ComponentProps<typeof RadioGroup>, "value" | "onValueChange">;

const ControlledRadioGroup = <T extends FieldValues>({
  className,
  label,
  name,
  containerClassName,
  options,
  orientation = "horizontal",
  ...props
}: ControlledRadioGroupProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <div className={cn("min-w-[200px] flex-1", containerClassName)}>
      {!!label && <Label className="mb-2 block">{label}</Label>}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <RadioGroup
              value={field.value || ""}
              onValueChange={field.onChange}
              className={cn(
                orientation === "horizontal"
                  ? "flex flex-col gap-6 md:flex-row"
                  : "flex flex-col gap-3",
                className,
              )}
              {...props}
            >
              {options.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "flex items-center space-x-2",
                    orientation === "horizontal" && "flex-shrink-0",
                    "sm:flex-shrink-1",
                  )}
                >
                  <RadioGroupItem
                    value={option.value}
                    id={`${name}-${option.value}`}
                    disabled={option.disabled}
                  />
                  <Label
                    htmlFor={`${name}-${option.value}`}
                    className={cn(
                      "text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                      option.disabled && "cursor-not-allowed opacity-70",
                    )}
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {!!error && (
              <p className="text-destructive mt-1 text-sm">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export { ControlledRadioGroup };
export type { RadioOption };
