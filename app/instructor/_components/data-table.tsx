'use client';
import * as React from "react"
import { CirclePlus } from "lucide-react"
import { DataTablePagination } from "./Pagination";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    SortingState,
    ColumnFiltersState,
    getFilteredRowModel,
    VisibilityState,
    getPaginationRowModel,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"

import { DataTableViewOptions } from "./ViewOptions"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[],
    data: TData[],
    onAdd: () => void;
    onEdit: (data: TData) => void;
    onDelete: (id: string) => void;
    onmultiDelete: (data: TData[]) => void;
}

export default function DataTable<TData, TValue>({
    columns,
    data,
    onAdd,
    onEdit,
    onDelete,
    onmultiDelete,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        meta: {
            onEdit,
            onDelete,
        },
    })
    const handlemultiDelete = () => {
        const selectedItems = table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original as TData);
        onmultiDelete(selectedItems);
    };

    return (
        <div className="w-[95%] mx-auto">
            <div className="flex justify-between items-center py-4">
                <Input
                    placeholder="Filter course..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />

                <div className="flex items-center gap-4">

                    {Object.keys(rowSelection).length > 0 && (
                        <Button onClick={handlemultiDelete} variant="destructive">
                            Delete Selected ({Object.keys(rowSelection).length})
                        </Button>
                    )}
                    <Button onClick={onAdd} className="bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md ">
                        <CirclePlus />
                        Create Course
                    </Button>

                    <DataTableViewOptions table={table} />
                </div>

            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}>

                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
            <div className="my-4">
                <DataTablePagination table={table} />
            </div>

        </div>
    );
}


