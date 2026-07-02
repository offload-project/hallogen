import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { ListBox, ListBoxItem } from "@/components/ui/list-box";

const meta = {
  title: "UI/ListBox",
  component: ListBox,
  tags: ["autodocs"],
  args: {
    "aria-label": "Favorite animal",
    selectionMode: "single",
  },
  render: (args) => (
    <ListBox {...args}>
      <ListBoxItem id="cat">Cat</ListBoxItem>
      <ListBoxItem id="dog">Dog</ListBoxItem>
      <ListBoxItem id="otter">Otter</ListBoxItem>
      <ListBoxItem id="panda">Panda</ListBoxItem>
    </ListBox>
  ),
} satisfies Meta<typeof ListBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MultipleSelection: Story = {
  args: { selectionMode: "multiple" },
};

export const Selects: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const option = canvas.getByRole("option", { name: "Otter" });
    await userEvent.click(option);
    await expect(option).toHaveAttribute("aria-selected", "true");
  },
};
