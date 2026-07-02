import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "@/components/ui/field";
import { Meter, MeterHeader, MeterTrack, MeterValue } from "@/components/ui/meter";

const meta = {
  title: "UI/Meter",
  component: Meter,
  tags: ["autodocs"],
  args: {
    className: "max-w-sm",
    value: 42,
    children: (
      <>
        <MeterHeader>
          <Label>Storage used</Label>
          <MeterValue />
        </MeterHeader>
        <MeterTrack />
      </>
    ),
  },
} satisfies Meta<typeof Meter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Warning: Story = {
  args: {
    value: 72,
  },
};

export const Danger: Story = {
  args: {
    value: 94,
  },
};
