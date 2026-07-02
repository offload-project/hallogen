import { CameraIcon, FolderIcon, PaperclipIcon } from "lucide-react";
import type { RefObject } from "react";
import {
  FileTrigger as FileTriggerPrimitive,
  type FileTriggerProps as FileTriggerPrimitiveProps,
} from "react-aria-components/FileTrigger";
import type { VariantProps } from "tailwind-variants";
import type { buttonStyles } from "@/components/shared/button-styles.ts";
import { Button } from "./button";
import { Loader } from "./loader";

export interface FileTriggerProps extends FileTriggerPrimitiveProps, VariantProps<typeof buttonStyles> {
  isDisabled?: boolean;
  isPending?: boolean;
  ref?: RefObject<HTMLInputElement>;
  className?: string;
}

export function FileTrigger({
  variant = "outline",
  size = "md",
  isCircle = false,
  ref,
  className,
  ...props
}: FileTriggerProps) {
  return (
    <FileTriggerPrimitive ref={ref} {...props}>
      <Button className={className} isDisabled={props.isDisabled} variant={variant} size={size} isCircle={isCircle}>
        {!props.isPending ? (
          props.defaultCamera ? (
            <CameraIcon />
          ) : props.acceptDirectory ? (
            <FolderIcon />
          ) : (
            <PaperclipIcon />
          )
        ) : (
          <Loader />
        )}
        {props.children
          ? props.children
          : ["sq-sm", "sq-xs", "sq-md", "sq-lg"].includes(size as string)
            ? null
            : `${props.allowsMultiple ? "Browse a files" : props.acceptDirectory ? "Browse" : "Browse a file"}...`}
      </Button>
    </FileTriggerPrimitive>
  );
}
