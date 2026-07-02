import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Checkbox, CheckboxField } from "@/components/ui/checkbox";

const LABEL = "Accept terms and conditions";

const meta = {
  title: "UI/Checkbox",
  component: CheckboxField,
  tags: ["autodocs"],
  args: {
    children: null,
  },
  render: (args) => (
    <CheckboxField {...args}>
      <Checkbox>{LABEL}</Checkbox>
    </CheckboxField>
  ),
} satisfies Meta<typeof CheckboxField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: { defaultSelected: true },
};

export const Indeterminate: Story = {
  args: { isIndeterminate: true },
};

export const Disabled: Story = {
  args: { isDisabled: true },
};

export const Toggles: Story = {
  args: { onChange: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("checkbox", { name: LABEL }));
    await expect(args.onChange).toHaveBeenCalledTimes(1);
    await expect(args.onChange).toHaveBeenLastCalledWith(true);
  },
};
