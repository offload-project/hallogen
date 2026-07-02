import { useCallback, useRef, useState } from "react";

export function useClipboard(resetDelay: number = 2000): {
  copied: boolean;
  copy: (value: string) => Promise<boolean>;
} {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function copiedfunc() {
    setCopied(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setCopied(false), resetDelay);
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: markCopied would trigger unnecessary rerenders
  const copy = useCallback(
    async (value: string): Promise<boolean> => {
      if (!window.isSecureContext || !navigator?.clipboard?.writeText) {
        return false;
      }

      try {
        await navigator.clipboard.writeText(value);
        copiedfunc();
        return true;
      } catch {
        return false;
      }
    },
    [resetDelay],
  );

  return { copied, copy };
}
