import type { Meta, StoryObj } from "@storybook/react-vite";
import { Note } from "@/components/ui/note";

const meta = {
  title: "UI/Note",
  component: Note,
  tags: ["autodocs"],
  args: {
    children: "This is a note with some helpful contextual information.",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "info", "warning", "danger", "success"],
    },
    indicator: { control: "boolean" },
  },
} satisfies Meta<typeof Note>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Note {...args} variant="default">
        Default message.
      </Note>
      <Note {...args} variant="info">
        Informational message.
      </Note>
      <Note {...args} variant="warning">
        Warning message.
      </Note>
      <Note {...args} variant="danger">
        Danger message.
      </Note>
      <Note {...args} variant="success">
        Success message.
      </Note>
    </div>
  ),
};
