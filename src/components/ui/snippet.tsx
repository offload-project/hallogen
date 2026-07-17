import { ClipboardCheckIcon, CopyIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { useSlottedContext } from "react-aria-components/slots";
import { type TabPanelProps, TabsContext, type TabsProps } from "react-aria-components/Tabs";
import { Button } from "@/components/ui/button";
import { Tab, TabList, type TabListProps, TabPanel, TabPanels, Tabs } from "@/components/ui/tabs";
import { useClipboard } from "@/hooks/use-clipboard";
import { cx } from "@/lib/primitive";

export const Snippet = ({ className, ...props }: TabsProps) => (
  <Tabs className={cx("not-prose group w-full gap-0 overflow-hidden rounded-md border bg-bg", className)} {...props} />
);

export function SnippetTabsList<T extends object>({ className, ...props }: TabListProps<T>) {
  const { orientation } = useSlottedContext(TabsContext)!;
  return (
    <TabList
      className={cx(
        orientation === "horizontal" &&
          "flex-row gap-x-(--tab-list-gutter) rounded-(--tab-list-rounded) border-b px-4 py-(--tab-list-gutter)",
        "bg-muted",
        className,
      )}
      {...props}
    />
  );
}

export const SnippetTab = ({ className, ...props }: ComponentProps<typeof Tab>) => (
  <Tab className={cx("gap-1.5", className)} {...props} />
);

export const SnippetTabPanels = TabPanels;

export function SnippetTabPanel({ className, children, ...props }: TabPanelProps) {
  const [copied, copy] = useClipboard();
  return (
    <TabPanel className={cx("mt-0 px-4 py-2 text-sm dark:bg-secondary/70", className)} {...props}>
      {(values) => (
        <>
          {typeof children === "function" ? (
            <pre className="truncate">{children(values)}</pre>
          ) : (
            <div className="flex items-center justify-between">
              <pre className="truncate">{children}</pre>
              <Button
                className="-me-2"
                size="sq-sm"
                variant="plain"
                onPress={() => {
                  copy(children as string);
                }}>
                {copied ? (
                  <>
                    <ClipboardCheckIcon />
                    <span className="sr-only">Copied</span>
                  </>
                ) : (
                  <>
                    <CopyIcon />
                    <span className="sr-only">Copy to clipboard</span>
                  </>
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </TabPanel>
  );
}
