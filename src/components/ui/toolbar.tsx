import { createContext, type Ref, use } from "react";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { Group, type GroupProps } from "react-aria-components/Group";
import type { SeparatorProps } from "react-aria-components/Separator";
import { Toolbar as ToolbarPrimitive, type ToolbarProps as ToolbarPrimitiveProps } from "react-aria-components/Toolbar";
import { twMerge } from "tailwind-merge";
import { cx } from "@/lib/primitive";
import { Separator } from "./separator";
import { Toggle, type ToggleProps } from "./toggle";

interface ToolbarContextValue {
  orientation: "horizontal" | "vertical";
  isCircle?: boolean;
  size?: ToggleProps["size"];
}

const ToolbarContext = createContext<ToolbarContextValue>({
  orientation: "horizontal",
  isCircle: false,
  size: "sm",
});

interface ToolbarProps extends ToolbarPrimitiveProps {
  isCircle?: boolean;
  size?: ToggleProps["size"];
  ref?: Ref<HTMLDivElement>;
}

const Toolbar = ({ orientation = "horizontal", isCircle, size = "sm", className, ref, ...props }: ToolbarProps) => {
  return (
    <ToolbarContext value={{ orientation, isCircle, size }}>
      <ToolbarPrimitive
        ref={ref}
        orientation={orientation}
        {...props}
        className={composeRenderProps(className, (className, { orientation }) =>
          twMerge(
            "group scrollbar-none inset-ring inset-ring-border inline-flex flex-row gap-1.5 bg-overlay p-1.5 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
            isCircle ? "rounded-full" : "rounded-lg",
            orientation === "horizontal"
              ? "scrollbar-none flex-row items-center [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              : "flex-col items-start",
            className,
          ),
        )}
      />
    </ToolbarContext>
  );
};

const ToolbarGroupContext = createContext<{ isDisabled?: boolean }>({});

interface ToolbarGroupProps extends GroupProps {}

const ToolbarGroup = ({ isDisabled, className, ...props }: ToolbarGroupProps) => {
  return (
    <ToolbarGroupContext value={{ isDisabled }}>
      <Group
        className={cx(
          "flex gap-1.5 group-orientation-vertical:flex-col group-orientation-vertical:items-start group-orientation-horizontal:items-center",
          className,
        )}
        {...props}>
        {props.children}
      </Group>
    </ToolbarGroupContext>
  );
};

interface ToggleItemProps extends ToggleProps {}

const ToolbarItem = ({
  isDisabled,
  isCircle,
  size,
  variant = "outline",
  ref,
  className,
  ...props
}: ToggleItemProps) => {
  const group = use(ToolbarGroupContext);
  const context = use(ToolbarContext);

  const effectiveIsDisabled = isDisabled || group.isDisabled;
  const effectiveIsCircle = isCircle || context.isCircle;
  const effectiveSize = size ?? context.size;

  return (
    <Toggle
      variant={variant}
      size={effectiveSize}
      ref={ref}
      data-slot="toolbar-item"
      className={cx(effectiveIsCircle ? "rounded-full" : "rounded-[calc(var(--radius-lg)-1px)]", className)}
      isDisabled={effectiveIsDisabled}
      {...props}
    />
  );
};

type ToolbarSeparatorProps = SeparatorProps;

const ToolbarSeparator = ({ className, ...props }: ToolbarSeparatorProps) => {
  const { orientation } = use(ToolbarContext);
  const reverseOrientation = orientation === "vertical" ? "horizontal" : "vertical";

  return (
    <Separator
      orientation={reverseOrientation}
      className={twMerge(reverseOrientation === "vertical" ? "mx-0.5 h-6" : "my-0.5 w-8", className)}
      {...props}
    />
  );
};

export type { ToggleItemProps, ToolbarGroupProps, ToolbarProps, ToolbarSeparatorProps };
export { Toolbar, ToolbarGroup, ToolbarItem, ToolbarSeparator };
