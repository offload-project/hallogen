import type { Ref } from "react";
import { Button as ButtonPrimitive, type ButtonProps as ButtonPrimitiveProps } from "react-aria-components/Button";
import type { VariantProps } from "tailwind-variants";
import { buttonStyles } from "@/components/shared/button-styles.ts";
import { cx } from "@/lib/primitive";

export interface ButtonProps extends ButtonPrimitiveProps, VariantProps<typeof buttonStyles> {
  ref?: Ref<HTMLButtonElement>;
}

export function Button({ className, variant, size, isCircle, ref, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      ref={ref}
      {...props}
      className={cx(
        buttonStyles({
          variant,
          size,
          isCircle,
        }),
        className,
      )}
    />
  );
}
