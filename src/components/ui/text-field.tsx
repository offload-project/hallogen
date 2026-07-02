import { TextField as TextFieldPrimitive, type TextFieldProps } from "react-aria-components/TextField";
import { fieldStyles } from "@/components/shared/field-styles.ts";
import { cx } from "@/lib/primitive";

export function TextField({ className, ...props }: TextFieldProps) {
  return <TextFieldPrimitive data-slot="control" className={cx(fieldStyles(), className)} {...props} />;
}
