import type { Meta, StoryObj } from "@storybook/react-vite";
import { DropZone } from "@/components/ui/drop-zone";

const meta = {
  title: "UI/DropZone",
  component: DropZone,
  tags: ["autodocs"],
  args: {
    "aria-label": "Upload files",
    children: <p className="text-muted-fg text-sm">Drag and drop files here</p>,
  },
} satisfies Meta<typeof DropZone>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
