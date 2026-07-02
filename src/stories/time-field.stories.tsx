import { Time } from "@internationalized/date";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "@/components/ui/field";
import { TimeField, TimeInput } from "@/components/ui/time-field";

const meta = {
  title: "UI/TimeField",
  component: TimeField,
  tags: ["autodocs"],
  args: {
    "aria-label": "Meeting time",
    children: (
      <>
        <Label>Meeting time</Label>
        <TimeInput />
      </>
    ),
  },
} satisfies Meta<typeof TimeField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    defaultValue: new Time(9, 30),
  },
};

export const Disabled: Story = {
  args: { isDisabled: true },
};
