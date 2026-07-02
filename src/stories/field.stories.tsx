import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextField } from "react-aria-components/TextField";
import { Description, FieldError, FieldGroup, Fieldset, Label, Legend } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const meta = {
  title: "UI/Field",
  component: Fieldset,
  tags: ["autodocs"],
  args: {
    className: "max-w-sm",
    children: (
      <>
        <Legend>Contact details</Legend>
        <FieldGroup className="flex flex-col gap-6">
          <TextField className="flex flex-col gap-1">
            <Label>Full name</Label>
            <Input placeholder="Jane Doe" />
            <Description>As it appears on your account.</Description>
          </TextField>
          <TextField type="email" className="flex flex-col gap-1">
            <Label>Email</Label>
            <Input placeholder="you@example.com" />
          </TextField>
        </FieldGroup>
      </>
    ),
  },
} satisfies Meta<typeof Fieldset>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    className: "max-w-sm",
    children: (
      <>
        <Legend>Account</Legend>
        <FieldGroup>
          <TextField isInvalid className="flex flex-col gap-1">
            <Label>Username</Label>
            <Input placeholder="username" />
            <FieldError>This username is already taken.</FieldError>
          </TextField>
        </FieldGroup>
      </>
    ),
  },
};
