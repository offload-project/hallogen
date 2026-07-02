import type { Meta, StoryObj } from "@storybook/react-vite";
import { ColorSwatch } from "@/components/ui/color-swatch";
import { ColorSwatchPicker, ColorSwatchPickerItem } from "@/components/ui/color-swatch-picker";

const colors = ["#f87171", "#fb923c", "#facc15", "#4ade80", "#60a5fa", "#a78bfa"];

const meta = {
  title: "UI/ColorSwatchPicker",
  component: ColorSwatchPicker,
  tags: ["autodocs"],
  args: {
    "aria-label": "Choose a color",
    defaultValue: colors[0],
  },
  render: (args) => (
    <ColorSwatchPicker {...args}>
      {colors.map((color) => (
        <ColorSwatchPickerItem key={color} color={color}>
          <ColorSwatch />
        </ColorSwatchPickerItem>
      ))}
    </ColorSwatchPicker>
  ),
} satisfies Meta<typeof ColorSwatchPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Preselected: Story = {
  args: { defaultValue: colors[3] },
};
