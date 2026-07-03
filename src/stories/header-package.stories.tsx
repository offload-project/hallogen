import type { Meta, StoryObj } from "@storybook/react-vite";
import { HeaderAction, HeaderPackage } from "@/components/composite/header-package.tsx";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Composite/Header",
  component: HeaderPackage,
  tags: ["autodocs"],
  args: {
    title: "Team members",
    description: "Manage the people who have access to this project.",
  },
} satisfies Meta<typeof HeaderPackage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TitleOnly: Story = {
  args: {
    title: "Settings",
    description: undefined,
  },
};

export const WithAction: Story = {
  render: (args) => (
    <HeaderPackage>
      <HeaderPackage title={args.title} description={args.description} />
      <HeaderAction>
        <Button>Invite member</Button>
      </HeaderAction>
    </HeaderPackage>
  ),
};
