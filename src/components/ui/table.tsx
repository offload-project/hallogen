import { ChevronDownIcon, ChevronRightIcon, Columns3Icon, GripVerticalIcon } from "lucide-react";
import { createContext, type Ref, use } from "react";
import type { Key, Selection } from "react-aria-components";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { Group } from "react-aria-components/Group";
import type {
  CellProps,
  ColumnProps,
  ColumnResizerProps,
  TableHeaderProps as HeaderProps,
  RowProps,
  TableBodyProps,
  TableFooterProps,
  TableProps as TablePrimitiveProps,
} from "react-aria-components/Table";
import {
  Cell,
  Collection,
  Column,
  ColumnResizer as ColumnResizerPrimitive,
  ResizableTableContainer,
  Row,
  TableBody as TableBodyPrimitive,
  TableFooter as TableFooterPrimitive,
  TableHeader as TableHeaderPrimitive,
  Table as TablePrimitive,
  useTableOptions,
} from "react-aria-components/Table";
import { twJoin, twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button.tsx";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Menu, MenuContent, MenuItem, MenuLabel } from "@/components/ui/menu.tsx";
import { cx } from "@/lib/primitive";
import type { ColumnDef } from "@/types";
import { Checkbox } from "./checkbox";

interface TableProps extends Omit<TablePrimitiveProps, "className"> {
  allowResize?: boolean;
  className?: string;
  bleed?: boolean;
  grid?: boolean;
  striped?: boolean;
  ref?: Ref<HTMLTableElement>;
}

const TableContext = createContext<TableProps>({
  allowResize: false,
});

const useTableContext = () => use(TableContext);

const Root = (props: TableProps) => {
  return (
    <TablePrimitive
      className="w-full min-w-full caption-bottom text-sm/6 outline-hidden [--table-selected-bg:var(--color-secondary)]/50"
      {...props}
    />
  );
};

const Table = ({ allowResize, className, bleed = false, grid = false, striped = false, ref, ...props }: TableProps) => {
  return (
    <TableContext.Provider value={{ allowResize, bleed, grid, striped }}>
      <div className="flow-root">
        <div
          className={twMerge(
            "relative -mx-(--gutter) overflow-x-auto whitespace-nowrap [--gutter-y:--spacing(2)] has-data-[slot=table-resizable-container]:overflow-auto",
            className,
          )}>
          <div className={twJoin("inline-block min-w-full align-middle", !bleed && "sm:px-(--gutter)")}>
            {allowResize ? (
              <ResizableTableContainer data-slot="table-resizable-container">
                <Root ref={ref} {...props} />
              </ResizableTableContainer>
            ) : (
              <Root {...props} ref={ref} />
            )}
          </div>
        </div>
      </div>
    </TableContext.Provider>
  );
};

const ColumnResizer = ({ className, ...props }: ColumnResizerProps) => (
  <ColumnResizerPrimitive
    {...props}
    className={cx(
      "absolute end-0 top-0 bottom-0 grid w-px &[data-resizable-direction=left]:cursor-e-resize &[data-resizable-direction=right]:cursor-w-resize resizable-both:cursor-ew-resize touch-none place-content-center px-1 [&[data-resizing]>div]:bg-primary",
      className,
    )}>
    <div className="h-full w-px bg-border py-(--gutter-y)" />
  </ColumnResizerPrimitive>
);

const TableBody = <T extends object>({ renderEmptyState, ...props }: TableBodyProps<T>) => (
  <TableBodyPrimitive
    data-slot="table-body"
    renderEmptyState={(state) => (
      <>
        {renderEmptyState ? (
          renderEmptyState(state)
        ) : (
          <div aria-hidden className="relative flex h-72 items-center justify-center md:h-100">
            <div className="absolute top-[65%] space-y-0.5 px-2 text-center">
              <CardTitle className="font-semibold text-lg">No data found</CardTitle>
              <CardDescription>No information is currently available in this section.</CardDescription>
            </div>
          </div>
        )}
      </>
    )}
    {...props}
  />
);

interface TableColumnProps extends ColumnProps {
  isResizable?: boolean;
}

const TableColumn = ({ isResizable = false, className, ...props }: TableColumnProps) => {
  const { bleed, grid } = useTableContext();
  return (
    <Column
      data-slot="table-column"
      {...props}
      className={cx(
        [
          "text-start font-medium text-muted-fg",
          "relative allows-sorting:cursor-default dragging:cursor-grabbing outline-hidden",
          "px-4 py-(--gutter-y)",
          "first:ps-(--gutter,--spacing(2)) last:pe-(--gutter,--spacing(2))",
          !bleed && "sm:last:pe-1 sm:first:ps-1",
          grid && "border-l first:border-l-0",
          isResizable && "overflow-hidden truncate",
        ],
        className,
      )}>
      {(values) => (
        <Group
          role="presentation"
          tabIndex={-1}
          className={twJoin(["inline-flex items-center gap-2 **:[svg]:shrink-0"])}>
          {typeof props.children === "function" ? props.children(values) : props.children}
          {values.allowsSorting && (
            <span
              className={twJoin(
                "touch-target grid size-[1.15rem] flex-none shrink-0 place-content-center rounded bg-secondary text-fg *:[svg]:size-3.5 *:[svg]:shrink-0 *:[svg]:transition-transform *:[svg]:duration-200",
                values.isHovered ? "bg-secondary-fg/10" : "",
              )}>
              <ChevronDownIcon className={values.sortDirection === "ascending" ? "rotate-180" : ""} />
            </span>
          )}
          {isResizable && <ColumnResizer />}
        </Group>
      )}
    </Column>
  );
};

interface TableHeaderProps<T extends object> extends HeaderProps<T> {
  ref?: Ref<HTMLTableSectionElement>;
}

const TableHeader = <T extends object>({ children, ref, columns, className, ...props }: TableHeaderProps<T>) => {
  const { bleed } = useTableContext();
  const { selectionBehavior, selectionMode, allowsDragging } = useTableOptions();
  return (
    <TableHeaderPrimitive data-slot="table-header" className={cx("border-b", className)} ref={ref} {...props}>
      {allowsDragging && (
        <Column
          data-slot="table-column"
          className={twMerge("first:ps-(--gutter,--spacing(2))", !bleed && "sm:last:pe-1 sm:first:ps-1")}
        />
      )}
      {selectionBehavior === "toggle" && (
        <Column
          data-slot="table-column"
          className={twMerge("first:ps-(--gutter,--spacing(2))", !bleed && "sm:last:pe-1 sm:first:ps-1")}>
          {selectionMode === "multiple" && (
            <Checkbox className="[--indicator-mt:0] sm:[--indicator-mt:0]" slot="selection" />
          )}
        </Column>
      )}
      <Collection items={columns}>{children}</Collection>
    </TableHeaderPrimitive>
  );
};

interface TableRowProps<T extends object> extends RowProps<T> {
  ref?: Ref<HTMLTableRowElement>;
}

const TableRow = <T extends object>({ children, className, columns, id, ref, ...props }: TableRowProps<T>) => {
  const { selectionBehavior, allowsDragging } = useTableOptions();
  const { striped } = useTableContext();
  return (
    <Row
      ref={ref}
      data-slot="table-row"
      id={id}
      {...props}
      className={composeRenderProps(
        className,
        (className, { isSelected, selectionMode, isFocusVisibleWithin, isDragging, isDisabled, isFocusVisible }) =>
          twMerge(
            "group relative cursor-default outline outline-transparent",
            isFocusVisible && "bg-primary/5 outline-primary ring-3 ring-ring/20 hover:bg-primary/10",
            isDragging && "cursor-grabbing bg-primary/10 text-fg outline-primary",
            isSelected && "bg-(--table-selected-bg) text-fg hover:bg-(--table-selected-bg)/50",
            striped && "even:bg-muted",
            (props.href || props.onAction || selectionMode === "multiple") &&
              "hover:bg-(--table-selected-bg) hover:text-fg",
            (props.href || props.onAction || selectionMode === "multiple") &&
              isFocusVisibleWithin &&
              "bg-(--table-selected-bg)/50 selected:bg-(--table-selected-bg)/50 text-fg",
            isDisabled && "opacity-50",
            className,
          ),
      )}>
      {allowsDragging && (
        <TableCell className="px-0">
          <Button
            slot="drag"
            className="grid place-content-center rounded-xs px-[calc(var(--gutter)/2)] outline-hidden focus-visible:ring focus-visible:ring-ring">
            <GripVerticalIcon />
          </Button>
        </TableCell>
      )}
      {selectionBehavior === "toggle" && (
        <TableCell className="px-0">
          <Checkbox className="[--indicator-mt:0] sm:[--indicator-mt:0]" slot="selection" />
        </TableCell>
      )}
      <Collection items={columns}>{children}</Collection>
    </Row>
  );
};

interface TableCellProps extends CellProps {
  ref?: Ref<HTMLTableCellElement>;
}
const TableCell = ({ className, ref, ...props }: TableCellProps) => {
  const { allowResize, bleed, grid, striped } = useTableContext();
  return (
    <Cell
      ref={ref}
      data-slot="table-cell"
      {...props}
      className={cx(
        twJoin(
          "group px-4 py-(--gutter-y) align-middle outline-hidden first:ps-(--gutter,--spacing(2)) last:pe-(--gutter,--spacing(2)) group-has-data-focus-visible-within:text-fg",
          !striped && "border-b",
          grid && "border-l first:border-l-0",
          !bleed && "sm:last:pe-1 sm:first:ps-1",
          allowResize && "overflow-hidden truncate",
        ),
        className,
      )}
      style={({ hasChildItems, isTreeColumn, level }) => ({
        paddingInlineStart: isTreeColumn ? 4 + (hasChildItems ? 0 : 24) + (level - 1) * 20 : undefined,
      })}>
      {composeRenderProps(props.children, (children, { hasChildItems, isTreeColumn, isExpanded, isDisabled }) => (
        <div className="flex items-center">
          {hasChildItems && isTreeColumn && (
            <Button
              slot="chevron"
              className={twJoin(
                isDisabled && "opacity-50",
                "mr-2 grid size-[1.15rem] flex-none shrink-0 place-content-center rounded text-fg hover:bg-secondary",
              )}>
              <ChevronRightIcon
                className={twJoin("size-4 transition-transform duration-200", isExpanded && "rotate-90")}
              />
            </Button>
          )}

          {children}
        </div>
      ))}
    </Cell>
  );
};

const TableFooter = <T extends object>({ className, ...props }: TableFooterProps<T>) => {
  return <TableFooterPrimitive className={twMerge("**:font-semibold", className)} {...props} />;
};

interface TableColumnMenuProps {
  columns: ColumnDef[];
  visible: Set<Key>;
  onChange: (visible: Set<Key>) => void;
}

export function TableColumnMenu({ columns, visible, onChange }: TableColumnMenuProps) {
  function handleSelectionChange(keys: Selection) {
    onChange(keys === "all" ? new Set(columns.map((column) => column.id)) : new Set(keys));
  }

  return (
    <Menu>
      <Button variant="outline">
        <Columns3Icon />
        Columns
      </Button>
      <MenuContent
        aria-label="Toggle columns"
        placement="bottom end"
        selectionMode="multiple"
        selectedKeys={visible}
        onSelectionChange={handleSelectionChange}
        items={columns}>
        {(column) => (
          <MenuItem id={column.id} textValue={column.label}>
            <MenuLabel>{column.label}</MenuLabel>
          </MenuItem>
        )}
      </MenuContent>
    </Menu>
  );
}

export type { TableColumnProps, TableProps, TableRowProps };
export { Table, TableBody, TableCell, TableColumn, TableFooter, TableHeader, TableRow };
