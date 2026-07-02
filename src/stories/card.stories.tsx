import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const meta = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    className: "max-w-sm",
    children: (
      <>
        <CardHeader>
          <CardTitle>Project settings</CardTitle>
          <CardDescription>Manage your project configuration and preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-fg text-sm/6">
            Update the details for your project. Changes are saved automatically once you confirm.
          </p>
        </CardContent>
        <CardFooter className="gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </CardFooter>
      </>
    ),
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAction: Story = {
  args: {
    className: "max-w-sm",
    children: (
      <>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>You have 3 unread messages.</CardDescription>
          <CardAction>
            <Button size="sq-sm" variant="outline" aria-label="More">
              …
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-muted-fg text-sm/6">Check your inbox to keep up with the latest updates.</p>
        </CardContent>
      </>
    ),
  },
};

export const HeaderProps: Story = {
  args: {
    className: "max-w-sm",
    children: <CardHeader title="Billing" description="Review your plan and payment method." />,
  },
};
