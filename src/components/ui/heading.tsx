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
        "text-balance font-display font-medium text-fg tracking-tight",
        level === 1 && "text-3xl sm:text-4xl",
        level === 2 && "text-2xl sm:text-3xl",
        level === 3 && "text-xl sm:text-2xl",
        level === 4 && "text-xl",
        className,
      )}
      {...props}
    />
  );
};

export type { HeadingProps };
export { Heading };
