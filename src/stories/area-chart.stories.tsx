import type { Meta, StoryObj } from "@storybook/react-vite";
import { AreaChart } from "@/components/ui/area-chart";

const data = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 173, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 264, mobile: 140 },
];

const config = {
  desktop: { label: "Desktop", color: "chart-1" },
  mobile: { label: "Mobile", color: "chart-2" },
};

const meta = {
  title: "UI/AreaChart",
  component: AreaChart,
  tags: ["autodocs"],
  args: {
    data,
    dataKey: "month",
    config,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 640, height: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AreaChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Stacked: Story = {
  args: { type: "stacked" },
};

export const SolidFill: Story = {
  args: { fillType: "solid" },
};
