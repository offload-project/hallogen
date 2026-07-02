import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { ShowMore } from "@/components/ui/show-more";

const meta = {
  title: "UI/ShowMore",
  component: ShowMore,
  tags: ["autodocs"],
  args: {
    children: "Show more",
  },
} satisfies Meta<typeof ShowMore>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AsText: Story = {
  args: { as: "text", text: "No more items" },
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  decorators: [
    (Story) => (
      <div style={{ height: 120, display: "flex" }}>
        <Story />
      </div>
    ),
  ],
};

export const Toggling: Story = {
  args: { onChange: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Show more" }));
    await expect(args.onChange).toHaveBeenCalledTimes(1);
  },
};
