import type { Meta, StoryObj } from "@storybook/react-vite";
import { MeterGroup, MeterGroupContent, MeterGroupHeader } from "@/components/ui/meter-group";

// MeterGroupContent only reads props (value/label/color) from its children and
// renders its own bars, so a lightweight prop-carrier component is sufficient.
type MeterItemProps = {
  label?: string;
  value?: number;
  color?: string;
  "aria-label"?: string;
};
const MeterItem = (_props: MeterItemProps) => null;

const meta = {
  title: "UI/MeterGroup",
  component: MeterGroup,
  tags: ["autodocs"],
  args: {
    total: 100,
    unit: "GB",
    children: (
      <>
        <MeterGroupHeader>
          <span data-slot="label">Storage usage</span>
          <span>70 / 100 GB</span>
        </MeterGroupHeader>
        <MeterGroupContent>
          <MeterItem label="Documents" value={40} color="var(--color-primary)" />
          <MeterItem label="Media" value={20} color="var(--color-success)" />
          <MeterItem label="Backups" value={10} color="var(--color-warning)" />
        </MeterGroupContent>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MeterGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AutoBase: Story = {
  args: {
    total: undefined,
    children: (
      <MeterGroupContent>
        <MeterItem label="Alpha" value={3} color="var(--color-primary)" />
        <MeterItem label="Beta" value={5} color="var(--color-success)" />
        <MeterItem label="Gamma" value={2} color="var(--color-warning)" />
      </MeterGroupContent>
    ),
  },
};
