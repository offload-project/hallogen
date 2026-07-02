import { parseDate } from "@internationalized/date";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { RangeCalendar } from "@/components/ui/range-calendar";

const meta = {
  title: "UI/RangeCalendar",
  component: RangeCalendar,
  tags: ["autodocs"],
  args: {
    "aria-label": "Trip dates",
    defaultValue: {
      start: parseDate("2026-07-06"),
      end: parseDate("2026-07-10"),
    },
  },
} satisfies Meta<typeof RangeCalendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TwoMonths: Story = {
  args: {
    visibleDuration: { months: 2 },
  },
};
