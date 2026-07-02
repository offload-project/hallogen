import type { Meta, StoryObj } from "@storybook/react-vite";
import { Container } from "@/components/ui/container";

const meta = {
  title: "UI/Container",
  component: Container,
  tags: ["autodocs"],
  args: {
    children: (
      <div className="rounded-lg border bg-muted/40 p-6 text-center text-sm/6">
        Centered, max-width constrained content lives here.
      </div>
    ),
  },
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Constrained: Story = {
  args: {
    constrained: true,
  },
};
