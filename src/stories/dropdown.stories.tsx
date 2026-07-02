import type { Meta, StoryObj } from "@storybook/react-vite";
import { ListBox } from "react-aria-components/ListBox";
import { DropdownDescription, DropdownItem, DropdownLabel, DropdownSeparator } from "@/components/ui/dropdown";

const meta = {
  title: "UI/Dropdown",
  component: DropdownItem,
  tags: ["autodocs"],
  render: (args) => (
    <ListBox aria-label="Options" className="w-56 rounded-lg border bg-overlay p-1">
      <DropdownItem {...args} id="new">
        New file
      </DropdownItem>
      <DropdownItem id="copy">Copy link</DropdownItem>
      <DropdownItem id="edit">
        <DropdownLabel>Edit</DropdownLabel>
        <DropdownDescription>Make changes to this item</DropdownDescription>
      </DropdownItem>
      <DropdownSeparator />
      <DropdownItem id="delete" variant="danger">
        Delete
      </DropdownItem>
    </ListBox>
  ),
} satisfies Meta<typeof DropdownItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
