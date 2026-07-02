import type { Meta, StoryObj } from "@storybook/react-vite";
import { Breadcrumbs, BreadcrumbsItem } from "@/components/ui/breadcrumbs";

const meta = {
  title: "UI/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
  args: {
    children: (
      <>
        <BreadcrumbsItem href="/">Home</BreadcrumbsItem>
        <BreadcrumbsItem href="/projects">Projects</BreadcrumbsItem>
        <BreadcrumbsItem>Hallogen</BreadcrumbsItem>
      </>
    ),
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SlashSeparator: Story = {
  args: {
    separator: "slash",
  },
};
