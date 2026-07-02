import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Label } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { TagField } from "@/components/ui/tag-field";

const meta: Meta<typeof TagField> = {
  title: "UI/TagField",
  component: TagField,
  tags: ["autodocs"],
  args: {
    "aria-label": "Tags",
    defaultValue: ["react", "typescript"],
    children: (
      <>
        <Label>Tags</Label>
        <Input placeholder="Add a tag and press Enter..." />
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: { defaultValue: [] },
};

export const AddTag: Story = {
  args: { defaultValue: [] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Add a tag and press Enter...");
    await userEvent.type(input, "storybook{Enter}");
    await expect(canvas.getByText("storybook")).toBeInTheDocument();
  },
};
