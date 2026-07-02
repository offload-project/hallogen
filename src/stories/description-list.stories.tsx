import type { Meta, StoryObj } from "@storybook/react-vite";
import { DescriptionDetails, DescriptionList, DescriptionTerm } from "@/components/ui/description-list";

const meta = {
  title: "UI/DescriptionList",
  component: DescriptionList,
  tags: ["autodocs"],
  render: (args) => (
    <DescriptionList {...args}>
      <DescriptionTerm>Full name</DescriptionTerm>
      <DescriptionDetails>Ada Lovelace</DescriptionDetails>
      <DescriptionTerm>Email</DescriptionTerm>
      <DescriptionDetails>ada@example.com</DescriptionDetails>
      <DescriptionTerm>Role</DescriptionTerm>
      <DescriptionDetails>Owner</DescriptionDetails>
    </DescriptionList>
  ),
} satisfies Meta<typeof DescriptionList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
