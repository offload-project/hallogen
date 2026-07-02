import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { NativeSelect, NativeSelectContent } from "@/components/ui/native-select";

const meta = {
  title: "UI/NativeSelect",
  component: NativeSelect,
  tags: ["autodocs"],
  args: {
    className: "w-64",
  },
  render: (args) => (
    <NativeSelect {...args}>
      <NativeSelectContent aria-label="Favorite fruit" defaultValue="apple">
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="cherry">Cherry</option>
      </NativeSelectContent>
    </NativeSelect>
  ),
} satisfies Meta<typeof NativeSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selects: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox", { name: "Favorite fruit" });
    await userEvent.selectOptions(select, "cherry");
    await expect(select).toHaveValue("cherry");
  },
};
