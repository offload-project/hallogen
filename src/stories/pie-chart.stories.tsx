import type { Meta, StoryObj } from "@storybook/react-vite";
import { PieChart } from "@/components/ui/pie-chart";

const data = [
  { name: "Chrome", visitors: 275 },
  { name: "Safari", visitors: 200 },
  { name: "Firefox", visitors: 187 },
  { name: "Edge", visitors: 173 },
  { name: "Other", visitors: 90 },
];

const config = {
  Chrome: { label: "Chrome", color: "chart-1" },
  Safari: { label: "Safari", color: "chart-2" },
  Firefox: { label: "Firefox", color: "chart-3" },
  Edge: { label: "Edge", color: "chart-4" },
  Other: { label: "Other", color: "chart-5" },
};

const meta = {
  title: "UI/PieChart",
  component: PieChart,
  tags: ["autodocs"],
  args: {
    data,
    dataKey: "visitors",
    nameKey: "name",
    config,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PieChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Donut: Story = {
  args: { variant: "donut", showLabel: true, label: "925" },
};
