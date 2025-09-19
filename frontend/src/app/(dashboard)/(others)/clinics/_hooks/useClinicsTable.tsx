"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { useClinics, useDeleteClinic, useDeleteClinics } from "./useClinics";
import { ClinicType } from "../_types/clinic-schema";
import { Checkbox } from "@/components/ui/checkbox";
import { useQueryClient } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { EllipsisIcon, EyeIcon } from "lucide-react";
import { showAlert } from "@/hooks/use-alert-store";
import { DataTableProps } from "@/components/DataTable";
import { useRouter } from "next/navigation";

export const createColumns = (): ColumnDef<ClinicType>[] => [
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
      </div>
    ),
    size: 180,
    enableHiding: false,
  },
  {
    header: "Description",
    accessorKey: "description",
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <RowActions row={row} />,
    size: 60,
    enableHiding: false,
  },
];

export function RowActions({ row }: { row: Row<ClinicType> }) {
  const queryClient = useQueryClient();
  const deleteClinicMutation = useDeleteClinic();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-end">
          <Button
            size="icon"
            variant="ghost"
            className="shadow-none"
            aria-label="Edit clinic"
          >
            <EllipsisIcon size={16} aria-hidden="true" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Clinic Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push(`/clinics/edit/${row.original.id}`)}
        >
          <EyeIcon size={16} aria-hidden="true" />
          <span>View Details</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={() => {
            showAlert({
              title: "Delete Clinic",
              description: "Are you sure you want to delete this clinic?",
              onConfirm: () => {
                deleteClinicMutation.mutate(row.original.id!);
              },
            });
          }}
        >
          <span>Delete Clinic</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const useClinicsTable = () => {
  const clinics = useClinics();
  const clinicColumns = createColumns();
  const deleteClinicsMutation = useDeleteClinics();

  const handleAddClinic = () => {};

  const handleDeleteClinics = (selectedRows: any[]) => {
    const clinicIds = selectedRows.map((row) => row.original.id);
    deleteClinicsMutation.mutate(clinicIds);
  };

  const tableConfig: DataTableProps<ClinicType> = {
    data: clinics.data || [],
    columns: clinicColumns,
    searchConfig: {
      placeholder: "Search clinics by name...",
      searchColumns: ["name"],
      showSearch: true,
    },
    // filters: patientFilters,
    actions: {
      showAdd: true,
      addButtonText: "Add Clinic",
      onAdd: handleAddClinic,
      showDelete: true,
      deleteButtonText: "Delete Clinics",
      onDelete: handleDeleteClinics,
      deleteConfirmTitle: "Delete Selected Clinics?",
      deleteConfirmDescription:
        "This action cannot be undone. This will permanently delete the selected clinics and all their associated data.",
    },
    emptyState: clinics.isLoading ? "Loading clinics..." : "No clinics found.",
  };

  return {
    tableConfig,
  };
};
