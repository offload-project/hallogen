import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bar, BarChart as BarChartPrimitive } from "recharts";
import { CartesianGrid, Chart, ChartTooltip, ChartTooltipContent, XAxis, YAxis } from "@/components/ui/chart";

const data = [
  { month: "Jan", revenue: 186 },
  { month: "Feb", revenue: 305 },
  { month: "Mar", revenue: 237 },
  { month: "Apr", revenue: 173 },
  { month: "May", revenue: 209 },
  { month: "Jun", revenue: 214 },
];

const config = {
  revenue: { label: "Revenue", color: "chart-1" },
};

const meta = {
  title: "UI/Chart",
  component: Chart,
  tags: ["autodocs"],
  args: {
    config,
    data,
    dataKey: "month",
    children: <div />,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Chart {...args}>
      <BarChartPrimitive data={data}>
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="revenue" fill="var(--chart-1)" radius={4} />
      </BarChartPrimitive>
    </Chart>
  ),
} satisfies Meta<typeof Chart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
