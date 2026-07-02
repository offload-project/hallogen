import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Description, Label } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { TextField } from "@/components/ui/text-field";

const meta = {
  title: "UI/TextField",
  component: TextField,
  tags: ["autodocs"],
  render: (args) => (
    <div className="max-w-sm">
      <TextField {...args}>
        <Label>Email address</Label>
        <Input placeholder="you@example.com" />
        <Description>We'll never share your email.</Description>
      </TextField>
    </div>
  ),
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { isDisabled: true },
};

export const Typing: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Email address");
    await userEvent.type(input, "hello@world.com");
    await expect(input).toHaveValue("hello@world.com");
  },
};
