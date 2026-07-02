import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressCircle } from "@/components/ui/progress-circle";

const meta = {
  title: "UI/ProgressCircle",
  component: ProgressCircle,
  tags: ["autodocs"],
  args: {
    "aria-label": "Loading",
    value: 60,
    className: "size-10 text-primary",
  },
} satisfies Meta<typeof ProgressCircle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Complete: Story = {
  args: { value: 100 },
};

export const Indeterminate: Story = {
  args: { isIndeterminate: true },
};
