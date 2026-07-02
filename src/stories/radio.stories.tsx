import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Radio, RadioField, RadioGroup } from "@/components/ui/radio";

const meta = {
  title: "UI/Radio",
  component: RadioGroup,
  tags: ["autodocs"],
  args: {
    "aria-label": "Subscription plan",
    children: (
      <>
        <RadioField value="free">
          <Radio>Free</Radio>
        </RadioField>
        <RadioField value="pro">
          <Radio>Pro</Radio>
        </RadioField>
        <RadioField value="enterprise">
          <Radio>Enterprise</Radio>
        </RadioField>
      </>
    ),
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDefault: Story = {
  args: { defaultValue: "pro" },
};

export const Disabled: Story = {
  args: { isDisabled: true },
};

export const Select: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pro = canvas.getByRole("radio", { name: "Pro" });
    await userEvent.click(pro);
    await expect(pro).toBeChecked();
  },
};
