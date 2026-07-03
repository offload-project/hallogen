import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlusIcon } from "lucide-react";
import { expect, fn, userEvent, within } from "storybook/test";
import { Button } from "@/components/ui/button";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "warning", "danger", "success", "outline", "plain"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "sq-xs", "sq-sm", "sq-md", "sq-lg"],
    },
    isDisabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="warning">
        Warning
      </Button>
      <Button {...args} variant="danger">
        Danger
      </Button>
      <Button {...args} variant="success">
        Success
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="plain">
        Plain
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="xs">
        xs
      </Button>
      <Button {...args} size="sm">
        sm
      </Button>
      <Button {...args} size="md">
        md
      </Button>
      <Button {...args} size="lg">
        lg
      </Button>
    </div>
  ),
};

export const IconSizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="sq-xs" aria-label="Add (xs)">
        <PlusIcon />
      </Button>
      <Button {...args} size="sq-sm" aria-label="Add (sm)">
        <PlusIcon />
      </Button>
      <Button {...args} size="sq-md" aria-label="Add (md)">
        <PlusIcon />
      </Button>
      <Button {...args} size="sq-lg" aria-label="Add (lg)">
        <PlusIcon />
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { isDisabled: true },
};

export const Clickable: Story = {
  args: {
    onPress: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Button" });
    await userEvent.click(button);
    await expect(args.onPress).toHaveBeenCalledTimes(1);
  },
};
