import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import LoadingState from "@/components/LoadingState";
import EmptyState from "@/components/EmptyState";

export default function DataTable({ columns, data, loading, rowActions, lookups }) {
  if (loading) return <LoadingState />;
  if (!data || data.length === 0) return <EmptyState />;
  return (
    <div className="rounded-lg border bg-card overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((c) => (
              <TableHead key={c.key} className={c.className}>{c.label}</TableHead>
            ))}
            {rowActions && <TableHead className="text-right w-24">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {columns.map((c) => (
                <TableCell key={c.key} className={c.cellClassName}>
                  {c.render ? c.render(row, lookups) : (row[c.key] ?? "—")}
                </TableCell>
              ))}
              {rowActions && <TableCell className="text-right">{rowActions(row)}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}