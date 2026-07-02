import type { Meta, StoryObj } from "@storybook/react-vite";
import { ColorArea } from "react-aria-components/ColorArea";
import { ColorThumb } from "@/components/ui/color-thumb";

const meta = {
  title: "UI/ColorThumb",
  component: ColorThumb,
  tags: ["autodocs"],
} satisfies Meta<typeof ColorThumb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <ColorArea
        aria-label="Color picker"
        defaultValue="hsl(210, 100%, 50%)"
        xChannel="saturation"
        yChannel="lightness"
        className="size-56 rounded-md bg-muted">
        <Story />
      </ColorArea>
    ),
  ],
};

export const Disabled: Story = {
  decorators: [
    (Story) => (
      <ColorArea
        aria-label="Color picker"
        defaultValue="hsl(210, 100%, 50%)"
        xChannel="saturation"
        yChannel="lightness"
        isDisabled
        className="size-56 rounded-md bg-muted">
        <Story />
      </ColorArea>
    ),
  ],
};
