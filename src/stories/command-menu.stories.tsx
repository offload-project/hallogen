import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { CommandMenu, CommandMenuItem, CommandMenuList, CommandMenuSearch } from "@/components/ui/command-menu";

const meta = {
  title: "UI/CommandMenu",
  component: CommandMenu,
  tags: ["autodocs"],
  args: {
    "aria-label": "Command Menu",
    isOpen: true,
    children: (
      <>
        <CommandMenuSearch placeholder="Search commands..." />
        <CommandMenuList>
          <CommandMenuItem>Profile</CommandMenuItem>
          <CommandMenuItem>Settings</CommandMenuItem>
          <CommandMenuItem>Billing</CommandMenuItem>
          <CommandMenuItem>Log out</CommandMenuItem>
        </CommandMenuList>
      </>
    ),
  },
} satisfies Meta<typeof CommandMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filtering: Story = {
  play: async () => {
    // The command menu renders in a portal, so query the whole document.
    const body = within(document.body);
    const input = await body.findByPlaceholderText("Search commands...");
    await userEvent.type(input, "prof");
    await expect(await body.findByText("Profile")).toBeInTheDocument();
  },
};
