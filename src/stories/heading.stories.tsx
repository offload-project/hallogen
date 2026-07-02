import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading } from "@/components/ui/heading";

const meta = {
  title: "UI/Heading",
  component: Heading,
  tags: ["autodocs"],
  args: {
    children: "The quick brown fox",
    level: 1,
  },
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Level2: Story = {
  args: { level: 2, children: "Heading level 2" },
};

export const Level3: Story = {
  args: { level: 3, children: "Heading level 3" },
};

export const Level4: Story = {
  args: { level: 4, children: "Heading level 4" },
};
