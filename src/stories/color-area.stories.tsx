import type { Meta, StoryObj } from "@storybook/react-vite";
import { ColorArea } from "@/components/ui/color-area";

const meta = {
  title: "UI/ColorArea",
  component: ColorArea,
  tags: ["autodocs"],
  args: {
    "aria-label": "Color picker",
    defaultValue: "hsl(210, 100%, 50%)",
    xChannel: "saturation",
    yChannel: "lightness",
  },
} satisfies Meta<typeof ColorArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { isDisabled: true },
};
