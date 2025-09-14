"use client";

import { useState } from "react";
import { X, Filter, Search, Calendar, User, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface FilterConfig {
  id: string;
  type: "text" | "select" | "multiselect" | "date" | "daterange";
  label: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  icon?: React.ReactNode;
}

export interface FilterValue {
  [key: string]: string | string[] | { from?: string; to?: string };
}

export interface FilterSidebarProps {
  filters: FilterConfig[];
  values: FilterValue;
  onValuesChange: (values: FilterValue) => void;
  onClearAll: () => void;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
}

export default function FilterSidebar({
  filters,
  values,
  onValuesChange,
  onClearAll,
  trigger,
  title = "Filters",
  description = "Customize your filters to find exactly what you're looking for.",
}: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (filterId: string, value: any) => {
    onValuesChange({
      ...values,
      [filterId]: value,
    });
  };

  const handleClearFilter = (filterId: string) => {
    const newValues = { ...values };
    delete newValues[filterId];
    onValuesChange(newValues);
  };

  const getActiveFiltersCount = () => {
    return Object.keys(values).filter((key) => {
      const value = values[key];
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      if (typeof value === "object" && value !== null) {
        return Object.values(value).some(
          (v) => v && v.toString().trim() !== "",
        );
      }
      return value && value.toString().trim() !== "";
    }).length;
  };

  const renderFilter = (filter: FilterConfig) => {
    const currentValue = values[filter.id];

    switch (filter.type) {
      case "text":
        return (
          <div className="space-y-2">
            <Label htmlFor={filter.id} className="flex items-center gap-2">
              {filter.icon}
              {filter.label}
            </Label>
            <Input
              id={filter.id}
              placeholder={filter.placeholder}
              value={(currentValue as string) || ""}
              onChange={(e) => handleFilterChange(filter.id, e.target.value)}
            />
          </div>
        );

      case "select":
        return (
          <div className="space-y-2">
            <Label htmlFor={filter.id} className="flex items-center gap-2">
              {filter.icon}
              {filter.label}
            </Label>
            <Select
              value={(currentValue as string) || ""}
              onValueChange={(value) => handleFilterChange(filter.id, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={filter.placeholder || "Select..."} />
              </SelectTrigger>
              <SelectContent>
                {filter.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "multiselect":
        const selectedValues = (currentValue as string[]) || [];
        return (
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              {filter.icon}
              {filter.label}
            </Label>
            <div className="max-h-40 space-y-2 overflow-y-auto">
              {filter.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${filter.id}-${option.value}`}
                    checked={selectedValues.includes(option.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleFilterChange(filter.id, [
                          ...selectedValues,
                          option.value,
                        ]);
                      } else {
                        handleFilterChange(
                          filter.id,
                          selectedValues.filter((v) => v !== option.value),
                        );
                      }
                    }}
                  />
                  <Label
                    htmlFor={`${filter.id}-${option.value}`}
                    className="text-sm font-normal"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );

      case "date":
        return (
          <div className="space-y-2">
            <Label htmlFor={filter.id} className="flex items-center gap-2">
              {filter.icon}
              {filter.label}
            </Label>
            <Input
              id={filter.id}
              type="date"
              value={(currentValue as string) || ""}
              onChange={(e) => handleFilterChange(filter.id, e.target.value)}
            />
          </div>
        );

      case "daterange":
        const dateRange =
          (currentValue as { from?: string; to?: string }) || {};
        return (
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              {filter.icon}
              {filter.label}
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="date"
                placeholder="From"
                value={dateRange.from || ""}
                onChange={(e) =>
                  handleFilterChange(filter.id, {
                    ...dateRange,
                    from: e.target.value,
                  })
                }
              />
              <Input
                type="date"
                placeholder="To"
                value={dateRange.to || ""}
                onChange={(e) =>
                  handleFilterChange(filter.id, {
                    ...dateRange,
                    to: e.target.value,
                  })
                }
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const defaultTrigger = (
    <Button variant="outline" className="relative">
      <Filter className="mr-2 h-4 w-4" />
      {title}
      {getActiveFiltersCount() > 0 && (
        <Badge
          variant="secondary"
          className="ml-2 h-5 w-5 rounded-full p-0 text-xs"
        >
          {getActiveFiltersCount()}
        </Badge>
      )}
    </Button>
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{trigger || defaultTrigger}</SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            {title}
          </SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Active Filters */}
          {getActiveFiltersCount() > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Active Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearAll}
                  className="text-xs"
                >
                  Clear All
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(values).map(([key, value]) => {
                  const filter = filters.find((f) => f.id === key);
                  if (!filter) return null;

                  let displayValue = "";
                  if (Array.isArray(value)) {
                    displayValue = value.join(", ");
                  } else if (typeof value === "object" && value !== null) {
                    const obj = value as { from?: string; to?: string };
                    displayValue = `${obj.from || ""} - ${obj.to || ""}`;
                  } else {
                    displayValue = String(value);
                  }

                  if (!displayValue.trim()) return null;

                  return (
                    <Badge
                      key={key}
                      variant="secondary"
                      className="flex items-center gap-1 pr-1"
                    >
                      <span className="text-xs">
                        {filter.label}: {displayValue}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => handleClearFilter(key)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          {/* Filter Controls */}
          <div className="space-y-6">
            {filters.map((filter) => (
              <div key={filter.id} className="space-y-2">
                {renderFilter(filter)}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex gap-2 border-t pt-4">
          <Button
            variant="outline"
            onClick={onClearAll}
            className="flex-1"
            disabled={getActiveFiltersCount() === 0}
          >
            Clear All
          </Button>
          <Button onClick={() => setIsOpen(false)} className="flex-1">
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
