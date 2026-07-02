import type { Meta, StoryObj } from "@storybook/react-vite";
import { Carousel, CarouselButton, CarouselContent, CarouselHandler, CarouselItem } from "@/components/ui/carousel";

const meta: Meta<typeof Carousel> = {
  title: "UI/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  render: (args) => (
    <div className="max-w-md">
      <Carousel {...args}>
        <CarouselContent>
          {[1, 2, 3, 4].map((n) => (
            <CarouselItem key={n}>
              <div className="grid h-40 place-content-center rounded-lg border bg-secondary font-semibold text-2xl">
                Slide {n}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselHandler>
          <CarouselButton segment="previous" />
          <CarouselButton segment="next" />
        </CarouselHandler>
      </Carousel>
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Vertical: Story = {
  args: { orientation: "vertical" },
};
