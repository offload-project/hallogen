import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Toggle } from "@/components/ui/toggle";

const meta = {
  title: "UI/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  args: {
    children: "Toggle",
  },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: { defaultSelected: true },
};

export const Outline: Story = {
  args: { variant: "outline" },
};

export const Disabled: Story = {
  args: { isDisabled: true },
};

export const Pressing: Story = {
  args: { onPress: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Toggle" }));
    await expect(args.onPress).toHaveBeenCalledTimes(1);
  },
};
