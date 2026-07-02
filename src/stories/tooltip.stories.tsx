import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const meta = {
  title: "UI/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  args: { children: null },
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent>Helpful hint</TooltipContent>
    </Tooltip>
  ),
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Inverse: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent inverse>Inverse hint</TooltipContent>
    </Tooltip>
  ),
};

export const Hovers: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // react-aria tooltips open immediately on focus (hover has a delay), which is more robust in tests.
    canvas.getByRole("button", { name: "Hover me" }).focus();
    const tooltip = await within(document.body).findByText("Helpful hint");
    await expect(tooltip).toBeInTheDocument();
  },
};
