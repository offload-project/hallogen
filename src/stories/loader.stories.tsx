import type { Meta, StoryObj } from "@storybook/react-vite";
import { Loader } from "@/components/ui/loader";

const meta = {
  title: "UI/Loader",
  component: Loader,
  tags: ["autodocs"],
  args: {
    "aria-label": "Loading",
    variant: "spin",
    className: "size-8",
  },
} satisfies Meta<typeof Loader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Ring: Story = {
  args: { variant: "ring" },
};
