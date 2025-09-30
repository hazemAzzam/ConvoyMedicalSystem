"use client";

import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { MultiValue, StylesConfig } from "react-select";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface ControlledMultiSelectProps<T extends Record<string, unknown>> {
  name: keyof T;
  label?: string;
  loadOptions: (inputValue: string) => Promise<Option[]>;
  defaultOptions?: Option[] | boolean;
  placeholder?: string;
  className?: string;
  isDisabled?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  maxMenuHeight?: number;
  menuPlacement?: "auto" | "bottom" | "top";
  noOptionsMessage?: string;
  loadingMessage?: string;
  cacheOptions?: boolean;
}

const getCustomStyles = (): StylesConfig<Option, true> => ({
  control: (provided: any, state: any) => ({
    ...provided,
    minHeight: "38px",
    backgroundColor: "var(--background)",
    borderColor: state.isFocused ? "var(--ring)" : "var(--border)",
    color: "var(--foreground)",
    boxShadow: state.isFocused && "1px var(--ring)",
    "&:hover": {
      borderColor: "var(--ring)",
    },
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    padding: "2px 8px",
    gap: "4px",
  }),
  input: (provided: any) => ({
    ...provided,
    margin: "0px",
    padding: "0px",
    color: "var(--foreground)",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    padding: "0 8px",
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: "var(--muted-foreground)",
    "&:hover": {
      color: "var(--foreground)",
    },
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    color: "var(--muted-foreground)",
    "&:hover": {
      color: "var(--foreground)",
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: "var(--secondary)",
    border: "1px solid var(--border)",
    borderRadius: "6px",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "var(--secondary-foreground)",
    fontSize: "12px",
    fontWeight: "500",
    padding: "2px 6px",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: "var(--muted-foreground)",
    "&:hover": {
      backgroundColor: "var(--destructive)",
      color: "var(--destructive-foreground)",
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "var(--popover)",
    border: "1px solid var(--border)",
    borderRadius: "6px",
    boxShadow:
      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    zIndex: 50,
  }),
  menuList: (provided: any) => ({
    ...provided,
    padding: "4px",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "var(--primary)"
      : state.isFocused
        ? "var(--accent)"
        : "transparent",
    color: state.isSelected
      ? "var(--primary-foreground)"
      : "var(--popover-foreground)",
    borderRadius: "4px",
    margin: "2px 0",
    padding: "8px 12px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: state.isSelected ? "var(--primary)" : "var(--accent)",
    },
  }),
  noOptionsMessage: (provided: any) => ({
    ...provided,
    color: "var(--muted-foreground)",
    padding: "12px",
    textAlign: "center",
  }),
  loadingMessage: (provided: any) => ({
    ...provided,
    color: "var(--muted-foreground)",
    padding: "12px",
    textAlign: "center",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "var(--muted-foreground)",
  }),
});

export function ControlledMultiSelect<T extends Record<string, unknown>>({
  name,
  label = "",
  loadOptions,
  defaultOptions = true,
  placeholder = "Select options...",
  className,
  isDisabled = false,
  isClearable = true,
  isSearchable = true,
  maxMenuHeight = 200,
  menuPlacement = "auto",
  noOptionsMessage = "No options found",
  loadingMessage = "Loading...",
  cacheOptions = true,
}: ControlledMultiSelectProps<T>) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<T>();

  const value = watch(name as any) as Option[] | undefined;
  const error = errors[name as any];

  const handleChange = (selectedOptions: MultiValue<Option>) => {
    setValue(name as any, selectedOptions as any, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  // Memoize the loadOptions function to prevent unnecessary re-renders
  const memoizedLoadOptions = useMemo(() => loadOptions, [loadOptions]);

  // Get custom styles using shadcn CSS variables
  const customStyles = useMemo(() => getCustomStyles(), []);

  return (
    <div className={cn("space-y-2", className)}>
      <label
        htmlFor={name as string}
        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
      <AsyncSelect<Option, true>
        {...register(name as any)}
        value={value || []}
        onChange={handleChange}
        loadOptions={memoizedLoadOptions}
        defaultOptions={defaultOptions}
        isMulti
        isDisabled={isDisabled}
        isClearable={isClearable}
        isSearchable={isSearchable}
        placeholder={placeholder}
        maxMenuHeight={maxMenuHeight}
        menuPlacement={menuPlacement}
        noOptionsMessage={() => noOptionsMessage}
        loadingMessage={() => loadingMessage}
        cacheOptions={cacheOptions}
        styles={customStyles}
        className="react-select-container"
        classNamePrefix="react-select"
      />
      {error && (
        <p className="text-destructive text-sm">{error.message as string}</p>
      )}
    </div>
  );
}
