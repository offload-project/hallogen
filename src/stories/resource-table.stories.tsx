import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import type { Key, SortDescriptor } from "react-aria-components";
import { type ResourceColumn, ResourceTable } from "@/components/composite/resource-table";
import { Badge } from "@/components/ui/badge";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "invited";
}

const users: User[] = [
  { id: 1, name: "Ada Lovelace", email: "ada@example.com", role: "Owner", status: "active" },
  { id: 2, name: "Alan Turing", email: "alan@example.com", role: "Admin", status: "active" },
  { id: 3, name: "Grace Hopper", email: "grace@example.com", role: "Member", status: "invited" },
];

const columns: ResourceColumn<User>[] = [
  { id: "name", label: "Name", isRowHeader: true, alwaysVisible: true, allowsSorting: true, cell: (row) => row.name },
  { id: "email", label: "Email", cell: (row) => row.email },
  { id: "role", label: "Role", cell: (row) => row.role },
  {
    id: "status",
    label: "Status",
    cell: (row) => <Badge>{row.status}</Badge>,
  },
];

function ResourceTableExample({ items }: { items: User[] }) {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const visible = new Set<Key>(["email", "role", "status"]);

  return (
    <ResourceTable<User>
      ariaLabel="Team members"
      columns={columns}
      visible={visible}
      items={items}
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
    />
  );
}

const meta = {
  title: "Composite/ResourceTable",
  component: ResourceTable,
  tags: ["autodocs"],
  args: {
    ariaLabel: "Team members",
    columns: columns as unknown as ResourceColumn<{ id: Key }>[],
    visible: new Set<Key>(["email", "role", "status"]),
    items: users,
    sortDescriptor: { column: "name", direction: "ascending" },
    onSortChange: () => {},
  },
  render: () => <ResourceTableExample items={users} />,
} satisfies Meta<typeof ResourceTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  render: () => <ResourceTableExample items={[]} />,
};
