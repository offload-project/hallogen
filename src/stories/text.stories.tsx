import type { Meta, StoryObj } from "@storybook/react-vite";
import { Code, Strong, Text, TextLink } from "@/components/ui/text";

const meta = {
  title: "UI/Text",
  component: Text,
  tags: ["autodocs"],
  args: {
    children: "The quick brown fox jumps over the lazy dog.",
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithStrong: Story = {
  render: () => (
    <Text>
      This sentence contains a <Strong>strong emphasis</Strong> word.
    </Text>
  ),
};

export const WithCode: Story = {
  render: () => (
    <Text>
      Install it by running <Code>bun install</Code> in your terminal.
    </Text>
  ),
};

export const WithLink: Story = {
  render: () => (
    <Text>
      Read more in the <TextLink href="#">documentation</TextLink>.
    </Text>
  ),
};
