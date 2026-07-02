import type { Meta, StoryObj } from "@storybook/react-vite";
import { MultipleSelect, MultipleSelectContent, MultipleSelectItem } from "@/components/ui/multiple-select";

interface Framework {
  id: string;
  name: string;
}

const frameworks: Framework[] = [
  { id: "react", name: "React" },
  { id: "vue", name: "Vue" },
  { id: "svelte", name: "Svelte" },
  { id: "solid", name: "Solid" },
  { id: "angular", name: "Angular" },
  { id: "qwik", name: "Qwik" },
];

const meta: Meta<typeof MultipleSelect> = {
  title: "UI/MultipleSelect",
  component: MultipleSelect,
  tags: ["autodocs"],
  args: {
    "aria-label": "Frameworks",
    children: null,
  },
  render: (args) => (
    <div className="w-80">
      <MultipleSelect<Framework> {...args}>
        <MultipleSelectContent<Framework> items={frameworks}>
          {(item) => <MultipleSelectItem id={item.id}>{item.name}</MultipleSelectItem>}
        </MultipleSelectContent>
      </MultipleSelect>
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { isDisabled: true },
};
