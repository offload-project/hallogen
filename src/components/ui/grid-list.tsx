import { GripVerticalIcon } from "lucide-react";
import type { ComponentProps, Ref } from "react";
import { Button } from "react-aria-components/Button";
import type { GridListItemProps, GridListProps } from "react-aria-components/GridList";
import {
  GridListHeader as GridListHeaderPrimitive,
  GridListItem as GridListItemPrimitive,
  GridList as GridListPrimitive,
  GridListSection as GridListSectionPrimitive,
} from "react-aria-components/GridList";
import { Text, type TextProps } from "react-aria-components/Text";
import { twMerge } from "tailwind-merge";
import { cx } from "@/lib/primitive";
import { Checkbox } from "./checkbox";

const GridList = <T extends object>({ className, ...props }: GridListProps<T>) => (
  <GridListPrimitive
    data-slot="grid-list"
    className={cx(
      "relative divide-y overflow-hidden rounded-lg border bg-bg *:drop-target:border-accent sm:text-sm/6 dark:bg-muted",
      className,
    )}
    {...props}
  />
);

const GridListSection = <T extends object>({
  className,
  ...props
}: ComponentProps<typeof GridListSectionPrimitive<T>>) => {
  return (
    <GridListSectionPrimitive data-slot="grid-list-section" className={twMerge("divide-y", className)} {...props} />
  );
};

const GridListHeader = ({ className, ...props }: ComponentProps<typeof GridListHeaderPrimitive>) => {
  return (
    <GridListHeaderPrimitive
      data-slot="grid-list-header"
      className={twMerge("px-3 py-2.5 font-semibold text-sm/6", className)}
      {...props}
    />
  );
};

const GridListItem = ({ className, children, ...props }: GridListItemProps) => {
  const textValue = typeof children === "string" ? children : undefined;
  return (
    <GridListItemPrimitive
      textValue={textValue}
      {...props}
      className={cx(
        "group relative min-w-0 px-3 py-2.5 outline-hidden [--me-icon:--spacing(2)]",
        "flex min-w-0 cursor-default items-center gap-2 sm:gap-2.5",
        "dragging:cursor-grab dragging:opacity-70 dragging:**:[[slot=drag]]:text-fg",
        "hover:bg-accent/50 **:[svg:not([data-slot='check-indicator'])]:size-5 **:[svg:not([data-slot='check-indicator'])]:shrink-0 **:[svg:not([data-slot='check-indicator'])]:text-muted-fg sm:**:[svg:not([data-slot='check-indicator'])]:size-4",
        "selected:bg-accent/40 selected:text-fg selected:hover:bg-accent/80 selected:**:[.text-muted-fg]:text-accent-fg/80",
        "href" in props && "cursor-pointer",
        className,
      )}>
      {(values) => (
        <>
          {values.allowsDragging && (
            <Button slot="drag">
              <GripVerticalIcon className="size-5 stroke-muted-fg sm:size-4" />
            </Button>
          )}

          {values.selectionMode === "multiple" && values.selectionBehavior === "toggle" && (
            <Checkbox className="[--indicator-mt:0] *:gap-x-0 sm:[--indicator-mt:0]" slot="selection" />
          )}
          {typeof children === "function" ? children(values) : children}
        </>
      )}
    </GridListItemPrimitive>
  );
};

const GridListEmptyState = ({ ref, className, ...props }: ComponentProps<"div">) => (
  <div ref={ref} className={twMerge("p-6", className)} {...props} />
);

const GridListSpacer = ({ className, ref, ...props }: ComponentProps<"div">) => {
  return <div ref={ref} aria-hidden className={twMerge("-ms-4 flex-1", className)} {...props} />;
};

const GridListStart = ({ className, ref, ...props }: ComponentProps<"div">) => {
  return <div ref={ref} className={twMerge("relative flex items-center gap-x-2.5 sm:gap-x-3", className)} {...props} />;
};

interface GridListTextProps extends TextProps {
  ref?: Ref<HTMLDivElement>;
}

const GridListLabel = ({ className, ref, ...props }: GridListTextProps) => (
  <Text ref={ref} className={twMerge("font-medium", className)} {...props} />
);

const GridListDescription = ({ className, ref, ...props }: GridListTextProps) => (
  <Text slot="description" ref={ref} className={twMerge("font-normal text-muted-fg text-sm", className)} {...props} />
);

export type { GridListItemProps, GridListProps };
export {
  GridList,
  GridListDescription,
  GridListEmptyState,
  GridListHeader,
  GridListItem,
  GridListLabel,
  GridListSection,
  GridListSpacer,
  GridListStart,
};
