import type { Meta, StoryObj } from "@storybook/react-vite";
import { DateRangePicker, DateRangePickerTrigger } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/field";

const meta = {
  title: "UI/DateRangePicker",
  component: DateRangePicker,
  tags: ["autodocs"],
  args: {
    children: (
      <>
        <Label>Trip dates</Label>
        <DateRangePickerTrigger />
      </>
    ),
  },
} satisfies Meta<typeof DateRangePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { isDisabled: true },
};
