"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCardProps, StatsGrid } from "@/components/StatesGrid";
import {
  CardSimIcon,
  Filter,
  Search,
  Users,
  EllipsisIcon,
  User,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import DataTable, { DataTableProps } from "@/components/DataTable";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Patient } from "@/types/patient";
import { FilterConfig, FilterValue } from "@/components/FilterSidebar";
import { useState, useEffect } from "react";

const stats: StatsCardProps[] = [
  {
    title: "Connections",
    value: "427,296",
    change: {
      value: "+12%",
      trend: "up",
    },
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="currentColor"
      >
        <path d="M9 0v2.013a8.001 8.001 0 1 0 5.905 14.258l1.424 1.422A9.958 9.958 0 0 1 10 19.951c-5.523 0-10-4.478-10-10C0 4.765 3.947.5 9 0Zm10.95 10.95a9.954 9.954 0 0 1-2.207 5.329l-1.423-1.423a7.96 7.96 0 0 0 1.618-3.905h2.013ZM11.002 0c4.724.47 8.48 4.227 8.95 8.95h-2.013a8.004 8.004 0 0 0-6.937-6.937V0Z" />
      </svg>
    ),
  },
  {
    title: "Contacts",
    value: "37,429",
    change: {
      value: "+42%",
      trend: "up",
    },
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={19}
        fill="currentColor"
      >
        <path d="M2 9.5c0 .313.461.858 1.53 1.393C4.914 11.585 6.877 12 9 12c2.123 0 4.086-.415 5.47-1.107C15.538 10.358 16 9.813 16 9.5V7.329C14.35 8.349 11.827 9 9 9s-5.35-.652-7-1.671V9.5Zm14 2.829C14.35 13.349 11.827 14 9 14s-5.35-.652-7-1.671V14.5c0 .313.461.858 1.53 1.393C4.914 16.585 6.877 17 9 17c2.123 0 4.086-.415 5.47-1.107 1.069-.535 1.53-1.08 1.53-1.393v-2.171ZM0 14.5v-10C0 2.015 4.03 0 9 0s9 2.015 9 4.5v10c0 2.485-4.03 4.5-9 4.5s-9-2.015-9-4.5ZM9 7c2.123 0 4.086-.415 5.47-1.107C15.538 5.358 16 4.813 16 4.5c0-.313-.461-.858-1.53-1.393C13.085 2.415 11.123 2 9 2c-2.123 0-4.086.415-5.47 1.107C2.461 3.642 2 4.187 2 4.5c0 .313.461.858 1.53 1.393C4.914 6.585 6.877 7 9 7Z" />
      </svg>
    ),
  },
  {
    title: "Value",
    value: "$82,439",
    change: {
      value: "+37%",
      trend: "up",
    },
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="currentColor"
      >
        <path d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0Zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm3.833 3.337a.596.596 0 0 1 .763.067.59.59 0 0 1 .063.76c-2.18 3.046-3.38 4.678-3.598 4.897a1.5 1.5 0 0 1-2.122-2.122c.374-.373 2.005-1.574 4.894-3.602ZM15.5 9a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm-11 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm2.318-3.596a1 1 0 1 1-1.414 1.414 1 1 0 0 1 1.414-1.414ZM10 3.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
      </svg>
    ),
  },
  {
    title: "Referrals",
    value: "3,497",
    change: {
      value: "-17%",
      trend: "down",
    },
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={21}
        height={21}
        fill="currentColor"
      >
        <path d="m14.142.147 6.347 6.346a.5.5 0 0 1-.277.848l-1.474.23-5.656-5.657.212-1.485a.5.5 0 0 1 .848-.282ZM2.141 19.257c3.722-3.33 7.995-4.327 12.643-5.52l.446-4.017-4.297-4.298-4.018.447c-1.192 4.648-2.189 8.92-5.52 12.643L0 17.117c2.828-3.3 3.89-6.953 5.303-13.081l6.364-.708 5.657 5.657-.707 6.364c-6.128 1.415-9.782 2.475-13.081 5.304L2.14 19.258Zm5.284-6.029a2 2 0 1 1 2.828-2.828 2 2 0 0 1-2.828 2.828Z" />
      </svg>
    ),
  },
];

// Patient columns definition
const patientColumns: ColumnDef<Patient>[] = [
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
      <div className="font-medium">{row.getValue("name")}</div>
    ),
    size: 180,
    enableHiding: false,
  },
  {
    header: "Email",
    accessorKey: "email",
    size: 220,
  },
  {
    header: "Phone",
    accessorKey: "phone",
    size: 150,
  },
  {
    header: "Gender",
    accessorKey: "gender",
    size: 100,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => (
      <Badge
        className={cn(
          row.getValue("status") === "Inactive" &&
            "bg-muted-foreground/60 text-primary-foreground",
        )}
      >
        {row.getValue("status")}
      </Badge>
    ),
    size: 100,
  },
  {
    header: "Last Visit",
    accessorKey: "lastVisit",
    cell: ({ row }) => {
      const date = new Date(row.getValue("lastVisit"));
      return date.toLocaleDateString();
    },
    size: 120,
  },
  {
    header: "Total Visits",
    accessorKey: "totalVisits",
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
function PatientRowActions({ row }: { row: Row<Patient> }) {
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

// Filter configuration for patients (excluding search fields)
const patientFilters: FilterConfig[] = [
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

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterValues, setFilterValues] = useState<FilterValue>({});

  // Sample data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPatients([
        {
          id: "1",
          name: "John Doe",
          email: "john.doe@email.com",
          phone: "+1 (555) 123-4567",
          dateOfBirth: "1985-03-15",
          gender: "Male",
          address: "123 Main St, City, State 12345",
          status: "Active",
          lastVisit: "2024-01-15",
          totalVisits: 12,
          insuranceProvider: "Blue Cross Blue Shield",
          emergencyContact: {
            name: "Jane Doe",
            phone: "+1 (555) 123-4568",
            relationship: "Spouse",
          },
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane.smith@email.com",
          phone: "+1 (555) 234-5678",
          dateOfBirth: "1990-07-22",
          gender: "Female",
          address: "456 Oak Ave, City, State 12345",
          status: "Active",
          lastVisit: "2024-01-10",
          totalVisits: 8,
          insuranceProvider: "Aetna",
          emergencyContact: {
            name: "Bob Smith",
            phone: "+1 (555) 234-5679",
            relationship: "Brother",
          },
        },
        {
          id: "3",
          name: "Mike Johnson",
          email: "mike.johnson@email.com",
          phone: "+1 (555) 345-6789",
          dateOfBirth: "1978-11-08",
          gender: "Male",
          address: "789 Pine Rd, City, State 12345",
          status: "Inactive",
          lastVisit: "2023-12-20",
          totalVisits: 5,
          insuranceProvider: "Cigna",
          emergencyContact: {
            name: "Sarah Johnson",
            phone: "+1 (555) 345-6790",
            relationship: "Wife",
          },
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddPatient = () => {
    console.log("Add patient clicked");
    // Implement add patient logic
  };

  const handleDeletePatients = (selectedRows: Row<Patient>[]) => {
    const patientIds = selectedRows.map((row) => row.original.id);
    setPatients((prev) =>
      prev.filter((patient) => !patientIds.includes(patient.id)),
    );
    console.log("Deleted patients:", patientIds);
  };

  const handleFiltersChange = (filters: FilterValue) => {
    setFilterValues(filters);
    console.log("Filters changed:", filters);
    // In a real app, you would apply these filters to your data fetching logic
  };

  const tableConfig: DataTableProps<Patient> = {
    data: patients,
    columns: patientColumns,
    searchConfig: {
      placeholder: "Search patients by name, email, or phone...",
      searchColumns: ["name", "email", "phone"],
      showSearch: true,
    },
    filters: patientFilters,
    onFiltersChange: handleFiltersChange,
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
    pagination: {
      pageSize: 10,
      pageSizeOptions: [5, 10, 25, 50],
    },
    initialSorting: [
      {
        id: "name",
        desc: false,
      },
    ],
    rowActions: PatientRowActions,
    emptyState: loading ? "Loading patients..." : "No patients found.",
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-1 flex-col gap-4 py-4 lg:gap-6 lg:py-6">
        <div className="flex flex-row flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Patients Management</h1>
        </div>
        <StatsGrid stats={stats} />

        <DataTable {...tableConfig} />
        <div></div>
      </div>
    </div>
  );
}
