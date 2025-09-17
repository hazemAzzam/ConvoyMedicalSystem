import { ComponentProps } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type ControlledInputProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  containerClassName?: string;
  options?: { value: string; label: string }[];
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
    <div className={cn("min-w-[150px] flex-1", containerClassName)}>
      {!!label && (
        <Label htmlFor={name} className="mb-4">
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
              value={field.value || ""}
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
