import type { Meta, StoryObj } from "@storybook/react-vite";
import { BarChart } from "@/components/ui/bar-chart";

const data = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 173, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
];

const config = {
  desktop: { label: "Desktop", color: "chart-1" },
  mobile: { label: "Mobile", color: "chart-2" },
};

const meta = {
  title: "UI/BarChart",
  component: BarChart,
  tags: ["autodocs"],
  args: {
    data,
    dataKey: "month",
    config,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BarChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Stacked: Story = {
  args: { type: "stacked" },
};

export const Vertical: Story = {
  args: { layout: "vertical" },
};
