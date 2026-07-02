import type { Meta, StoryObj } from "@storybook/react-vite";
import PaginationRender from "@/components/composite/render/pagination-render";
import type { PaginatedData } from "@/types";

const pagination: PaginatedData<{ id: number }> = {
  data: [{ id: 1 }],
  current_page: 2,
  last_page: 5,
  per_page: 10,
  total: 47,
  from: 11,
  to: 20,
  first_page_url: "/items?page=1",
  last_page_url: "/items?page=5",
  next_page_url: "/items?page=3",
  prev_page_url: "/items?page=1",
  links: [
    { url: "/items?page=1", label: "&laquo; Previous", active: false, page: 1 },
    { url: "/items?page=1", label: "1", active: false, page: 1 },
    { url: "/items?page=2", label: "2", active: true, page: 2 },
    { url: "/items?page=3", label: "3", active: false, page: 3 },
    { url: "/items?page=4", label: "4", active: false, page: 4 },
    { url: "/items?page=5", label: "5", active: false, page: 5 },
    { url: "/items?page=3", label: "Next &raquo;", active: false, page: 3 },
  ],
};

const meta = {
  title: "Composite/PaginationRender",
  component: PaginationRender,
  tags: ["autodocs"],
  args: {
    pagination,
  },
} satisfies Meta<typeof PaginationRender>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInfo: Story = {
  args: { showInfo: true },
};
