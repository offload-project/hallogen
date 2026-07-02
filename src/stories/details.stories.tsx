import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Details,
  DetailsDescription,
  DetailsFooter,
  DetailsHeader,
  DetailsList,
  DetailsTerm,
} from "@/components/ui/details";

const meta = {
  title: "UI/Details",
  component: Details,
  tags: ["autodocs"],
  args: {
    className: "max-w-md",
    children: (
      <>
        <DetailsHeader>Order summary</DetailsHeader>
        <DetailsList>
          <DetailsTerm>Order number</DetailsTerm>
          <DetailsDescription>#10492</DetailsDescription>
          <DetailsTerm>Status</DetailsTerm>
          <DetailsDescription>Shipped</DetailsDescription>
          <DetailsTerm>Total</DetailsTerm>
          <DetailsDescription>$128.00</DetailsDescription>
        </DetailsList>
        <DetailsFooter className="text-muted-fg text-sm/6">Updated 2 hours ago</DetailsFooter>
      </>
    ),
  },
} satisfies Meta<typeof Details>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
