import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { GridList, GridListItem } from "@/components/ui/grid-list";

const meta = {
  title: "UI/GridList",
  component: GridList,
  tags: ["autodocs"],
  args: {
    "aria-label": "Files",
    selectionMode: "multiple",
    className: "w-72",
  },
  render: (args) => (
    <GridList {...args}>
      <GridListItem id="readme" textValue="README.md">
        README.md
      </GridListItem>
      <GridListItem id="index" textValue="index.ts">
        index.ts
      </GridListItem>
      <GridListItem id="styles" textValue="styles.css">
        styles.css
      </GridListItem>
    </GridList>
  ),
} satisfies Meta<typeof GridList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleSelection: Story = {
  args: { selectionMode: "single" },
};

export const Selects: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const row = canvas.getByRole("row", { name: "index.ts" });
    await userEvent.click(row);
    await expect(row).toHaveAttribute("aria-selected", "true");
  },
};
