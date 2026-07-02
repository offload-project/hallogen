import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { MenuItemsRender } from "@/components/composite/render/menu-items-render";
import { Menu, MenuContent, MenuTrigger } from "@/components/ui/menu";
import type { NavItem } from "@/types";

const dashboardItem: NavItem = { id: "dashboard", type: "link", label: "Dashboard", href: "#", isActive: true };

const items: NavItem[] = [
  dashboardItem,
  { id: "projects", type: "link", label: "Projects", href: "#", isActive: false },
  { id: "sep", type: "separator" },
  { id: "settings", type: "link", label: "Settings", href: "#", isActive: false },
];

const meta = {
  title: "Composite/MenuItemsRender",
  component: MenuItemsRender,
  tags: ["autodocs"],
  args: { item: dashboardItem },
} satisfies Meta<typeof MenuItemsRender>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>Open menu</MenuTrigger>
      <MenuContent>
        {items.map((item) => (
          <MenuItemsRender key={item.id} item={item} />
        ))}
      </MenuContent>
    </Menu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Open menu" }));
    const menu = within(document.body);
    await expect(await menu.findByText("Dashboard")).toBeInTheDocument();
  },
};
