import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import {
  Pagination,
  PaginationGap,
  PaginationItem,
  PaginationList,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const meta = {
  title: "UI/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  args: {
    children: (
      <PaginationList>
        <PaginationPrevious href="#" />
        <PaginationItem href="#">1</PaginationItem>
        <PaginationItem href="#" isCurrent>
          2
        </PaginationItem>
        <PaginationItem href="#">3</PaginationItem>
        <PaginationGap />
        <PaginationItem href="#">10</PaginationItem>
        <PaginationNext href="#" />
      </PaginationList>
    ),
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HasCurrentPage: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole("navigation", { name: "pagination" });
    await expect(nav).toBeInTheDocument();
    const current = within(nav).getByText("2");
    await expect(current).toHaveAttribute("aria-current", "page");
  },
};
