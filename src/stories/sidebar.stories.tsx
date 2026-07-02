import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarProvider,
  SidebarSection,
} from "@/components/ui/sidebar";

const meta = {
  title: "UI/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>Acme Inc.</SidebarHeader>
        <SidebarContent>
          <SidebarSection label="Overview">
            <SidebarItem href="#" isCurrent>
              <SidebarLabel>Dashboard</SidebarLabel>
            </SidebarItem>
            <SidebarItem href="#">
              <SidebarLabel>Projects</SidebarLabel>
            </SidebarItem>
            <SidebarItem href="#">
              <SidebarLabel>Settings</SidebarLabel>
            </SidebarItem>
          </SidebarSection>
        </SidebarContent>
        <SidebarFooter>v1.0.0</SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  ),
};
