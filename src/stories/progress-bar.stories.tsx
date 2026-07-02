import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "@/components/ui/field";
import { ProgressBar, ProgressBarHeader, ProgressBarTrack, ProgressBarValue } from "@/components/ui/progress-bar";

const meta = {
  title: "UI/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  args: {
    "aria-label": "Uploading",
    value: 60,
    children: (
      <>
        <ProgressBarHeader>
          <Label>Uploading</Label>
          <ProgressBarValue />
        </ProgressBarHeader>
        <ProgressBarTrack />
      </>
    ),
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Complete: Story = {
  args: { value: 100 },
};

export const Indeterminate: Story = {
  args: {
    isIndeterminate: true,
    children: <ProgressBarTrack />,
  },
};
