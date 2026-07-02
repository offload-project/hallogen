import type { Meta, StoryObj } from "@storybook/react-vite";
import { DetailLine, DetailLineItem } from "@/components/ui/detail-line";

const meta: Meta<typeof DetailLine> = {
  title: "UI/DetailLine",
  component: DetailLine,
  tags: ["autodocs"],
  args: {
    children: (
      <>
        <DetailLineItem label="Name" description="Ada Lovelace" />
        <DetailLineItem label="Email" description="ada@example.com" />
        <DetailLineItem label="Role" description="Administrator" />
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TightGap: Story = {
  args: { gap: 1 },
};
