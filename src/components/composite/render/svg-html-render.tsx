import { isTag } from "domhandler";
import parse, { type DOMNode } from "html-react-parser";
import { useEffect, useState } from "react";

interface SvgHtmlRenderProps {
  svgHtml: string;
  className?: string;
}

export function SvgHtmlRender({ svgHtml, className }: SvgHtmlRenderProps) {
  // html-react-parser reaches for `document.implementation.createHTMLDocument`
  // whenever a `document` global is detected, which throws under Node/SSR.
  // Defer parsing until after the component mounts on the client so the
  // initial server render matches the initial client render (empty), then
  // upgrade once we know we're in the browser.
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {parse(svgHtml, {
        replace: (node: DOMNode) => {
          if (className && isTag(node) && node.name === "svg") {
            const existing = node.attribs.class ?? "";
            node.attribs.class = existing ? `${existing} ${className}` : className;
          }
        },
      })}
    </>
  );
}
