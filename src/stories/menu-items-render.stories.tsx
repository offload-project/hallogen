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

// A deep tree: an inline section of links, a collapsible group (submenu), and a
// nested collapsible group (nested submenu) — MenuItemsRender recurses through all.
const menuTree: NavItem[] = [
  {
    id: "main",
    type: "section",
    label: "Main",
    isActive: false,
    collapsible: false,
    collapsed: false,
    children: [
      { id: "m-dashboard", type: "link", label: "Dashboard", href: "#", isActive: false },
      { id: "m-projects", type: "link", label: "Projects", href: "#", isActive: false },
    ],
  },
  {
    id: "reports",
    type: "group",
    label: "Reports",
    isActive: false,
    collapsible: true,
    collapsed: false,
    children: [
      { id: "monthly", type: "link", label: "Monthly", href: "#", isActive: false },
      {
        id: "archive",
        type: "group",
        label: "Archive",
        isActive: false,
        collapsible: true,
        collapsed: false,
        children: [
          { id: "y2024", type: "link", label: "2024", href: "#", isActive: false },
          { id: "y2023", type: "link", label: "2023", href: "#", isActive: false },
        ],
      },
    ],
  },
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

/** Renders a nested menu recursively — section links, a submenu, and a nested submenu. */
export const MultiLevel: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>Open menu</MenuTrigger>
      <MenuContent>
        {menuTree.map((item) => (
          <MenuItemsRender key={item.id} item={item} />
        ))}
      </MenuContent>
    </Menu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);
    await userEvent.click(canvas.getByRole("button", { name: "Open menu" }));
    // Inline section link renders immediately.
    await expect(await body.findByRole("menuitem", { name: "Projects" })).toBeInTheDocument();
    // Open the "Reports" submenu → its children.
    await userEvent.click(await body.findByRole("menuitem", { name: "Reports" }));
    await expect(await body.findByRole("menuitem", { name: "Monthly" })).toBeInTheDocument();
    // Open the nested "Archive" submenu → deepest link.
    await userEvent.click(await body.findByRole("menuitem", { name: "Archive" }));
    await expect(await body.findByRole("menuitem", { name: "2024" })).toBeInTheDocument();
  },
};
