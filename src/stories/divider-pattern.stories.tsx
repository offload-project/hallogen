import type { Meta, StoryObj } from "@storybook/react-vite";
import { DividerPattern } from "@/components/ui/divider-pattern";

const meta = {
  title: "UI/DividerPattern",
  component: DividerPattern,
  tags: ["autodocs"],
  render: (args) => (
    <div className="relative flex h-40 w-full items-center justify-center rounded-lg border">
      <DividerPattern {...args} />
      <span className="relative text-muted-fg text-sm">Content over pattern</span>
    </div>
  ),
} satisfies Meta<typeof DividerPattern>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LeftDirection: Story = {
  args: { direction: "left" },
};

export const CenterMask: Story = {
  args: { mask: "center" },
};
