import type { Meta, StoryObj } from "@storybook/react-vite";
import { FadeIn } from "@/components/ui/fade-in";

const meta = {
  title: "UI/FadeIn",
  component: FadeIn,
  tags: ["autodocs"],
  args: {
    children: (
      <div className="rounded-lg border p-6">
        <p className="text-fg">This content fades in when scrolled into view.</p>
      </div>
    ),
  },
} satisfies Meta<typeof FadeIn>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
