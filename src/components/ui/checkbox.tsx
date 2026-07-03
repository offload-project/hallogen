import { CheckIcon, MinusIcon } from "lucide-react";
import type { ComponentProps } from "react";
import {
  CheckboxButton,
  type CheckboxButtonProps,
  CheckboxField as CheckboxFieldPrimitive,
  type CheckboxFieldProps,
} from "react-aria-components/Checkbox";
import { CheckboxGroup as CheckboxGroupPrimitive, type CheckboxGroupProps } from "react-aria-components/CheckboxGroup";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { twMerge } from "tailwind-merge";
import { Label } from "@/components/ui/field";
import { cx } from "@/lib/primitive";

export function CheckboxGroup({ className, ...props }: CheckboxGroupProps) {
  return (
    <CheckboxGroupPrimitive
      {...props}
      data-slot="control"
      className={cx(
        "space-y-3 has-[[slot=description]]:space-y-6 has-[[slot=description]]:**:data-[slot=label]:font-medium **:[[slot=description]]:block",
        className,
      )}
    />
  );
}

/** The field wrapper that owns the checkbox's form input and state. Compose with `CheckboxControl`. */
export function CheckboxField({ className, ...props }: CheckboxFieldProps) {
  return (
    <CheckboxFieldPrimitive
      {...props}
      data-slot="control"
      className={cx("has-[[slot=description]]:**:data-[slot=label]:font-medium", className)}
    />
  );
}

/** The clickable area of a checkbox (indicator + label). Must be rendered inside a `CheckboxField`. */
export function CheckboxControl({ className, children, ...props }: CheckboxButtonProps) {
  return (
    <CheckboxButton
      className={cx(
        "group block [--indicator-mt:--spacing(0.75)] disabled:opacity-50 sm:[--indicator-mt:--spacing(1)]",
        className,
      )}
      {...props}>
      {composeRenderProps(children, (children, { isSelected, isIndeterminate, isFocusVisible, isInvalid }) => {
        const isStringChild = typeof children === "string";
        const indicator = isIndeterminate ? (
          <MinusIcon data-slot="check-indicator" />
        ) : isSelected ? (
          <CheckIcon data-slot="check-indicator" />
        ) : null;

        const content = isStringChild ? <CheckboxLabel>{children}</CheckboxLabel> : children;

        return (
          <div
            className={twMerge(
              "grid grid-cols-[1.125rem_1fr] gap-y-1 has-data-[slot=label]:gap-x-3 sm:grid-cols-[1rem_1fr]",
              "*:data-[slot=indicator]:col-start-1 *:data-[slot=indicator]:row-start-1 *:data-[slot=indicator]:mt-(--indicator-mt)",
              "*:data-[slot=label]:col-start-2 *:data-[slot=label]:row-start-1",
              "*:[[slot=description]]:col-start-2 *:[[slot=description]]:row-start-2",
              "has-[[slot=description]]:**:data-[slot=label]:font-medium",
            )}>
            <span
              data-slot="indicator"
              className={twMerge([
                "relative inset-ring inset-ring-input isolate flex shrink-0 items-center justify-center rounded bg-(--control-bg,transparent) text-bg transition group-hover:inset-ring-muted-fg/30",
                "sm:size-4 sm:*:data-[slot=check-indicator]:size-3.5",
                "size-4.5 *:data-[slot=check-indicator]:size-4",
                "in-disabled:bg-muted",
                (isSelected || isIndeterminate) && [
                  "inset-ring-(--checkbox-ring,var(--color-ring)) bg-(--checkbox-bg,var(--color-primary)) text-(--checkbox-fg,var(--color-primary-fg))",
                  "group-invalid:inset-ring/70 group-invalid:bg-danger group-invalid:text-danger-fg dark:group-invalid:inset-ring-danger-subtle-fg/70",
                ],
                isFocusVisible && [
                  "inset-ring-(--checkbox-ring,var(--color-ring)) ring-(--checkbox-ring,var(--color-ring))/20 ring-3",
                  "group-invalid:inset-ring-danger-subtle-fg/70 group-invalid:text-danger-fg group-invalid:ring-danger-subtle-fg/20",
                ],
                isInvalid &&
                  "inset-ring-danger-subtle-fg/70 bg-danger-subtle/5 text-danger-fg ring-danger-subtle-fg/20 group-hover:inset-ring-danger-subtle-fg/70",
              ])}>
              {indicator}
            </span>
            {content}
          </div>
        );
      })}
    </CheckboxButton>
  );
}

/** A self-contained checkbox: a `CheckboxField` (owns the input) wrapping a `CheckboxControl`. */
export function Checkbox({ children, className, ...props }: CheckboxFieldProps) {
  return (
    <CheckboxField {...props}>
      <CheckboxControl className={className}>{children}</CheckboxControl>
    </CheckboxField>
  );
}

export function CheckboxLabel(props: ComponentProps<typeof Label>) {
  return <Label elementType="span" data-slot="control-label" {...props} />;
}
