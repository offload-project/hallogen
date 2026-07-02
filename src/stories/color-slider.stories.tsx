import type { Meta, StoryObj } from "@storybook/react-vite";
import { ColorSlider, ColorSliderOutput, ColorSliderTrack } from "@/components/ui/color-slider";
import { ColorThumb } from "@/components/ui/color-thumb";
import { Label } from "@/components/ui/field";

const meta = {
  title: "UI/ColorSlider",
  component: ColorSlider,
  tags: ["autodocs"],
  args: {
    defaultValue: "hsl(0, 100%, 50%)",
    channel: "hue",
    colorSpace: "hsl",
  },
  render: (args) => (
    <div className="max-w-sm">
      <ColorSlider {...args}>
        <Label>Hue</Label>
        <ColorSliderOutput />
        <ColorSliderTrack>
          <ColorThumb />
        </ColorSliderTrack>
      </ColorSlider>
    </div>
  ),
} satisfies Meta<typeof ColorSlider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { isDisabled: true },
};
