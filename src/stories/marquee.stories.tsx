import type { Meta, StoryObj } from "@storybook/react-vite";
import { Marquee } from "@/components/ui/marquee";

const items = ["React", "TypeScript", "Bun", "Tailwind", "Storybook"];

const meta = {
  title: "UI/Marquee",
  component: Marquee,
  tags: ["autodocs"],
  args: {
    className: "max-w-xl",
    children: items.map((item) => (
      <span key={item} className="rounded-md border bg-secondary px-4 py-2 text-sm">
        {item}
      </span>
    )),
  },
} satisfies Meta<typeof Marquee>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Reverse: Story = {
  args: { reverse: true },
};

export const PauseOnHover: Story = {
  args: { pauseOnHover: true },
};
