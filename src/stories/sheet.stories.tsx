import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Button } from "@/components/ui/button";
import { Sheet, SheetBody, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const meta = {
  title: "UI/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  args: { children: null },
  render: (args) => (
    <Sheet {...args}>
      <Button>Open sheet</Button>
      <SheetContent aria-label="Details">
        <SheetHeader>
          <SheetTitle>Panel title</SheetTitle>
          <SheetDescription>A slide-out panel for extra content.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <p>This is the body of the sheet.</p>
        </SheetBody>
      </SheetContent>
    </Sheet>
  ),
} satisfies Meta<typeof Sheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Opens: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Open sheet" }));
    // The dialog renders in a portal on document.body.
    const dialog = within(document.body);
    await expect(await dialog.findByText("Panel title")).toBeInTheDocument();
  },
};
