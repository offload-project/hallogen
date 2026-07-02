import type { ComponentProps, ComponentPropsWithoutRef } from "react";
import { FieldError as FieldErrorPrimitive, type FieldErrorProps } from "react-aria-components/FieldError";
import { Label as LabelPrimitive, type LabelProps } from "react-aria-components/Label";
import { Text, type TextProps } from "react-aria-components/Text";
import { twMerge } from "tailwind-merge";
import { descriptionStyles, fieldErrorStyles, labelStyles } from "@/components/shared/field-styles.ts";
import { cx } from "@/lib/primitive";

export function Label({ className, ...props }: LabelProps) {
  return <LabelPrimitive data-slot="label" {...props} className={labelStyles({ className })} />;
}

export function Description({ className, ...props }: TextProps) {
  return <Text {...props} slot="description" className={descriptionStyles({ className })} />;
}

export function Fieldset({ className, ...props }: ComponentProps<"fieldset">) {
  return (
    <fieldset className={twMerge("*:data-[slot=text]:mt-1 [&>*+[data-slot=control]]:mt-6", className)} {...props} />
  );
}

export function FieldGroup({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div data-slot="control" className={twMerge("gap-6", className)} {...props} />;
}

export function FieldError({ className, ...props }: FieldErrorProps) {
  return <FieldErrorPrimitive {...props} className={cx(fieldErrorStyles(), className)} />;
}

export function Legend({ className, ...props }: ComponentProps<"legend">) {
  return (
    <legend
      data-slot="legend"
      {...props}
      className={twMerge("font-semibold text-base/6 data-disabled:opacity-50", className)}
    />
  );
}
