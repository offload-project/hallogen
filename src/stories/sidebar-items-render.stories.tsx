import type { Meta, StoryObj } from "@storybook/react-vite";
import { SidebarItemsRender } from "@/components/composite/render/sidebar-items-render";
import { Sidebar, SidebarContent, SidebarProvider } from "@/components/ui/sidebar";
import type { NavItem } from "@/types";

const mainSection: NavItem = {
  id: "main",
  type: "section",
  label: "Main",
  isActive: false,
  collapsible: false,
  collapsed: false,
  children: [
    { id: "dashboard", type: "link", label: "Dashboard", href: "#", isActive: true },
    { id: "projects", type: "link", label: "Projects", href: "#", isActive: false },
  ],
};

const items: NavItem[] = [
  mainSection,
  { id: "sep", type: "separator" },
  { id: "settings", type: "link", label: "Settings", href: "#", isActive: false },
];

const meta = {
  title: "Composite/SidebarItemsRender",
  component: SidebarItemsRender,
  tags: ["autodocs"],
  args: { item: mainSection },
} satisfies Meta<typeof SidebarItemsRender>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          {items.map((item) => (
            <SidebarItemsRender key={item.id} item={item} />
          ))}
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  ),
};
