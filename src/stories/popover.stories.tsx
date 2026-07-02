import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

const meta = {
  title: "UI/Popover",
  component: Popover,
  tags: ["autodocs"],
  args: { children: null },
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger>Open popover</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Notifications</PopoverTitle>
          <PopoverDescription>You have 3 unread messages.</PopoverDescription>
        </PopoverHeader>
        <PopoverBody>Review your latest activity in the inbox.</PopoverBody>
      </PopoverContent>
    </Popover>
  ),
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Opens: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Open popover" }));
    const body = within(document.body);
    await expect(await body.findByText("Notifications")).toBeInTheDocument();
  },
};
