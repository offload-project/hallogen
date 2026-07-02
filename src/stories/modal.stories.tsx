import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";

const meta = {
  title: "UI/Modal",
  component: Modal,
  tags: ["autodocs"],
  args: { children: null },
  render: (args) => (
    <Modal {...args}>
      <ModalTrigger>Open modal</ModalTrigger>
      <ModalContent aria-label="Example modal">
        <ModalHeader>
          <ModalTitle>Invite team member</ModalTitle>
          <ModalDescription>Send an invitation to join your workspace.</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <p>Enter details to invite a new member.</p>
        </ModalBody>
        <ModalFooter>
          <ModalClose>Cancel</ModalClose>
          <Button variant="primary">Send invite</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Opens: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Open modal" }));
    // Modal renders in a portal on document.body.
    const overlay = within(document.body);
    await expect(await overlay.findByText("Invite team member")).toBeInTheDocument();
  },
};
