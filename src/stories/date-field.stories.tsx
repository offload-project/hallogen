import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { DateField, DateInput } from "@/components/ui/date-field";

const meta = {
  title: "UI/DateField",
  component: DateField,
  tags: ["autodocs"],
  args: {
    "aria-label": "Event date",
  },
  render: (args) => (
    <DateField {...args}>
      <DateInput />
    </DateField>
  ),
} satisfies Meta<typeof DateField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { isDisabled: true },
};

export const Typing: Story = {
  args: { onChange: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const [firstSegment] = canvas.getAllByRole("spinbutton");
    if (!firstSegment) throw new Error("Expected at least one date segment");
    await userEvent.click(firstSegment);
    await userEvent.keyboard("12252024");
    await expect(args.onChange).toHaveBeenCalled();
  },
};
