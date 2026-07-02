import type { Meta, StoryObj } from "@storybook/react-vite";
import { toast } from "sonner";
import { expect, userEvent, within } from "storybook/test";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";

const meta = {
  title: "UI/Toast",
  component: Toast,
  tags: ["autodocs"],
  render: (args) => (
    <>
      <Button onPress={() => toast.success("Saved successfully!")}>Show toast</Button>
      <Toast {...args} />
    </>
  ),
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Triggers: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Show toast" }));
    // Sonner renders toasts in a portal on document.body.
    const body = within(document.body);
    await expect(await body.findByText("Saved successfully!")).toBeInTheDocument();
  },
};
