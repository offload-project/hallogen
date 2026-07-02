import type { Meta, StoryObj } from "@storybook/react-vite";
import { CodeBlock, CodeBlockCopyButton } from "@/components/ui/code-block";

const sample = `function greet(name: string) {
  return \`Hello, \${name}!\`;
}

console.log(greet("world"));`;

const meta = {
  title: "UI/CodeBlock",
  component: CodeBlock,
  tags: ["autodocs"],
  args: {
    code: sample,
    language: "tsx",
  },
} satisfies Meta<typeof CodeBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLineNumbers: Story = {
  args: { showLineNumbers: true },
};

export const WithCopyButton: Story = {
  args: {
    children: <CodeBlockCopyButton />,
  },
};
