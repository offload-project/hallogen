import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "@/components/ui/badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "Badge",
    variant: "primary",
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Success: Story = {
  args: { variant: "success", children: "Success" },
};

export const Danger: Story = {
  args: { variant: "danger", children: "Danger" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "Outline" },
};
