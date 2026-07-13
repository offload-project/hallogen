import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { SidebarItemsRender } from "@/components/composite/render/sidebar-items-render";
import { Sidebar, SidebarContent, SidebarProvider } from "@/components/ui/sidebar";
import type { NavItem } from "@/types";

const svg = (path: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;

const icons = {
  dashboard: svg(
    '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  ),
  projects: svg(
    '<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>',
  ),
  settings: svg(
    '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/>',
  ),
};

const mainSection: NavItem = {
  id: "main",
  type: "section",
  label: "Main",
  isActive: false,
  collapsible: false,
  collapsed: false,
  children: [
    { id: "dashboard", type: "link", label: "Dashboard", href: "#", isActive: true, icon: icons.dashboard },
    { id: "projects", type: "link", label: "Projects", href: "#", isActive: false, icon: icons.projects },
  ],
};

const systemSection: NavItem = {
  id: "system",
  type: "section",
  label: "System",
  isActive: false,
  collapsible: false,
  collapsed: false,
  children: [{ id: "settings", type: "link", label: "Settings", href: "#", isActive: false, icon: icons.settings }],
};

const items: NavItem[] = [mainSection, { id: "sep", type: "separator" }, systemSection];

// A deep tree: section → link + collapsible group → links + a nested collapsible group → links.
// `isActive` on a group makes its disclosure default-expanded, so every level renders at once.
const analyticsSection: NavItem = {
  id: "analytics",
  type: "section",
  label: "Analytics",
  isActive: false,
  collapsible: false,
  collapsed: false,
  children: [
    { id: "overview", type: "link", label: "Overview", href: "#", isActive: false, icon: icons.dashboard },
    {
      id: "reports",
      type: "group",
      label: "Reports",
      isActive: true,
      collapsible: true,
      collapsed: false,
      children: [
        { id: "monthly", type: "link", label: "Monthly", href: "#", isActive: false, icon: icons.projects },
        {
          id: "archive",
          type: "group",
          label: "Archive",
          isActive: true,
          collapsible: true,
          collapsed: false,
          children: [
            { id: "y2024", type: "link", label: "2024", href: "#", isActive: false, icon: icons.projects },
            { id: "y2023", type: "link", label: "2023", href: "#", isActive: false, icon: icons.projects },
          ],
        },
      ],
    },
  ],
};

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

/** Renders a nested nav tree recursively — section → group → nested group → link. */
export const MultiLevel: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarItemsRender item={analyticsSection} />
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Every level renders: the section label, the group, the nested group, and its deepest links.
    await expect(canvas.getByText("Analytics")).toBeInTheDocument();
    await expect(canvas.getByText("Reports")).toBeInTheDocument();
    await expect(canvas.getByText("Archive")).toBeInTheDocument();
    await expect(canvas.getByText("2024")).toBeInTheDocument();
  },
};
