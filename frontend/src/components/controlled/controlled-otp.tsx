import React, { ComponentProps } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "../ui/input-otp";

type ControlledOTPProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  containerClassName?: string;
  length?: number;
  showSeparator?: boolean;
  separatorIndex?: number;
} & Omit<ComponentProps<typeof InputOTP>, "value" | "onChange" | "render">;

const ControlledOTP = <T extends FieldValues>({
  className,
  label,
  name,
  containerClassName,
  length = 6,
  showSeparator = false,
  separatorIndex = 3,
  ...props
}: ControlledOTPProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <div className={cn("min-w-[150px] flex-1", containerClassName)}>
      {!!label && (
        <Label htmlFor={name} className="mb-2">
          {label}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <InputOTP
              value={field.value || ""}
              onChange={field.onChange}
              className={className}
              {...props}
            >
              <InputOTPGroup>
                {Array.from({ length }, (_, index) => (
                  <React.Fragment key={index}>
                    <InputOTPSlot index={index} className="" />
                    {showSeparator && index === separatorIndex - 1 && (
                      <InputOTPSeparator className="text-sm" />
                    )}
                  </React.Fragment>
                ))}
              </InputOTPGroup>
            </InputOTP>
            {!!error && (
              <p className="text-destructive mt-1 text-sm">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export { ControlledOTP };
