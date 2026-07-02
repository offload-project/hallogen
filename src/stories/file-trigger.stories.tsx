import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { FileTrigger } from "@/components/ui/file-trigger";

const meta = {
  title: "UI/FileTrigger",
  component: FileTrigger,
  tags: ["autodocs"],
  args: {
    onSelect: fn(),
  },
} satisfies Meta<typeof FileTrigger>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Multiple: Story = {
  args: { allowsMultiple: true },
};

export const Directory: Story = {
  args: { acceptDirectory: true },
};
