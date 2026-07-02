import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScrollArea } from "@/components/ui/scroll-area";

const meta = {
  title: "UI/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  render: (args) => (
    <div className="h-64 w-72 rounded-lg border">
      <ScrollArea {...args}>
        <div className="space-y-2 p-4">
          {Array.from({ length: 40 }, (_, i) => (
            <p key={i} className="text-sm">
              Line item {i + 1}
            </p>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
} satisfies Meta<typeof ScrollArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithScrollFade: Story = {
  args: { scrollFade: true, orientation: "vertical" },
};
