import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const meta = {
  title: "UI/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
  args: {
    "aria-label": "Text alignment",
    selectionMode: "single",
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem id="left">Left</ToggleGroupItem>
      <ToggleGroupItem id="center">Center</ToggleGroupItem>
      <ToggleGroupItem id="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
} satisfies Meta<typeof ToggleGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Multiple: Story = {
  args: {
    "aria-label": "Text formatting",
    selectionMode: "multiple",
    defaultSelectedKeys: ["bold"],
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem id="bold">Bold</ToggleGroupItem>
      <ToggleGroupItem id="italic">Italic</ToggleGroupItem>
      <ToggleGroupItem id="underline">Underline</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Selecting: Story = {
  args: {
    onSelectionChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("Center"));
    await expect(args.onSelectionChange).toHaveBeenCalled();
  },
};
