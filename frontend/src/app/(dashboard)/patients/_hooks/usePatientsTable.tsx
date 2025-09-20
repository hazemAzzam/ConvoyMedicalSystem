"use client";

import { usePatients } from "./usePatients";
import { DataTableProps } from "@/components/DataTable";
import { Patient } from "@/app/(dashboard)/patients/_types/patient";
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
import {
  EditIcon,
  EllipsisIcon,
  EyeIcon,
  FileTextIcon,
  Filter,
  User,
} from "lucide-react";
import { FilterConfig } from "@/components/FilterSidebar";
import { Calendar } from "lucide-react";
import { toast } from "sonner";
import { showAlert } from "@/hooks/use-alert-store";
import { useDeletePatient, useDeletePatients } from "./usePatientsMutations";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Patient columns definition factory
export const createPatientColumns = (): ColumnDef<Patient>[] => [
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
    header: "Code",
    accessorKey: "code",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.getValue("code")}</div>
      </div>
    ),
    size: 180,
    enableHiding: false,
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.getValue("name")}</div>
        <div className="text-foreground/60">
          {row.original.age}y • {row.original.gender}
        </div>
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
  const deletePatientMutation = useDeletePatient();
  const router = useRouter();
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
        <DropdownMenuItem
          onClick={() => router.push(`/patients/${row.original.id}`)}
        >
          <EyeIcon size={16} aria-hidden="true" />
          <span>View Details</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <FileTextIcon size={16} aria-hidden="true" />
          <span>Generate Report</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={() => {
            showAlert({
              title: "Delete Patient",
              description: "Are you sure you want to delete this patient?",
              onConfirm: () => {
                deletePatientMutation.mutate(row.original.id);
              },
            });
          }}
        >
          <span>Delete Patient</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Filter configuration for patients
export const patientFilters: FilterConfig[] = [
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
  const patientColumns = createPatientColumns();
  const deletePatientsMutation = useDeletePatients();
  const router = useRouter();

  const handleAddPatient = () => {
    router.push("/patients/add");
  };

  const handleDeletePatients = (selectedRows: any[]) => {
    const patientIds = selectedRows.map((row) => row.original.id);

    deletePatientsMutation.mutate(patientIds);
  };

  const tableConfig: DataTableProps<Patient> = {
    data: patients || [],
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
    emptyState: isLoading ? "Loading patients..." : "No patients found.",
  };

  return {
    tableConfig,
    isLoading,
    error,
    patients: patients || [],
    totalCount: patients?.count || 0,
  };
};
