import type { Meta, StoryObj } from "@storybook/react-vite";
import { SvgHtmlRender } from "@/components/composite/render/svg-html-render";

const meta = {
  title: "Composite/SvgHtmlRender",
  component: SvgHtmlRender,
  tags: ["autodocs"],
  args: {
    svgHtml:
      '<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v8M8 12h8" /></svg>',
  },
} satisfies Meta<typeof SvgHtmlRender>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithClassName: Story = {
  args: {
    className: "text-blue-500",
  },
};

export const Html: Story = {
  args: {
    svgHtml: "<div><strong>Hello</strong> <em>world</em></div>",
  },
};
