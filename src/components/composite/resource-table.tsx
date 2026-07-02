import type { ReactNode } from "react";
import type { Key, SortDescriptor } from "react-aria-components";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@/components/ui/table.tsx";
import type { ColumnDef } from "@/types";

/**
 * A table column descriptor. `cell` renders the per-row content; `alwaysVisible`
 * columns (e.g. the row-header) are never toggleable.
 */
export interface ResourceColumn<T> extends ColumnDef {
  cell: (row: T) => ReactNode;
  alwaysVisible?: boolean;
  allowsSorting?: boolean;
  isRowHeader?: boolean;
  align?: "center";
}

interface Props<T extends { id: Key }> {
  ariaLabel: string;
  columns: ResourceColumn<T>[];
  /** Visible toggleable column ids (from `useColumnVisibility`). */
  visible: Set<Key>;
  items: T[];
  sortDescriptor: SortDescriptor;
  onSortChange: (descriptor: SortDescriptor) => void;
  getRowHref?: (row: T) => string;
  onRowAction?: (row: T) => void;
  rowClassName?: string;
  /** Trailing, always-visible actions cell (e.g. a row action menu). */
  rowActions?: (row: T) => ReactNode;
  emptyState?: () => ReactNode;
}

/**
 * Renders an admin index table from a column descriptor array, owning the
 * column-visibility gating and the react-aria collection-cache `dependencies`
 * wiring (header, body, and row caches must invalidate together when columns
 * toggle, or react-aria throws "cell count must match column count").
 */
export function ResourceTable<T extends { id: Key }>({
  ariaLabel,
  columns,
  visible,
  items,
  sortDescriptor,
  onSortChange,
  getRowHref,
  onRowAction,
  rowClassName,
  rowActions,
  emptyState,
}: Props<T>) {
  const shown = columns.filter((column) => column.alwaysVisible || visible.has(column.id));

  return (
    <Table
      bleed
      aria-label={ariaLabel}
      sortDescriptor={sortDescriptor}
      onSortChange={onSortChange}
      className="-mx-(--container-padding)">
      <TableHeader dependencies={[visible]}>
        {shown.map((column) => (
          <TableColumn
            key={column.id}
            id={column.id}
            isRowHeader={column.isRowHeader}
            allowsSorting={column.allowsSorting}
            className={column.align === "center" ? "text-center" : undefined}>
            {column.label}
          </TableColumn>
        ))}
        {rowActions ? <TableColumn /> : null}
      </TableHeader>
      <TableBody items={items} dependencies={[visible]} renderEmptyState={emptyState}>
        {(row) => (
          <TableRow
            id={row.id}
            href={getRowHref?.(row)}
            onAction={onRowAction ? () => onRowAction(row) : undefined}
            className={rowClassName}
            dependencies={[visible]}>
            {shown.map((column) => (
              <TableCell key={column.id} className={column.align === "center" ? "[&>div]:justify-center" : undefined}>
                {column.cell(row)}
              </TableCell>
            ))}
            {rowActions ? <TableCell>{rowActions(row)}</TableCell> : null}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
