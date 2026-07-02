import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "@/components/ui/avatar";

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: {
    src: "https://i.pravatar.cc/150?img=12",
    alt: "Jane Doe",
    size: "lg",
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Initials: Story = {
  args: {
    src: null,
    initials: "JD",
    alt: "Jane Doe",
  },
};

export const Square: Story = {
  args: {
    isSquare: true,
    size: "xl",
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "5xl",
  },
};
