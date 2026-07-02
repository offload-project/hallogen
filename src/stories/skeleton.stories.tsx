import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "@/components/ui/skeleton";

const meta = {
  title: "UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  args: {
    isLoading: true,
    className: "w-72",
  },
  render: (args) => (
    <Skeleton {...args}>
      <div>
        <div>
          <div className="space-y-3">
            <p className="font-semibold text-lg">Loading title placeholder</p>
            <p>Some placeholder body text that will be masked while loading.</p>
            <p>Another line of placeholder content.</p>
          </div>
        </div>
      </div>
    </Skeleton>
  ),
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loaded: Story = {
  args: { isLoading: false },
};
