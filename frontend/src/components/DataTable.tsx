"use client";

import { useId, useMemo, useRef, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  ChevronDownIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleAlertIcon,
  CircleXIcon,
  Columns3Icon,
  EllipsisIcon,
  FilterIcon,
  ListFilterIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FilterSidebar, {
  FilterConfig,
  FilterValue,
} from "@/components/FilterSidebar";

// Generic DataTable props interface
export interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  // Search configuration
  searchConfig?: {
    placeholder?: string;
    searchColumns?: string[];
    searchFunction?: FilterFn<TData>;
    showSearch?: boolean;
  };
  // Filter configuration
  filters?: FilterConfig[];
  onFiltersChange?: (filters: FilterValue) => void;
  // Legacy filter configuration (for backward compatibility)
  statusFilterConfig?: {
    columnId: string;
    filterFunction?: FilterFn<TData>;
  };
  // Action buttons configuration
  actions?: {
    showAdd?: boolean;
    addButtonText?: string;
    onAdd?: () => void;
    showDelete?: boolean;
    deleteButtonText?: string;
    onDelete?: (selectedRows: Row<TData>[]) => void;
    deleteConfirmTitle?: string;
    deleteConfirmDescription?: string;
  };
  // Pagination configuration
  pagination?: {
    pageSize?: number;
    pageSizeOptions?: number[];
  };
  // Initial sorting
  initialSorting?: SortingState;
  // Custom row actions component
  rowActions?: (props: { row: Row<TData> }) => React.ReactNode;
  // Custom empty state
  emptyState?: React.ReactNode;
  // Table styling
  className?: string;
}

// Default filter functions
const defaultMultiColumnFilterFn =
  <TData,>(searchColumns: string[]): FilterFn<TData> =>
  (row, columnId, filterValue) => {
    const searchableContent = searchColumns
      .map((col) => {
        const value = row.getValue(col);
        return value ? String(value).toLowerCase() : "";
      })
      .join(" ");
    const searchTerm = (filterValue ?? "").toLowerCase();
    return searchableContent.includes(searchTerm);
  };

const defaultStatusFilterFn =
  <TData,>(): FilterFn<TData> =>
  (row, columnId, filterValue: string[]) => {
    if (!filterValue?.length) return true;
    const status = row.getValue(columnId) as string;
    return filterValue.includes(status);
  };

const defaultTableConfig: DataTableProps<any> = {
  data: [],
  columns: [],
  searchConfig: {
    placeholder: "Search by name, email, or phone...",
    searchColumns: ["name", "email", "phone"],
    showSearch: true,
  },
  actions: {
    showAdd: true,
    addButtonText: "Add",
    onAdd: () => {},
    showDelete: true,
    deleteButtonText: "Delete",
    onDelete: () => {},
    deleteConfirmTitle: "Delete Selected?",
    deleteConfirmDescription:
      "This action cannot be undone. This will permanently delete the selected and all their associated data.",
  },
  pagination: {
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 50],
  },
};

export default function DataTable<TData>({
  data,
  columns,
  searchConfig,
  filters,
  onFiltersChange,
  statusFilterConfig,
  actions,
  pagination,
  initialSorting,
  rowActions,
  emptyState,
  className,
}: DataTableProps<TData>) {
  const id = useId();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize:
      pagination?.pageSize || defaultTableConfig.pagination?.pageSize || 10,
  });
  const [filterValues, setFilterValues] = useState<FilterValue>({});
  const inputRef = useRef<HTMLInputElement>(null);

  const [sorting, setSorting] = useState<SortingState>(
    initialSorting || defaultTableConfig.initialSorting || [],
  );

  const handleDeleteRows = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    if (actions?.onDelete) {
      actions.onDelete(selectedRows);
    }
    table.resetRowSelection();
  };

  const handleFiltersChange = (newFilters: FilterValue) => {
    setFilterValues(newFilters);
    onFiltersChange?.(newFilters);

    // Apply filters to table columns
    const newColumnFilters: ColumnFiltersState = [];

    Object.entries(newFilters).forEach(([key, value]) => {
      if (
        value &&
        (Array.isArray(value)
          ? value.length > 0
          : value.toString().trim() !== "")
      ) {
        newColumnFilters.push({
          id: key,
          value: value,
        });
      }
    });

    setColumnFilters(newColumnFilters);
  };

  // Handle search input changes
  const handleSearchChange = (value: string) => {
    if (searchConfig?.searchColumns && searchConfig.searchColumns.length > 0) {
      // Apply search to the first column in searchColumns array
      // The filter function will handle multi-column searching
      table.getColumn(searchConfig.searchColumns[0])?.setFilterValue(value);
    }
  };

  // Generate multi-column filter function based on searchConfig
  const generateMultiColumnFilterFn =
    (searchColumns: string[]): FilterFn<TData> =>
    (row, columnId, filterValue) => {
      const searchableContent = searchColumns
        .map((col) => {
          const value = row.getValue(col);
          return value ? String(value).toLowerCase() : "";
        })
        .join(" ");
      const searchTerm = (filterValue ?? "").toLowerCase();
      return searchableContent.includes(searchTerm);
    };

  const handleClearAllFilters = () => {
    setFilterValues({});
    setColumnFilters([]);
    onFiltersChange?.({});
  };

  // Enhance columns with search filter function if searchConfig is provided
  const enhancedColumns = useMemo(() => {
    if (
      !searchConfig?.searchColumns ||
      searchConfig.searchColumns.length === 0
    ) {
      return columns;
    }

    const multiColumnFilterFn = generateMultiColumnFilterFn(
      searchConfig.searchColumns,
    );
    const searchColumnId = searchConfig.searchColumns[0];

    return columns.map((column) => {
      if (
        column.id === searchColumnId ||
        ("accessorKey" in column && column.accessorKey === searchColumnId)
      ) {
        return {
          ...column,
          filterFn: multiColumnFilterFn,
        };
      }
      return column;
    });
  }, [columns, searchConfig?.searchColumns]);

  const table = useReactTable({
    data,
    columns: enhancedColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPaginationState,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      pagination: paginationState,
      columnFilters,
      columnVisibility,
    },
  });

  // Get unique status values
  const uniqueStatusValues = useMemo(() => {
    if (!statusFilterConfig) return [];
    const statusColumn = table.getColumn(statusFilterConfig.columnId);

    if (!statusColumn) return [];

    const values = Array.from(statusColumn.getFacetedUniqueValues().keys());

    return values.sort();
  }, [
    statusFilterConfig,
    statusFilterConfig
      ? table.getColumn(statusFilterConfig.columnId)?.getFacetedUniqueValues()
      : null,
  ]);

  // Get counts for each status
  const statusCounts = useMemo(() => {
    if (!statusFilterConfig) return new Map();
    const statusColumn = table.getColumn(statusFilterConfig.columnId);
    if (!statusColumn) return new Map();
    return statusColumn.getFacetedUniqueValues();
  }, [
    statusFilterConfig,
    statusFilterConfig
      ? table.getColumn(statusFilterConfig.columnId)?.getFacetedUniqueValues()
      : null,
  ]);

  const selectedStatuses = useMemo(() => {
    if (!statusFilterConfig) return [];
    const filterValue = table
      .getColumn(statusFilterConfig.columnId)
      ?.getFilterValue() as string[];
    return filterValue ?? [];
  }, [
    statusFilterConfig,
    statusFilterConfig
      ? table.getColumn(statusFilterConfig.columnId)?.getFilterValue()
      : null,
  ]);

  const handleStatusChange = (checked: boolean, value: string) => {
    if (!statusFilterConfig) return;
    const filterValue = table
      .getColumn(statusFilterConfig.columnId)
      ?.getFilterValue() as string[];
    const newFilterValue = filterValue ? [...filterValue] : [];

    if (checked) {
      newFilterValue.push(value);
    } else {
      const index = newFilterValue.indexOf(value);
      if (index > -1) {
        newFilterValue.splice(index, 1);
      }
    }

    table
      .getColumn(statusFilterConfig.columnId)
      ?.setFilterValue(newFilterValue.length ? newFilterValue : undefined);
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input - Always visible */}
          {searchConfig?.showSearch !== false && (
            <div className="relative">
              <Input
                id={`${id}-input`}
                ref={inputRef}
                className={cn(
                  "peer min-w-60 ps-9",
                  Boolean(
                    table
                      .getColumn(searchConfig?.searchColumns?.[0] || "name")
                      ?.getFilterValue(),
                  ) && "pe-9",
                )}
                value={
                  (table
                    .getColumn(searchConfig?.searchColumns?.[0] || "name")
                    ?.getFilterValue() ?? "") as string
                }
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={searchConfig?.placeholder || "Search..."}
                type="text"
                aria-label="Search"
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <ListFilterIcon size={16} aria-hidden="true" />
              </div>
              {Boolean(
                table
                  .getColumn(searchConfig?.searchColumns?.[0] || "name")
                  ?.getFilterValue(),
              ) && (
                <button
                  className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Clear filter"
                  onClick={() => {
                    handleSearchChange("");
                    if (inputRef.current) {
                      inputRef.current.focus();
                    }
                  }}
                >
                  <CircleXIcon size={16} aria-hidden="true" />
                </button>
              )}
            </div>
          )}

          {/* Filter Sidebar */}
          {filters && filters.length > 0 && (
            <FilterSidebar
              filters={filters}
              values={filterValues}
              onValuesChange={handleFiltersChange}
              onClearAll={handleClearAllFilters}
              title="Filters"
              description="Customize your filters to find exactly what you're looking for."
            />
          )}

          {/* Legacy Status filter (for backward compatibility) */}
          {!filters && statusFilterConfig && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <FilterIcon
                    className="-ms-1 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  {statusFilterConfig.columnId}
                  {selectedStatuses.length > 0 && (
                    <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                      {selectedStatuses.length}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto min-w-36 p-3" align="start">
                <div className="space-y-3">
                  <div className="text-muted-foreground text-xs font-medium">
                    Filters
                  </div>
                  <div className="space-y-3">
                    {uniqueStatusValues.map((value, i) => (
                      <div key={value} className="flex items-center gap-2">
                        <Checkbox
                          id={`${id}-${i}`}
                          checked={selectedStatuses.includes(value)}
                          onCheckedChange={(checked: boolean) =>
                            handleStatusChange(checked, value)
                          }
                        />
                        <Label
                          htmlFor={`${id}-${i}`}
                          className="flex grow justify-between gap-2 font-normal"
                        >
                          {value}{" "}
                          <span className="text-muted-foreground ms-2 text-xs">
                            {statusCounts.get(value)}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}

          {/* Toggle columns visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Columns3Icon
                  className="-ms-1 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                      onSelect={(event) => event.preventDefault()}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-3">
          {/* Delete button */}
          {actions?.showDelete &&
            table.getSelectedRowModel().rows.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="ml-auto" variant="outline">
                    <TrashIcon
                      className="-ms-1 opacity-60"
                      size={16}
                      aria-hidden="true"
                    />
                    {actions.deleteButtonText || "Delete"}
                    <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                      {table.getSelectedRowModel().rows.length}
                    </span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                    <div
                      className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                      aria-hidden="true"
                    >
                      <CircleAlertIcon className="opacity-80" size={16} />
                    </div>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        {actions.deleteConfirmTitle ||
                          "Are you absolutely sure?"}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {actions.deleteConfirmDescription ||
                          `This action cannot be undone. This will permanently delete ${table.getSelectedRowModel().rows.length} selected ${table.getSelectedRowModel().rows.length === 1 ? "row" : "rows"}.`}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteRows}>
                      {actions.deleteButtonText || "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          {/* Add button */}
          {actions?.showAdd && (
            <Button
              className="ml-auto"
              variant="outline"
              onClick={actions.onAdd}
            >
              <PlusIcon
                className="-ms-1 opacity-60"
                size={16}
                aria-hidden="true"
              />
              {actions.addButtonText || "Add"}
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-background max-w-screen overflow-hidden rounded-md border">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                      className="h-11"
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <div
                          className={cn(
                            header.column.getCanSort() &&
                              "flex h-full cursor-pointer items-center justify-between gap-2 select-none",
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            // Enhanced keyboard handling for sorting
                            if (
                              header.column.getCanSort() &&
                              (e.key === "Enter" || e.key === " ")
                            ) {
                              e.preventDefault();
                              header.column.getToggleSortingHandler()?.(e);
                            }
                          }}
                          tabIndex={header.column.getCanSort() ? 0 : undefined}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: (
                              <ChevronUpIcon
                                className="shrink-0 opacity-60"
                                size={16}
                                aria-hidden="true"
                              />
                            ),
                            desc: (
                              <ChevronDownIcon
                                className="shrink-0 opacity-60"
                                size={16}
                                aria-hidden="true"
                              />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="last:py-0">
                      {cell.column.id === "actions" && rowActions
                        ? rowActions({ row })
                        : flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {emptyState || "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-8">
        {/* Results per page */}
        <div className="flex items-center gap-3">
          <Label htmlFor={id} className="max-sm:sr-only">
            Rows per page
          </Label>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger id={id} className="w-fit whitespace-nowrap">
              <SelectValue placeholder="Select number of results" />
            </SelectTrigger>
            <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
              {(pagination?.pageSizeOptions || [5, 10, 25, 50]).map(
                (pageSize) => (
                  <SelectItem key={pageSize} value={pageSize.toString()}>
                    {pageSize}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        </div>
        {/* Page number information */}
        <div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
          <p
            className="text-muted-foreground text-sm whitespace-nowrap"
            aria-live="polite"
          >
            <span className="text-foreground">
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
              -
              {Math.min(
                Math.max(
                  table.getState().pagination.pageIndex *
                    table.getState().pagination.pageSize +
                    table.getState().pagination.pageSize,
                  0,
                ),
                table.getRowCount(),
              )}
            </span>{" "}
            of{" "}
            <span className="text-foreground">
              {table.getRowCount().toString()}
            </span>
          </p>
        </div>

        {/* Pagination buttons */}
        <div>
          <Pagination>
            <PaginationContent>
              {/* First page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.firstPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to first page"
                >
                  <ChevronFirstIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Previous page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to previous page"
                >
                  <ChevronLeftIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Next page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to next page"
                >
                  <ChevronRightIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Last page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.lastPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to last page"
                >
                  <ChevronLastIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
