import type { Meta, StoryObj } from "@storybook/react-vite";
import { Noise } from "@/components/ui/noise";

const meta = {
  title: "UI/Noise",
  component: Noise,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="relative h-64 w-full overflow-hidden rounded-xl bg-primary">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Noise>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Strong: Story = {
  args: { opacity: 0.4, grainSize: 120 },
};
