import type { Meta, StoryObj } from "@storybook/react-vite";
import { Link } from "@/components/ui/link";

const meta = {
  title: "UI/Link",
  component: Link,
  tags: ["autodocs"],
  args: {
    href: "#",
    children: "Visit dashboard",
  },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { isDisabled: true, children: "Disabled link" },
};

export const Current: Story = {
  args: { isCurrent: true, children: "Current page" },
};
