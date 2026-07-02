import type { Meta, StoryObj } from "@storybook/react-vite";
import { ComboBox, ComboBoxContent, ComboBoxInput, ComboBoxItem } from "@/components/ui/combo-box";

interface Animal {
  id: string;
  name: string;
}

const animals: Animal[] = [
  { id: "cat", name: "Cat" },
  { id: "dog", name: "Dog" },
  { id: "otter", name: "Otter" },
  { id: "panda", name: "Panda" },
  { id: "fox", name: "Fox" },
];

const meta = {
  title: "UI/ComboBox",
  component: ComboBox,
  tags: ["autodocs"],
  args: {
    children: null,
  },
  render: (args) => (
    <ComboBox aria-label="Favorite animal" {...args}>
      <ComboBoxInput placeholder="Select an animal..." />
      <ComboBoxContent items={animals}>
        {(item) => <ComboBoxItem id={item.id}>{item.name}</ComboBoxItem>}
      </ComboBoxContent>
    </ComboBox>
  ),
} satisfies Meta<typeof ComboBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSelection: Story = {
  args: { defaultSelectedKey: "otter" },
};
