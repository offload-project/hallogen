import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps, ReactNode } from "react";
import { Navbar, NavbarItem, NavbarProvider, NavbarSection, NavbarSpacer, NavbarStart } from "@/components/ui/navbar";

// Navbar's props are a discriminated union, which resolves to `never` under
// Storybook's arg typing. Re-type it as a flat set of props for the stories.
type NavbarStoryProps = ComponentProps<"div"> & {
  variant?: "default" | "float" | "inset";
  isSticky?: boolean;
  side?: "left" | "right";
  placement?: "top" | "bottom";
};
const NavbarStory = Navbar as (props: NavbarStoryProps) => ReactNode;

const meta = {
  title: "UI/Navbar",
  component: NavbarStory,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <NavbarProvider>
        <Story />
      </NavbarProvider>
    ),
  ],
  args: {
    children: (
      <>
        <NavbarStart>
          <span className="font-semibold">Hallogen</span>
        </NavbarStart>
        <NavbarSection>
          <NavbarItem href="/" isCurrent>
            Home
          </NavbarItem>
          <NavbarItem href="/features">Features</NavbarItem>
          <NavbarItem href="/pricing">Pricing</NavbarItem>
        </NavbarSection>
        <NavbarSpacer />
        <NavbarSection>
          <NavbarItem href="/login">Login</NavbarItem>
        </NavbarSection>
      </>
    ),
  },
} satisfies Meta<typeof NavbarStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Float: Story = {
  args: { variant: "float" },
};
