import type { Meta, StoryObj } from "@storybook/react-vite";
import { Keyboard } from "@/components/ui/keyboard";

const meta = {
  title: "UI/Keyboard",
  component: Keyboard,
  tags: ["autodocs"],
  args: {
    children: "⌘K",
  },
} satisfies Meta<typeof Keyboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Combination: Story = {
  args: { children: "⌃⇧P" },
};
