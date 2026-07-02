import type { Meta, StoryObj } from "@storybook/react-vite";
import { InboxIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

const meta = {
  title: "UI/Empty",
  component: Empty,
  tags: ["autodocs"],
  render: (args) => (
    <Empty {...args}>
      <EmptyHeader>
        <EmptyMedia>
          <InboxIcon className="size-8 text-muted-fg" />
        </EmptyMedia>
        <EmptyTitle>No messages yet</EmptyTitle>
        <EmptyDescription>When you receive messages, they will appear here.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Compose message</Button>
      </EmptyContent>
    </Empty>
  ),
} satisfies Meta<typeof Empty>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
