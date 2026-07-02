import type { Meta, StoryObj } from "@storybook/react-vite";
import { ColorSwatch } from "@/components/ui/color-swatch";

const meta = {
  title: "UI/ColorSwatch",
  component: ColorSwatch,
  tags: ["autodocs"],
  args: {
    color: "#f43f5e",
    "aria-label": "Rose",
  },
} satisfies Meta<typeof ColorSwatch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Blue: Story = {
  args: { color: "#3b82f6", "aria-label": "Blue" },
};

export const Translucent: Story = {
  args: { color: "rgba(16, 185, 129, 0.5)", "aria-label": "Emerald 50%" },
};
