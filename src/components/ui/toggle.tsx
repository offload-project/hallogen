import type { Ref } from "react";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { ToggleButton, type ToggleButtonProps } from "react-aria-components/ToggleButton";
import { twMerge } from "tailwind-merge";
import type { VariantProps } from "tailwind-variants";
import { toggleStyles } from "@/components/shared/toggle-styles.ts";

export interface ToggleProps extends ToggleButtonProps, VariantProps<typeof toggleStyles> {
  ref?: Ref<HTMLButtonElement>;
}
export function Toggle({ className, size, variant, isCircle, ref, ...props }: ToggleProps) {
  return (
    <ToggleButton
      ref={ref}
      className={composeRenderProps(className, (className, renderProps) =>
        twMerge(
          toggleStyles({
            ...renderProps,
            isCircle,
            size,
            variant,
            className,
          }),
        ),
      )}
      {...props}
    />
  );
}
