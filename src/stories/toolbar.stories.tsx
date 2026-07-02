import type { Meta, StoryObj } from "@storybook/react-vite";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import { Toolbar, ToolbarGroup, ToolbarItem, ToolbarSeparator } from "@/components/ui/toolbar";

const meta = {
  title: "UI/Toolbar",
  component: Toolbar,
  tags: ["autodocs"],
  args: {
    "aria-label": "Text formatting",
  },
} satisfies Meta<typeof Toolbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <ToolbarGroup aria-label="Style">
        <ToolbarItem aria-label="Bold">
          <BoldIcon />
        </ToolbarItem>
        <ToolbarItem aria-label="Italic">
          <ItalicIcon />
        </ToolbarItem>
        <ToolbarItem aria-label="Underline">
          <UnderlineIcon />
        </ToolbarItem>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup aria-label="Actions">
        <ToolbarItem>Save</ToolbarItem>
      </ToolbarGroup>
    </Toolbar>
  ),
};

export const Vertical: Story = {
  render: (args) => (
    <Toolbar {...args} orientation="vertical">
      <ToolbarItem aria-label="Bold">
        <BoldIcon />
      </ToolbarItem>
      <ToolbarItem aria-label="Italic">
        <ItalicIcon />
      </ToolbarItem>
      <ToolbarItem aria-label="Underline">
        <UnderlineIcon />
      </ToolbarItem>
    </Toolbar>
  ),
};
