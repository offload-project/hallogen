import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Disclosure, DisclosureGroup, DisclosurePanel, DisclosureTrigger } from "@/components/ui/disclosure-group";

const meta = {
  title: "UI/DisclosureGroup",
  component: DisclosureGroup,
  tags: ["autodocs"],
  args: {
    children: null,
  },
  render: (args) => (
    <DisclosureGroup {...args}>
      <Disclosure id="shipping">
        <DisclosureTrigger>Shipping</DisclosureTrigger>
        <DisclosurePanel>Orders ship within 2 business days.</DisclosurePanel>
      </Disclosure>
      <Disclosure id="returns">
        <DisclosureTrigger>Returns</DisclosureTrigger>
        <DisclosurePanel>Free returns within 30 days of delivery.</DisclosurePanel>
      </Disclosure>
    </DisclosureGroup>
  ),
} satisfies Meta<typeof DisclosureGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllowsMultiple: Story = {
  args: { allowsMultipleExpanded: true },
};

export const OpensOnClick: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Shipping" });
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
  },
};
