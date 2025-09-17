"use client";

import { usePatients } from "./usePatients";
import { DataTableProps } from "@/components/DataTable";
import { Patient } from "@/app/(dashboard)/patients/(types)/patient";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisIcon, Filter, User } from "lucide-react";
import { FilterConfig } from "@/components/FilterSidebar";
import { Calendar } from "lucide-react";

// Patient columns definition
export const patientColumns: ColumnDef<Patient>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    size: 28,
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.getValue("name")}</div>
        <div className="text-foreground/60">code: {row.original.code}</div>
      </div>
    ),
    size: 180,
    enableHiding: false,
  },
  {
    header: "Mobile Number",
    accessorKey: "mobile_number",
    size: 220,
  },

  {
    header: "Gender",
    accessorKey: "gender",
    size: 100,
  },
  {
    header: "Type",
    accessorKey: "patient_type",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.getValue("patient_type")}
      </div>
    ),
    size: 100,
  },
  {
    header: "Date",
    accessorKey: "created_at",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      return date.toLocaleDateString();
    },
    size: 120,
  },

  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <PatientRowActions row={row} />,
    size: 60,
    enableHiding: false,
  },
];

// Custom row actions component for patients
export function PatientRowActions({ row }: { row: Row<Patient> }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-end">
          <Button
            size="icon"
            variant="ghost"
            className="shadow-none"
            aria-label="Edit patient"
          >
            <EllipsisIcon size={16} aria-hidden="true" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Patient Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span>View Details</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Edit Patient</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <span>View Medical History</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <span>Delete Patient</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Filter configuration for patients
export const patientFilters: FilterConfig[] = [
  {
    id: "status",
    type: "multiselect",
    label: "Status",
    options: [
      { value: "Active", label: "Active" },
      { value: "Inactive", label: "Inactive" },
      { value: "Pending", label: "Pending" },
    ],
    icon: <Filter className="h-4 w-4" />,
  },
  {
    id: "gender",
    type: "select",
    label: "Gender",
    placeholder: "Select gender...",
    options: [
      { value: "Male", label: "Male" },
      { value: "Female", label: "Female" },
      { value: "Other", label: "Other" },
    ],
    icon: <User className="h-4 w-4" />,
  },
  {
    id: "lastVisit",
    type: "daterange",
    label: "Last Visit Date",
    icon: <Calendar className="h-4 w-4" />,
  },
];

export const usePatientsTable = () => {
  const { data: patients, isLoading, error } = usePatients();

  const handleAddPatient = () => {
    console.log("Add patient clicked");
    // Implement add patient logic
  };

  const handleDeletePatients = (selectedRows: any[]) => {
    const patientIds = selectedRows.map((row) => row.original.id);
    console.log("Deleted patients:", patientIds);
  };

  const tableConfig: DataTableProps<Patient> = {
    data: patients?.results || [],
    columns: patientColumns,
    searchConfig: {
      placeholder: "Search patients by name, code, or phone...",
      searchColumns: ["name", "code", "mobile_number"],
      showSearch: true,
    },
    filters: patientFilters,
    actions: {
      showAdd: true,
      addButtonText: "Add Patient",
      onAdd: handleAddPatient,
      showDelete: true,
      deleteButtonText: "Delete Patients",
      onDelete: handleDeletePatients,
      deleteConfirmTitle: "Delete Selected Patients?",
      deleteConfirmDescription:
        "This action cannot be undone. This will permanently delete the selected patients and all their associated data.",
    },
    rowActions: PatientRowActions,
    emptyState: isLoading ? "Loading patients..." : "No patients found.",
  };

  return {
    tableConfig,
    isLoading,
    error,
    patients: patients?.results || [],
    totalCount: patients?.count || 0,
  };
};
