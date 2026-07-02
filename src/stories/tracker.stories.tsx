import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tracker } from "@/components/ui/tracker";

const data = Array.from({ length: 30 }, (_, i) => {
  const roll = (i * 7) % 10;
  const color = roll < 7 ? "bg-green-500" : roll < 9 ? "bg-yellow-500" : "bg-red-500";
  return {
    key: i,
    color,
    tooltip: roll < 7 ? "Operational" : roll < 9 ? "Degraded" : "Downtime",
  };
});

const meta: Meta<typeof Tracker> = {
  title: "UI/Tracker",
  component: Tracker,
  tags: ["autodocs"],
  args: {
    data,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutTooltips: Story = {
  args: { disabledTooltip: true },
};
