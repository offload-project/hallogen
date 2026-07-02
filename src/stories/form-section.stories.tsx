import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormSection } from "@/components/composite/form-section";
import { Label } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { TextField } from "@/components/ui/text-field";

const meta = {
  title: "Composite/FormSection",
  component: FormSection,
  tags: ["autodocs"],
  args: {
    title: "Profile",
    description: "This information will be displayed publicly.",
    children: (
      <>
        <TextField>
          <Label>Full name</Label>
          <Input placeholder="Jane Doe" />
        </TextField>
        <TextField>
          <Label>Email</Label>
          <Input placeholder="jane@example.com" />
        </TextField>
      </>
    ),
  },
} satisfies Meta<typeof FormSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Vertical: Story = {
  args: { orientation: "vertical" },
};
