import type { Meta, StoryObj } from "@storybook/react-vite";
import { ResourceClearFilters } from "@/components/composite/resource-clear-filters";

const meta = {
  title: "Composite/ResourceClearFilters",
  component: ResourceClearFilters,
  tags: ["autodocs"],
  args: {
    filters: { search: "hello", status: "active" },
    url: "/resources",
  },
} satisfies Meta<typeof ResourceClearFilters>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// When there are no active filters the component renders nothing.
export const NoActiveFilters: Story = {
  args: {
    filters: { search: "", status: null },
  },
};
