import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { BarList } from "@/components/ui/bar-list";

const data = [
  { name: "Google", value: 4820 },
  { name: "Direct", value: 3210 },
  { name: "Bing", value: 1290 },
  { name: "Twitter", value: 640 },
  { name: "GitHub", value: 210 },
];

const meta = {
  title: "UI/BarList",
  component: BarList,
  tags: ["autodocs"],
  args: {
    data,
    valueFormatter: (value: number) => value.toLocaleString(),
  },
} satisfies Meta<typeof BarList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Ascending: Story = {
  args: { sortOrder: "ascending" },
};

export const Clickable: Story = {
  args: { onValueChange: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Google" }));
    await expect(args.onValueChange).toHaveBeenCalledTimes(1);
  },
};
