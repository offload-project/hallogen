import type { Meta, StoryObj } from "@storybook/react-vite";
import { Snippet, SnippetTab, SnippetTabPanel, SnippetTabPanels, SnippetTabsList } from "@/components/ui/snippet";

const meta = {
  title: "UI/Snippet",
  component: Snippet,
  tags: ["autodocs"],
  args: {
    className: "max-w-md",
  },
  render: (args) => (
    <Snippet {...args}>
      <SnippetTabsList aria-label="Package manager">
        <SnippetTab id="bun">bun</SnippetTab>
        <SnippetTab id="npm">npm</SnippetTab>
        <SnippetTab id="pnpm">pnpm</SnippetTab>
      </SnippetTabsList>
      <SnippetTabPanels>
        <SnippetTabPanel id="bun">bun add @acme/ui</SnippetTabPanel>
        <SnippetTabPanel id="npm">npm install @acme/ui</SnippetTabPanel>
        <SnippetTabPanel id="pnpm">pnpm add @acme/ui</SnippetTabPanel>
      </SnippetTabPanels>
    </Snippet>
  ),
} satisfies Meta<typeof Snippet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
