import { Link as InertiaLink, type InertiaLinkProps } from "@inertiajs/react";
import type { ReactNode, RefObject } from "react";
import { mergeProps, type PressEvent, useFocusRing, useHover, usePress } from "react-aria";
import type { LinkRenderProps as RACLinkRenderProps } from "react-aria-components/Link";
import { twMerge } from "tailwind-merge";

export interface LinkRenderProps extends RACLinkRenderProps {
  defaultClassName: string | undefined;
  defaultChildren: ReactNode;
}

export interface LinkProps extends Omit<InertiaLinkProps, "className" | "children" | "slot" | "onClick" | "style"> {
  ref?: RefObject<HTMLAnchorElement>;
  className?: string | ((renderProps: LinkRenderProps) => string);
  children?: ReactNode | ((renderProps: LinkRenderProps) => ReactNode);
  isDisabled?: boolean;
  isCurrent?: boolean;
  slot?: string | null;
  onClick?: (event: import("react").MouseEvent<any>) => void;
  onPress?: (e: PressEvent) => void;
  style?: import("react").CSSProperties;
}

const baseClasses =
  "font-medium text-(--primary) outline-0 outline-offset-2 focus-visible:outline-2 focus-visible:outline-ring forced-colors:outline-[Highlight] disabled:cursor-default disabled:opacity-50 forced-colors:disabled:text-[GrayText]";

export function Link({
  className,
  ref,
  children,
  isDisabled = false,
  isCurrent = false,
  slot: _slot,
  onPress,
  ...props
}: LinkProps) {
  const { hoverProps, isHovered } = useHover({ isDisabled });
  const { pressProps, isPressed } = usePress({ isDisabled, onPress });
  const { isFocused, isFocusVisible, focusProps } = useFocusRing();

  // useHover and usePress both emit onPointerEnter/onPointerLeave; spreading them
  // separately lets press's handlers clobber hover's (hover never fires). mergeProps
  // chains same-named handlers so both run.
  const interactionProps = mergeProps(hoverProps, pressProps, focusProps);

  const renderProps: LinkRenderProps = {
    isCurrent,
    isHovered,
    isPressed,
    isFocused,
    isFocusVisible,
    isDisabled,
    defaultClassName: undefined,
    defaultChildren: typeof children === "function" ? null : children,
  };

  const resolvedClassName = twMerge(
    baseClasses,
    props.href && "cursor-pointer",
    typeof className === "function" ? className(renderProps) : className,
  );

  const resolvedChildren = typeof children === "function" ? children(renderProps) : children;

  return (
    <InertiaLink
      ref={ref}
      aria-current={isCurrent ? "page" : undefined}
      aria-disabled={isDisabled || undefined}
      {...(interactionProps as Record<string, unknown>)}
      data-hovered={isHovered ? "" : undefined}
      data-pressed={isPressed ? "" : undefined}
      data-focused={isFocused ? "" : undefined}
      data-focus-visible={isFocusVisible ? "" : undefined}
      data-disabled={isDisabled ? "" : undefined}
      data-current={isCurrent ? "" : undefined}
      {...props}
      className={resolvedClassName}>
      {resolvedChildren}
    </InertiaLink>
  );
}
