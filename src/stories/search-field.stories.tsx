import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { SearchField, SearchInput } from "@/components/ui/search-field";

const meta = {
  title: "UI/SearchField",
  component: SearchField,
  tags: ["autodocs"],
  args: {
    "aria-label": "Search",
    children: null,
  },
  render: (args) => (
    <div className="w-80">
      <SearchField {...args}>
        <SearchInput placeholder="Search..." />
      </SearchField>
    </div>
  ),
} satisfies Meta<typeof SearchField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TypeAndAssert: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("searchbox");
    await userEvent.type(input, "invoices");
    await expect(input).toHaveValue("invoices");
  },
};
