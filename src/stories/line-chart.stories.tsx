import type { Meta, StoryObj } from "@storybook/react-vite";
import { LineChart } from "@/components/ui/line-chart";

const data = [
  { month: "Jan", revenue: 4200, expenses: 2400 },
  { month: "Feb", revenue: 3800, expenses: 2210 },
  { month: "Mar", revenue: 5100, expenses: 2290 },
  { month: "Apr", revenue: 4780, expenses: 3000 },
  { month: "May", revenue: 6300, expenses: 3181 },
  { month: "Jun", revenue: 5900, expenses: 2500 },
];

const config = {
  revenue: { label: "Revenue", color: "chart-1" },
  expenses: { label: "Expenses", color: "chart-2" },
};

const meta = {
  title: "UI/LineChart",
  component: LineChart,
  tags: ["autodocs"],
  args: {
    data,
    dataKey: "month",
    config,
  },
  render: (args) => (
    <div className="h-72 w-[36rem]">
      <LineChart {...args} />
    </div>
  ),
} satisfies Meta<typeof LineChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleSeries: Story = {
  args: {
    config: { revenue: { label: "Revenue", color: "chart-1" } },
  },
};
