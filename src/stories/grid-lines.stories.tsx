import type { Meta, StoryObj } from "@storybook/react-vite";
import { GridLines } from "@/components/ui/grid-lines";

const meta: Meta<typeof GridLines> = {
  title: "UI/GridLines",
  component: GridLines,
  tags: ["autodocs"],
  args: {},
  decorators: [
    (Story) => (
      <div className="relative h-64 w-full overflow-hidden rounded-lg border">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoMask: Story = {
  args: { mask: "none" },
};

export const BottomLeftMask: Story = {
  args: { mask: "bottom_left" },
};
