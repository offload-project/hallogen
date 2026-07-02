import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

const meta = {
  title: "UI/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
  args: { children: null },
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="grid h-32 w-64 place-content-center rounded-lg border border-dashed text-muted-fg text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem id="cut">Cut</ContextMenuItem>
        <ContextMenuItem id="copy">Copy</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem id="delete" variant="danger">
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
} satisfies Meta<typeof ContextMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Opens: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText("Right click here");
    await userEvent.pointer({ keys: "[MouseRight]", target: trigger });
    const item = await within(document.body).findByRole("menuitem", { name: "Copy" });
    await expect(item).toBeInTheDocument();
  },
};
