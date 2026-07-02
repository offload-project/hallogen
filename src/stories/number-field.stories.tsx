import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Label } from "@/components/ui/field";
import { NumberField, NumberInput } from "@/components/ui/number-field";

const meta: Meta<typeof NumberField> = {
  title: "UI/NumberField",
  component: NumberField,
  tags: ["autodocs"],
  args: {
    "aria-label": "Quantity",
    defaultValue: 5,
    children: <NumberInput />,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 260 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    "aria-label": undefined,
    children: (
      <>
        <Label>Quantity</Label>
        <NumberInput />
      </>
    ),
  },
};

export const Disabled: Story = {
  args: { isDisabled: true },
};

export const Increment: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvasElement.querySelector("input") as HTMLInputElement;
    const before = input.value;
    const buttons = canvas.getAllByRole("button");
    const stepper = buttons.at(-1);
    if (!stepper) throw new Error("Expected stepper buttons");
    await userEvent.click(stepper);
    await expect(input.value).not.toBe(before);
  },
};
