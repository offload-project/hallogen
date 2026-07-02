import type { Meta, StoryObj } from "@storybook/react-vite";
import { ColorWheel } from "@/components/ui/color-wheel";

const meta = {
  title: "UI/ColorWheel",
  component: ColorWheel,
  tags: ["autodocs"],
  args: {
    "aria-label": "Hue",
    defaultValue: "hsl(30, 100%, 50%)",
  },
} satisfies Meta<typeof ColorWheel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { isDisabled: true },
};
