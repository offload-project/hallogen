import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";

interface Animal {
  id: string;
  name: string;
}

const animals: Animal[] = [
  { id: "cat", name: "Cat" },
  { id: "dog", name: "Dog" },
  { id: "otter", name: "Otter" },
  { id: "panda", name: "Panda" },
];

const meta = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    "aria-label": "Favorite animal",
    className: "w-64",
  },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger />
      <SelectContent items={animals}>
        {(item: Animal) => <SelectItem id={item.id}>{item.name}</SelectItem>}
      </SelectContent>
    </Select>
  ),
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSelection: Story = {
  args: { defaultSelectedKey: "otter" },
};

export const Opens: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    const body = within(document.body);
    const option = await body.findByRole("option", { name: "Panda" });
    await userEvent.click(option);
    await expect(canvas.getByRole("button")).toHaveTextContent("Panda");
  },
};
