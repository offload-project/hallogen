import type { Meta, StoryObj } from "@storybook/react-vite";
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
