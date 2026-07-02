import type { Meta, StoryObj } from "@storybook/react-vite";
import { ColorArea } from "@/components/ui/color-area";
import { ColorField } from "@/components/ui/color-field";
import { ColorPicker, EyeDropper } from "@/components/ui/color-picker";

const meta = {
  title: "UI/ColorPicker",
  component: ColorPicker,
  tags: ["autodocs"],
  args: {
    defaultValue: "hsl(210, 100%, 50%)",
    children: (
      <div className="flex flex-col gap-3">
        <ColorArea xChannel="saturation" yChannel="lightness" />
        <div className="flex items-end gap-2">
          <ColorField aria-label="Hex color" />
          <EyeDropper />
        </div>
      </div>
    ),
  },
} satisfies Meta<typeof ColorPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FieldOnly: Story = {
  args: {
    defaultValue: "#7c3aed",
    children: <ColorField aria-label="Brand color" />,
  },
};
