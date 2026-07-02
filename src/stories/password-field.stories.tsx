import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Label } from "@/components/ui/field";
import { PasswordField, PasswordInput } from "@/components/ui/password-field";

const meta = {
  title: "UI/PasswordField",
  component: PasswordField,
  tags: ["autodocs"],
  render: (args) => (
    <div className="max-w-sm">
      <PasswordField {...args}>
        <Label>Password</Label>
        <PasswordInput placeholder="Enter your password" />
      </PasswordField>
    </div>
  ),
} satisfies Meta<typeof PasswordField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Typing: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Password");
    await userEvent.type(input, "s3cr3t!");
    await expect(input).toHaveValue("s3cr3t!");
  },
};
