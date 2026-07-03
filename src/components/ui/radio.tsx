import type { ComponentProps } from "react";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import {
  RadioButton,
  type RadioButtonProps,
  RadioField as RadioFieldPrimitive,
  type RadioFieldProps,
  RadioGroup as RadioGroupPrimitive,
  type RadioGroupProps,
} from "react-aria-components/RadioGroup";
import { twMerge } from "tailwind-merge";
import { Label } from "@/components/ui/field";
import { cx } from "@/lib/primitive";

export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive
      {...props}
      data-slot="control"
      className={cx(
        "space-y-3 **:data-[slot=label]:font-normal",
        "has-[slot=description]:space-y-6 has-[[slot=description]]:**:data-[slot=label]:font-medium",
        className,
      )}
    />
  );
}

/** The field wrapper that owns a radio option's value and input. Compose with `RadioControl`. */
export function RadioField({ className, ...props }: RadioFieldProps) {
  return <RadioFieldPrimitive {...props} data-slot="control" className={cx("group block", className)} />;
}

/** The clickable area of a radio (indicator + label). Must be rendered inside a `RadioField`. */
export function RadioControl({ className, children, ...props }: RadioButtonProps) {
  return (
    <RadioButton className={cx("group block disabled:opacity-50", className)} {...props}>
      {composeRenderProps(children, (children, { isSelected, isFocusVisible, isInvalid }) => {
        const isStringChild = typeof children === "string";
        const content = isStringChild ? <RadioLabel>{children}</RadioLabel> : children;

        return (
          <div
            className={twMerge(
              "grid grid-cols-[1.125rem_1fr] gap-x-3 gap-y-1 sm:grid-cols-[1rem_1fr]",
              "*:data-[slot=indicator]:col-start-1 *:data-[slot=indicator]:row-start-1 *:data-[slot=indicator]:mt-0.75 sm:*:data-[slot=indicator]:mt-1",
              "*:data-[slot=label]:col-start-2 *:data-[slot=label]:row-start-1",
              "*:[[slot=description]]:col-start-2 *:[[slot=description]]:row-start-2",
              "has-[[slot=description]]:**:data-[slot=label]:font-medium",
            )}>
            <span
              data-slot="indicator"
              className={twMerge([
                "relative inset-ring inset-ring-input isolate flex size-4.5 shrink-0 items-center justify-center rounded-full bg-(--control-bg,transparent) text-bg transition before:absolute before:inset-auto before:size-2 before:shrink-0 before:rounded-full before:content-[''] hover:before:bg-muted-fg/20 sm:size-4 sm:before:size-1.7",
                "in-disabled:bg-muted",
                isSelected && [
                  "inset-ring-(--radio-ring,var(--color-ring)) bg-(--radio-bg,var(--color-primary)) text-(--radio-fg,var(--color-primary-fg)) before:bg-bg hover:before:bg-muted/90",
                  "group-invalid:inset-ring-danger-subtle-fg/70 group-invalid:bg-danger group-invalid:text-danger-fg",
                ],
                isFocusVisible && [
                  "inset-ring-(--radio-ring,var(--color-ring)) ring-(--radio-ring,var(--color-ring))/20 ring-3",
                  "group-invalid:inset-ring-danger-subtle-fg/70 group-invalid:text-danger-fg group-invalid:ring-danger-subtle-fg/20",
                ],
                isInvalid &&
                  "inset-ring-danger-subtle-fg/70 bg-danger-subtle/5 text-danger-fg ring-danger-subtle-fg/20",
              ])}
            />
            {content}
          </div>
        );
      })}
    </RadioButton>
  );
}

/** A self-contained radio option: a `RadioField` (owns the value/input) wrapping a `RadioControl`. */
export function Radio({ children, className, ...props }: RadioFieldProps) {
  return (
    <RadioField {...props}>
      <RadioControl className={className}>{children}</RadioControl>
    </RadioField>
  );
}

export function RadioLabel(props: ComponentProps<typeof Label>) {
  return <Label elementType="span" data-slot="control-label" {...props} />;
}
