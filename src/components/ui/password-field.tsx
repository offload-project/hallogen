import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import type { InputProps } from "react-aria-components/Input";
import { TextField as TextFieldPrimitive, type TextFieldProps } from "react-aria-components/TextField";
import { ToggleButton } from "react-aria-components/ToggleButton";
import { twJoin } from "tailwind-merge";
import { fieldStyles } from "@/components/shared/field-styles.ts";
import { Input, InputGroup } from "@/components/ui/input";
import { cx } from "@/lib/primitive";

export function PasswordField({ className, ...props }: Omit<TextFieldProps, "type">) {
  return <TextFieldPrimitive data-slot="control" className={cx(fieldStyles(), className)} {...props} />;
}

export function PasswordInput(props: Omit<InputProps, "type">) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <InputGroup className="[--input-gutter-end:--spacing(12)]">
      <Input {...props} type={isPasswordVisible ? "text" : "password"} />
      <div
        data-slot="text"
        className="in-disabled:pointer-events-none pointer-events-auto end-0 p-px in-disabled:opacity-50">
        <div className="flex h-full items-center overflow-hidden rounded-e-[calc(var(--radius-lg)-1px)] border-s">
          <ToggleButton
            className={twJoin(
              "inline-grid h-full place-content-center rounded-e-[calc(var(--radius-lg)-1px)] pressed:text-fg text-muted-fg outline-hidden enabled:hover:text-fg",
              "w-11.5 grow bg-input/20 pressed:bg-input/60 sm:w-9",
              "*:[svg]:size-5 sm:*:[svg]:size-4",
              "disabled:pointer-events-none disabled:opacity-50",
            )}
            aria-label="Show password"
            isSelected={isPasswordVisible}
            onChange={setIsPasswordVisible}
            excludeFromTabOrder>
            {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
          </ToggleButton>
        </div>
      </div>
    </InputGroup>
  );
}
