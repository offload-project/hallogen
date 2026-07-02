import { ColorField as ColorFieldPrimitive, type ColorFieldProps } from "react-aria-components/ColorField";
import { fieldStyles } from "@/components/shared/field-styles.ts";
import { cx } from "@/lib/primitive";

export function ColorField({ className, ...props }: ColorFieldProps) {
  return <ColorFieldPrimitive {...props} data-slot="control" className={cx(fieldStyles(), className)} />;
}
