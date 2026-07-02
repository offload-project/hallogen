import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tag, TagGroup, TagList } from "@/components/ui/tag-group";

const meta = {
  title: "UI/TagGroup",
  component: TagGroup,
  tags: ["autodocs"],
  args: {
    "aria-label": "Categories",
  },
} satisfies Meta<typeof TagGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <TagGroup {...args}>
      <TagList>
        <Tag id="news">News</Tag>
        <Tag id="travel">Travel</Tag>
        <Tag id="gaming">Gaming</Tag>
        <Tag id="shopping">Shopping</Tag>
      </TagList>
    </TagGroup>
  ),
};

export const Removable: Story = {
  render: (args) => (
    <TagGroup {...args} onRemove={() => {}}>
      <TagList>
        <Tag id="design">Design</Tag>
        <Tag id="engineering">Engineering</Tag>
        <Tag id="product">Product</Tag>
      </TagList>
    </TagGroup>
  ),
};

export const SelectableSingle: Story = {
  render: (args) => (
    <TagGroup {...args} selectionMode="single" defaultSelectedKeys={["travel"]}>
      <TagList>
        <Tag id="news">News</Tag>
        <Tag id="travel">Travel</Tag>
        <Tag id="gaming">Gaming</Tag>
      </TagList>
    </TagGroup>
  ),
};
