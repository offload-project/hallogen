import { toast } from "sonner";
import type { ToastMessage } from "@/types";

export function fireToasts(toasts?: ToastMessage[]) {
  if (!toasts?.length) return;

  for (const t of toasts) {
    const options = { description: t.title ? t.message : undefined };
    const message = t.title || t.message;

    switch (t.type) {
      case "success":
        toast.success(message, options);
        break;
      case "error":
        toast.error(message, options);
        break;
      case "info":
        toast.info(message, options);
        break;
      case "warning":
        toast.warning(message, options);
        break;
      default:
        toast(message, options);
    }
  }
}
