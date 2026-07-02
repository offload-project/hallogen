import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Slider, SliderOutput, SliderThumb, SliderTrack } from "@/components/ui/slider";

const meta = {
  title: "UI/Slider",
  component: Slider,
  tags: ["autodocs"],
  args: {
    "aria-label": "Volume",
    defaultValue: 40,
    children: null,
  },
  render: (args) => (
    <div className="w-80">
      <Slider {...args}>
        <SliderOutput />
        <SliderTrack>
          <SliderThumb />
        </SliderTrack>
      </Slider>
    </div>
  ),
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Range: Story = {
  args: { defaultValue: [20, 70], "aria-label": "Price range" },
};

export const Present: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("slider")).toBeInTheDocument();
  },
};
