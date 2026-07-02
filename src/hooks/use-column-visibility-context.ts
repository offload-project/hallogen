import { useCallback, useEffect, useState } from "react";
import type { Key } from "react-aria-components";
import type { ColumnDef } from "@/types";

const STORAGE_PREFIX = "column-visibility:";

function readHiddenColumns(storageKey: string): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

/**
 * Track which optional table columns are visible, persisted to localStorage per
 * `storageKey`. The *hidden* set is stored (not the visible one) so columns added
 * to the table later still default to visible. To stay consistent with the
 * server-rendered markup, the first render shows all columns and stored
 * preferences are applied after mount.
 */
export function useColumnVisibility(storageKey: string, columns: ColumnDef[]) {
  const key = `${STORAGE_PREFIX}${storageKey}`;
  const [visible, setVisibleState] = useState<Set<Key>>(() => new Set(columns.map((column) => column.id)));

  useEffect(() => {
    const hidden = new Set(readHiddenColumns(key));
    if (hidden.size === 0) {
      return;
    }
    setVisibleState(new Set(columns.filter((column) => !hidden.has(column.id)).map((column) => column.id)));
  }, [key, columns]);

  const setVisible = useCallback(
    (next: Set<Key>) => {
      setVisibleState(next);

      if (typeof window === "undefined") {
        return;
      }

      try {
        const hidden = columns.filter((column) => !next.has(column.id)).map((column) => column.id);
        window.localStorage.setItem(key, JSON.stringify(hidden));
      } catch {
        // Ignore write failures (e.g. storage disabled or quota exceeded).
      }
    },
    [key, columns],
  );

  return {
    visible,
    setVisible,
    isVisible: (id: string) => visible.has(id),
  };
}
