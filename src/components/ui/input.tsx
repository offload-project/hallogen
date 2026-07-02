import type { RefObject } from "react";
import { Group, type GroupProps } from "react-aria-components/Group";
import { Input as InputPrimitive, type InputProps as InputPrimitiveProps } from "react-aria-components/Input";
import { cx } from "@/lib/primitive";

interface InputProps extends InputPrimitiveProps {
  ref?: RefObject<HTMLInputElement | null>;
}
export function Input({ className, ref, ...props }: InputProps) {
  return (
    <span data-slot="control" className="relative block w-full">
      <InputPrimitive
        ref={ref}
        data-slot="input"
        className={cx(
          "relative block w-full appearance-none rounded-lg bg-(--control-bg,transparent) px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)]",
          "text-base/6 text-fg placeholder:text-muted-fg sm:text-sm/6",
          "border border-input enabled:hover:border-muted-fg/30",
          "outline-hidden focus:border-ring/70 focus:ring-3 focus:ring-ring/20 focus:enabled:hover:border-ring/80",
          "invalid:border-danger-subtle-fg/70 focus:invalid:border-danger-subtle-fg/70 focus:invalid:ring-danger-subtle-fg/20 invalid:enabled:hover:border-danger-subtle-fg/80 focus:invalid:enabled:hover:border-danger-subtle-fg/80",
          "[&::-ms-reveal]:hidden [&::-webkit-search-cancel-button]:hidden",
          "disabled:bg-muted forced-colors:in-disabled:text-[GrayText]",
          "in-disabled:bg-muted forced-colors:in-disabled:text-[GrayText]",
          "dark:scheme-dark",
          className,
        )}
        {...props}
      />
    </span>
  );
}

export function InputGroup({ className, ...props }: GroupProps) {
  return (
    <Group
      data-slot="control"
      className={cx(
        "relative isolate block",
        // icon
        "has-[>svg:first-child]:[&_input]:ps-10 has-[>svg:last-child]:[&_input]:pe-10 sm:has-[>svg:first-child]:[&_input]:ps-8 sm:has-[>svg:last-child]:[&_input]:pe-8",
        "*:[svg]:pointer-events-none *:[svg]:absolute *:[svg]:top-3 *:[svg]:z-10 *:[svg]:size-5 sm:*:[svg]:top-2.5 sm:*:[svg]:size-4",
        "[&>svg:first-child]:inset-s-3 sm:[&>svg:first-child]:inset-s-2.5 [&>svg:last-child]:inset-e-3 sm:[&>svg:last-child]:inset-e-2.5",

        // loader
        "has-[[data-slot=loader]:first-child]:[&_input]:ps-10 has-[[data-slot=loader]:last-child]:[&_input]:pe-10 sm:has-[[data-slot=loader]:first-child]:[&_input]:ps-8 sm:has-[[data-slot=loader]:last-child]:[&_input]:pe-8",
        "*:data-[slot=loader]:pointer-events-none *:data-[slot=loader]:absolute *:data-[slot=loader]:top-3 *:data-[slot=loader]:z-10 *:data-[slot=loader]:size-5 sm:*:data-[slot=loader]:top-2.5 sm:*:data-[slot=loader]:size-4",
        "[&>[data-slot=loader]:first-child]:inset-s-3 sm:[&>[data-slot=loader]:first-child]:inset-s-2.5 [&>[data-slot=loader]:last-child]:inset-e-3 sm:[&>[data-slot=loader]:last-child]:inset-e-2.5",

        // text
        "has-[[data-slot=text]:first-child]:[&_input]:ps-[calc(var(--input-gutter-start)+(--spacing(2)))] has-[[data-slot=text]:last-child]:[&_input]:pe-[calc(var(--input-gutter-end)+(--spacing(2)))] sm:has-[[data-slot=text]:first-child]:[&_input]:ps-(--input-gutter-start,--spacing(10)) sm:has-[[data-slot=text]:last-child]:[&_input]:pe-(--input-gutter-end,--spacing(10))",
        "*:data-[slot=text]:absolute *:data-[slot=text]:top-0 *:data-[slot=text]:z-10 *:data-[slot=text]:h-full *:data-[slot=text]:max-w-fit *:data-[slot=text]:grow *:data-[slot=text]:content-center [&>[data-slot='text']:not([class*='pointer-events'])]:pointer-events-none",
        "[&>[data-slot=text]:first-child:not([class*='start-'])]:inset-s-3 sm:[&>[data-slot=text]:first-child:not([class*='start-'])]:inset-s-2.5 [&>[data-slot=text]:last-child:not([class*='end-'])]:inset-e-3 sm:[&>[data-slot=text]:last-child:not([class*='end-'])]:inset-e-2.5",

        // keyboard
        "has-[[data-slot=keyboard]:first-child]:[&_input]:ps-[calc(var(--input-gutter-start)+(--spacing(2)))] has-[[data-slot=keyboard]:last-child]:[&_input]:pe-[calc(var(--input-gutter-end)+(--spacing(2)))] sm:has-[[data-slot=keyboard]:first-child]:[&_input]:ps-(--input-gutter-start,--spacing(10)) sm:has-[[data-slot=keyboard]:last-child]:[&_input]:pe-(--input-gutter-end,--spacing(10))",
        "*:data-[slot=keyboard]:absolute *:data-[slot=keyboard]:top-0 *:data-[slot=keyboard]:z-10 *:data-[slot=keyboard]:h-full *:data-[slot=keyboard]:max-w-fit *:data-[slot=keyboard]:grow *:data-[slot=keyboard]:content-center [&>[data-slot='keyboard']:not([class*='pointer-events'])]:pointer-events-none",
        "[&>[data-slot=keyboard]:first-child:not([class*='start-'])]:inset-s-3 sm:[&>[data-slot=keyboard]:first-child:not([class*='start-'])]:inset-s-2.5 [&>[data-slot=keyboard]:last-child:not([class*='end-'])]:inset-e-3 sm:[&>[data-slot=keyboard]:last-child:not([class*='end-'])]:inset-e-2.5",

        // button
        "has-[>button:first-child]:[&_input]:ps-(--input-gutter-start,--spacing(16)) has-[>button:last-child]:[&_input]:pe-(--input-gutter-end,--spacing(16)) sm:has-[>button:first-child]:[&_input]:ps-(--input-gutter-start,--spacing(14)) sm:has-[>button:last-child]:[&_input]:pe-(--input-gutter-end,--spacing(14))",
        "[&>button:first-child]:rounded-e-none [&>button:last-child]:rounded-s-none",
        "[&>button[data-variant=outline]]:border-input *:[button]:absolute *:[button]:top-0 *:[button]:z-10 *:[button]:min-h-11 sm:*:[button]:min-h-9",
        "[&>button:first-child]:inset-s-0 [&>button:last-child]:inset-e-0",

        "[&>[data-slot='loader']:not([class*='text-'])]:text-muted-fg [&>[data-slot='text']:not([class*='text-'])]:text-muted-fg [&>svg:not([class*='text-'])]:text-muted-fg",
        className,
      )}
      {...props}
    />
  );
}
