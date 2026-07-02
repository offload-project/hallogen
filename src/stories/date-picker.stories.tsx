import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { DatePicker, DatePickerTrigger } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/field";

const meta = {
  title: "UI/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  args: {
    children: (
      <>
        <Label>Event date</Label>
        <DatePickerTrigger />
      </>
    ),
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { isDisabled: true },
};

export const Opens: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /calendar/i });
    await userEvent.click(trigger);
    const body = within(document.body);
    await expect(await body.findByRole("grid")).toBeInTheDocument();
  },
};
