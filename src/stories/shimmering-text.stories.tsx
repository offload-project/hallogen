import type { Meta, StoryObj } from "@storybook/react-vite";
import { ShimmeringText } from "@/components/ui/shimmering-text";

const meta = {
  title: "UI/ShimmeringText",
  component: ShimmeringText,
  tags: ["autodocs"],
  args: {
    text: "Shimmering text effect",
  },
} satisfies Meta<typeof ShimmeringText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomColors: Story = {
  args: {
    text: "Custom shimmer colors",
    color: "var(--color-muted-fg)",
    shimmerColor: "var(--color-primary)",
    startOnView: false,
  },
};
