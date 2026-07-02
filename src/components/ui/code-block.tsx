import type { Element } from "hast";
import { ClipboardCheckIcon, CopyIcon } from "lucide-react";
import { createContext, type HTMLAttributes, use, useEffect, useRef, useState } from "react";
import { type BundledLanguage, codeToHtml, type ShikiTransformer } from "shiki";
import { twJoin, twMerge } from "tailwind-merge";
import { useClipboard } from "@/hooks/use-clipboard";
import { cx } from "@/lib/primitive";
import { Button, type ButtonProps } from "./button";

interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  code: string;
  language: BundledLanguage;
  showLineNumbers?: boolean;
}

interface CodeBlockContextType {
  code: string;
}

const CodeBlockContext = createContext<CodeBlockContextType>({ code: "" });

const lineNumberTransformer: ShikiTransformer = {
  name: "line-numbers",
  line(node: Element, line: number) {
    node.children.unshift({
      type: "element",
      tagName: "span",
      properties: {
        className: ["inline-block", "min-w-10", "me-4", "text-end", "select-none", "text-muted-fg"],
      },
      children: [{ type: "text", value: String(line) }],
    });
  },
};

export function highlightCode(code: string, language: BundledLanguage, showLineNumbers = false): Promise<string> {
  const transformers: ShikiTransformer[] = showLineNumbers ? [lineNumberTransformer] : [];
  return codeToHtml(code, {
    lang: language,
    themes: { light: "min-light", dark: "poimandres" },
    transformers,
  });
}

export function CodeBlock({ code, language, showLineNumbers = false, className, children, ...props }: CodeBlockProps) {
  const [html, setHtml] = useState("");
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    highlightCode(code, language, showLineNumbers).then((out) => {
      if (mounted.current) setHtml(out);
    });
    return () => {
      mounted.current = false;
    };
  }, [code, language, showLineNumbers]);

  return (
    <CodeBlockContext value={{ code }}>
      <div data-slot="code-block" className="min-h-0 overflow-hidden rounded-xl border bg-secondary p-1 dark:bg-bg">
        <div
          className={twMerge(
            "group relative w-full overflow-hidden rounded-[calc(var(--radius-xl)-(--spacing(1)))] border bg-bg text-fg dark:bg-muted",
            className,
          )}
          {...props}>
          <div className="pointer-events-none absolute end-1 top-1 z-10">
            {children && <div className="pointer-events-auto">{children}</div>}
          </div>

          <div data-slot="code" className="max-h-196 overflow-auto">
            <div
              className={twJoin(
                "min-w-max overflow-x-auto *:[code]:font-mono *:[code]:text-sm *:[pre]:m-0 *:[pre]:px-4 *:[pre]:py-2 *:[pre]:text-sm/8 sm:*:[pre]:px-6 sm:*:[pre]:py-4",
                showLineNumbers &&
                  "*:[pre]:py-2 *:[pre]:ps-0 *:[pre]:pe-4 sm:*:[pre]:py-4 sm:*:[pre]:ps-0 sm:*:[pre]:pe-6",
              )}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </div>
    </CodeBlockContext>
  );
}

export interface CodeBlockCopyButtonProps extends ButtonProps {
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
}

export function CodeBlockCopyButton({
  onCopy,
  onError,
  timeout = 2000,
  children,
  className,
  ...props
}: CodeBlockCopyButtonProps) {
  const { code } = use(CodeBlockContext);
  const { copy, copied } = useClipboard();

  return (
    <Button
      className={cx("rounded-[calc(var(--radius-xl)-(--spacing(2)))] hover:bg-muted-fg/10", className)}
      onPress={async () => {
        try {
          await copy(code);
          onCopy?.();
          setTimeout(() => {}, timeout);
        } catch (error) {
          onError?.(error as Error);
        }
      }}
      variant="plain"
      size="sq-sm"
      {...props}>
      {children ?? (copied ? <ClipboardCheckIcon /> : <CopyIcon />)}
    </Button>
  );
}
