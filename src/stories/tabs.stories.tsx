import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@/components/ui/tabs";

const meta = {
  title: "UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  render: (args) => (
    <Tabs {...args} aria-label="Account settings">
      <TabList>
        <Tab id="profile">Profile</Tab>
        <Tab id="security">Security</Tab>
        <Tab id="notifications">Notifications</Tab>
      </TabList>
      <TabPanels>
        <TabPanel id="profile">Manage your public profile and account details.</TabPanel>
        <TabPanel id="security">Update your password and security preferences.</TabPanel>
        <TabPanel id="notifications">Choose how you want to be notified.</TabPanel>
      </TabPanels>
    </Tabs>
  ),
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Vertical: Story = {
  args: { orientation: "vertical" },
};

export const Switching: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("tab", { name: "Security" }));
    await expect(canvas.getByText("Update your password and security preferences.")).toBeVisible();
  },
};
