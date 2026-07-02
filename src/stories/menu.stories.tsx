import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from "@/components/ui/menu";

const meta = {
  title: "UI/Menu",
  component: Menu,
  tags: ["autodocs"],
  args: {
    children: null,
  },
  render: () => (
    <Menu>
      <MenuTrigger>Options</MenuTrigger>
      <MenuContent placement="bottom start">
        <MenuItem id="edit">Edit</MenuItem>
        <MenuItem id="duplicate">Duplicate</MenuItem>
        <MenuSeparator />
        <MenuItem id="delete" variant="danger">
          Delete
        </MenuItem>
      </MenuContent>
    </Menu>
  ),
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Opens: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Options" }));
    const item = await within(document.body).findByRole("menuitem", { name: "Edit" });
    await expect(item).toBeInTheDocument();
  },
};
