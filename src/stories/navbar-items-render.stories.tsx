import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { NavbarItemsRender } from "@/components/composite/render/navbar-items-render";
import { Navbar, NavbarProvider } from "@/components/ui/navbar";
import type { NavItem } from "@/types";

const sectionItem: NavItem = {
  id: "main",
  type: "section",
  label: "Main",
  isActive: false,
  collapsible: false,
  collapsed: false,
  children: [
    { id: "home", type: "link", label: "Home", href: "/", isActive: true },
    { id: "reports", type: "link", label: "Reports", href: "/reports", isActive: false },
    { id: "settings", type: "link", label: "Settings", href: "/settings", isActive: false },
  ],
};

const meta = {
  title: "Composite/NavbarItemsRender",
  component: NavbarItemsRender,
  tags: ["autodocs"],
  args: {
    item: sectionItem,
  },
  render: (args) => (
    <NavbarProvider>
      <Navbar aria-label="Main navigation">
        <NavbarItemsRender {...args} />
      </Navbar>
    </NavbarProvider>
  ),
} satisfies Meta<typeof NavbarItemsRender>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleLink: Story = {
  args: {
    item: { id: "profile", type: "link", label: "Profile", href: "/profile", isActive: false },
  },
};

// A deep tree: a section of links + a `group` (navbar dropdown) whose children
// include a nested collapsible group (submenu). Renders through every level.
const navbarTree: NavItem[] = [
  {
    id: "primary",
    type: "section",
    label: "Primary",
    isActive: false,
    collapsible: false,
    collapsed: false,
    children: [
      { id: "nav-home", type: "link", label: "Home", href: "/", isActive: true },
      { id: "nav-about", type: "link", label: "About", href: "/about", isActive: false },
    ],
  },
  {
    id: "products",
    type: "group",
    label: "Products",
    isActive: false,
    collapsible: false,
    collapsed: false,
    children: [
      { id: "prod-overview", type: "link", label: "Overview", href: "/overview", isActive: false },
      { id: "prod-sep", type: "separator" },
      {
        id: "resources",
        type: "group",
        label: "Resources",
        isActive: false,
        collapsible: true,
        collapsed: false,
        children: [
          { id: "res-docs", type: "link", label: "Docs", href: "/docs", isActive: false },
          { id: "res-api", type: "link", label: "API", href: "/api", isActive: false },
        ],
      },
    ],
  },
];

/** Section links inline + a `group` dropdown containing a nested submenu. */
export const MultiLevel: Story = {
  render: () => (
    <NavbarProvider>
      <Navbar aria-label="Main navigation">
        {navbarTree.map((item) => (
          <NavbarItemsRender key={item.id} item={item} />
        ))}
      </Navbar>
    </NavbarProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);
    // Section link renders inline in the navbar.
    await expect(await canvas.findByRole("link", { name: "Home" })).toBeInTheDocument();
    // Open the "Products" dropdown → its children (rendered via MenuItemsRender).
    await userEvent.click(canvas.getByRole("button", { name: /Products/ }));
    await expect(await body.findByRole("menuitem", { name: "Overview" })).toBeInTheDocument();
    // Open the nested "Resources" submenu → deepest link.
    await userEvent.click(await body.findByRole("menuitem", { name: "Resources" }));
    await expect(await body.findByRole("menuitem", { name: "Docs" })).toBeInTheDocument();
  },
};
