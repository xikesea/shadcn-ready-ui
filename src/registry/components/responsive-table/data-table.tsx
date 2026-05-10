"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Settings2, Trash2, LayoutGrid, List, AlignJustify } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  meta?: any;
  onBulkDeleteRequest?: (rows: TData[]) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  meta,
  onBulkDeleteRequest,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [viewMode, setViewMode] = React.useState<"table" | "grid" | "stacked">("table");

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta,
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const statusFilter = (table.getColumn("status")?.getFilterValue() as string) ?? "all";

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Input
            placeholder="Filter products..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Select
            value={statusFilter}
            onValueChange={(value: any) => {
              if (value === "all") {
                table.getColumn("status")?.setFilterValue(undefined);
              } else {
                table.getColumn("status")?.setFilterValue(value);
              }
            }}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={viewMode}
            onValueChange={(value: "table" | "grid" | "stacked" | null) => value && setViewMode(value)}
          >
            <SelectTrigger className="w-[145px]">
              <div className="flex items-center gap-2">
                {viewMode === "table" && <List className="w-4 h-4" />}
                {viewMode === "stacked" && <AlignJustify className="w-4 h-4" />}
                {viewMode === "grid" && <LayoutGrid className="w-4 h-4" />}
                <span className="capitalize">{viewMode} View</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="table">
                <div className="flex items-center gap-2"><List className="w-4 h-4" /> Table View</div>
              </SelectItem>
              <SelectItem value="stacked">
                <div className="flex items-center gap-2"><AlignJustify className="w-4 h-4" /> Stacked View</div>
              </SelectItem>
              <SelectItem value="grid">
                <div className="flex items-center gap-2"><LayoutGrid className="w-4 h-4" /> Grid View</div>
              </SelectItem>
            </SelectContent>
          </Select>
          {selectedRows.length > 0 && onBulkDeleteRequest && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                onBulkDeleteRequest(selectedRows.map((r) => r.original));
              }}
              className="ml-2 whitespace-nowrap"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete ({selectedRows.length})
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" className="ml-auto">
                  <Settings2 className="w-4 h-4 mr-2" />
                  Columns
                </Button>
              }
            />
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>
      
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const visibleCells = row.getVisibleCells();
              return (
                <Card key={row.id} className={row.getIsSelected() ? "border-primary" : ""}>
                  <CardHeader className="flex flex-row items-start justify-between pb-2 gap-4">
                    <div className="font-semibold text-lg truncate">
                      {flexRender(visibleCells[1]?.column.columnDef.cell, visibleCells[1]?.getContext())}
                    </div>
                    <div onClick={(e) => e.stopPropagation()} className="-mt-1">
                      {flexRender(
                        visibleCells[visibleCells.length - 1]?.column.columnDef.cell,
                        visibleCells[visibleCells.length - 1]?.getContext()
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-3 text-sm text-muted-foreground mt-2">
                      {visibleCells.slice(2, -1).map((cell) => (
                        <div key={cell.id} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                          <span className="font-medium capitalize">{cell.column.id}</span>
                          <span>{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 border-t mt-auto flex items-center justify-between bg-muted/20">
                    <span className="text-xs text-muted-foreground">Select to modify</span>
                    {flexRender(visibleCells[0]?.column.columnDef.cell, visibleCells[0]?.getContext())}
                  </CardFooter>
                </Card>
              );
            })
          ) : (
            <div className="col-span-full h-24 flex items-center justify-center border rounded-md text-muted-foreground">
              No results.
            </div>
          )}
        </div>
      ) : (
        <div className={viewMode === "stacked" ? "md:rounded-md md:border md:bg-card" : "rounded-md border bg-card"}>
          <Table className={viewMode === "stacked" ? "block w-full md:table" : ""}>
            <TableHeader className={viewMode === "stacked" ? "hidden md:table-header-group" : ""}>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className={viewMode === "stacked" ? "block md:table-row-group" : ""}>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={viewMode === "stacked" ? "flex flex-col mb-4 border rounded-lg bg-card md:table-row md:mb-0 md:border-0 md:rounded-none md:bg-transparent" : ""}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell 
                        key={cell.id}
                        className={viewMode === "stacked" ? "flex items-center justify-between border-b last:border-0 md:table-cell md:border-b-0 py-3 md:py-4 px-4 md:px-4" : ""}
                      >
                        {viewMode === "stacked" && (
                          <span className="font-medium capitalize text-muted-foreground md:hidden">
                            {cell.column.id}
                          </span>
                        )}
                        <div>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2">
        <div className="flex-1 text-sm text-muted-foreground w-full sm:w-auto text-center sm:text-left">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 lg:gap-8 w-full sm:w-auto">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium whitespace-nowrap">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-center text-sm font-medium whitespace-nowrap">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
