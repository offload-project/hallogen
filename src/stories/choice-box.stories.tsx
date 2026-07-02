import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChoiceBox, ChoiceBoxItem } from "@/components/ui/choice-box";

const meta = {
  title: "UI/ChoiceBox",
  component: ChoiceBox,
  tags: ["autodocs"],
  args: {
    "aria-label": "Choose a plan",
    children: (
      <>
        <ChoiceBoxItem id="starter" label="Starter" description="For individuals getting started." />
        <ChoiceBoxItem id="pro" label="Pro" description="For growing teams." />
        <ChoiceBoxItem id="enterprise" label="Enterprise" description="For large organizations." />
      </>
    ),
  },
} satisfies Meta<typeof ChoiceBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MultipleSelection: Story = {
  args: {
    selectionMode: "multiple",
  },
};

export const TwoColumns: Story = {
  args: {
    columns: 2,
    gap: 4,
  },
};
