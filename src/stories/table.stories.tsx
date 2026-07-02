import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@/components/ui/table";

const rows = [
  { id: 1, name: "Alice", role: "Engineer", status: "Active" },
  { id: 2, name: "Bob", role: "Designer", status: "Away" },
  { id: 3, name: "Carol", role: "Manager", status: "Active" },
];

const meta = {
  title: "UI/Table",
  component: Table,
  tags: ["autodocs"],
  render: (args) => (
    <Table aria-label="Team members" {...args}>
      <TableHeader>
        <TableColumn isRowHeader>Name</TableColumn>
        <TableColumn>Role</TableColumn>
        <TableColumn>Status</TableColumn>
      </TableHeader>
      <TableBody items={rows}>
        {(row) => (
          <TableRow id={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.role}</TableCell>
            <TableCell>{row.status}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  ),
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Striped: Story = {
  args: { striped: true },
};

export const Selectable: Story = {
  args: { selectionMode: "multiple" },
};
