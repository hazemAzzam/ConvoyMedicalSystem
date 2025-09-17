import { ComponentProps } from "react";
import { Input } from "./ui/input";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";

type ControlledInputProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  containerClassName?: string;
} & ComponentProps<typeof Input>;

const ControlledInput = <T extends FieldValues>({
  className,
  type,
  label,
  name,
  containerClassName,
  ...props
}: ControlledInputProps<T>) => {
  const { control } = useFormContext<T>();
  return (
    <div className={cn("w-full", containerClassName)}>
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
            <Input
              className={className}
              type={type}
              id={name}
              data-slot="input"
              {...field}
              {...props}
              aria-invalid={!!error}
            />
            {!!error && (
              <p className="text-destructive text-sm">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export { ControlledInput };
