import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { ColorField } from "@/components/ui/color-field";
import { Label } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const meta = {
  title: "UI/ColorField",
  component: ColorField,
  tags: ["autodocs"],
  args: {
    "aria-label": "Brand color",
    defaultValue: "#5100FF",
    children: <Input placeholder="#000000" />,
  },
} satisfies Meta<typeof ColorField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    "aria-label": undefined,
    children: (
      <>
        <Label>Accent color</Label>
        <Input placeholder="#000000" />
      </>
    ),
  },
};

export const Disabled: Story = {
  args: { isDisabled: true },
};

export const Typing: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Brand color" });
    await userEvent.clear(input);
    await userEvent.type(input, "#00FF00");
    await expect(input).toHaveValue("#00FF00");
  },
};
