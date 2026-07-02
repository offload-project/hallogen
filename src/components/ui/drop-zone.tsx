import { DropZone as DropPrimitiveZone, type DropZoneProps } from "react-aria-components/DropZone";
import { cx } from "@/lib/primitive";

export function DropZone({ className, ...props }: DropZoneProps) {
  return (
    <DropPrimitiveZone
      className={cx(
        "group/drop-zone relative z-10 flex max-h-56 items-center justify-center overflow-hidden rounded-lg border border-dashed p-6",
        "drop-target:border-primary drop-target:border-solid drop-target:bg-primary-subtle drop-target:ring-3 drop-target:ring-ring/20",
        className,
      )}
      {...props}
    />
  );
}
