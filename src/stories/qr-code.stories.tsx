import type { Meta, StoryObj } from "@storybook/react-vite";
import { QRCode } from "@/components/ui/qr-code";

const meta = {
  title: "UI/QrCode",
  component: QRCode,
  tags: ["autodocs"],
  args: {
    data: "https://example.com",
    className: "size-48",
  },
  argTypes: {
    robustness: {
      control: "select",
      options: ["L", "M", "Q", "H"],
    },
  },
} satisfies Meta<typeof QRCode>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HighRobustness: Story = {
  args: { robustness: "H" },
};
