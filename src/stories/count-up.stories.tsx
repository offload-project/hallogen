import type { Meta, StoryObj } from "@storybook/react-vite";
import { CountUp } from "@/components/ui/count-up";

const meta = {
  title: "UI/CountUp",
  component: CountUp,
  tags: ["autodocs"],
  args: {
    end: 1200,
    className: "font-semibold text-3xl tabular-nums",
  },
} satisfies Meta<typeof CountUp>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSeparator: Story = {
  args: { end: 1250000, separator: "," },
};

export const Decimal: Story = {
  args: { end: 98.6, precision: 1 },
};
