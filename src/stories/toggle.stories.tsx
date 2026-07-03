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

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle {...args} variant="outline">
        Outline
      </Toggle>
      <Toggle {...args} variant="plain">
        Plain
      </Toggle>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle {...args} size="xs">
        xs
      </Toggle>
      <Toggle {...args} size="sm">
        sm
      </Toggle>
      <Toggle {...args} size="md">
        md
      </Toggle>
      <Toggle {...args} size="lg">
        lg
      </Toggle>
    </div>
  ),
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
