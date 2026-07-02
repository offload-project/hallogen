import { twMerge } from "tailwind-merge";
import type { HeadingType } from "@/types";

interface HeadingProps extends HeadingType {
  className?: string | undefined;
}

const Heading = ({ className, level = 1, ...props }: HeadingProps) => {
  const Element: `h${typeof level}` = `h${level}`;
  return (
    <Element
      className={twMerge(
        "text-balance font-display font-semibold text-fg tracking-tight",
        level === 1 && "text-xl/8 sm:text-2xl/8",
        level === 2 && "text-lg/6 sm:text-xl/8",
        level === 3 && "text-base/6 sm:text-lg/6",
        level === 4 && "text-base/6",
        className,
      )}
      {...props}
    />
  );
};

export type { HeadingProps };
export { Heading };
