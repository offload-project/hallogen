import type { Meta, StoryObj } from "@storybook/react-vite";
import { BreadcrumbItemsRender } from "@/components/composite/render/breadcrumb-items-render";
import type { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "current", label: "Hallogen", isActive: true },
];

const meta = {
  title: "Composite/BreadcrumbItemsRender",
  component: BreadcrumbItemsRender,
  tags: ["autodocs"],
  args: {
    breadcrumbs,
  },
} satisfies Meta<typeof BreadcrumbItemsRender>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TwoLevels: Story = {
  args: {
    breadcrumbs: [
      { id: "home", label: "Home", href: "/" },
      { id: "settings", label: "Settings", isActive: true },
    ],
  },
};
