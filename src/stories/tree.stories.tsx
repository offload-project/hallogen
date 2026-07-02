import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tree, TreeContent, TreeItem } from "@/components/ui/tree";

const meta = {
  title: "UI/Tree",
  component: Tree,
  tags: ["autodocs"],
  args: {
    "aria-label": "Files",
    selectionMode: "multiple",
  },
} satisfies Meta<typeof Tree>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tree {...args} defaultExpandedKeys={["documents"]} className="w-72">
      <TreeItem id="documents" textValue="Documents">
        <TreeContent>Documents</TreeContent>
        <TreeItem id="report" textValue="Report">
          <TreeContent>Report.pdf</TreeContent>
        </TreeItem>
        <TreeItem id="invoice" textValue="Invoice">
          <TreeContent>Invoice.pdf</TreeContent>
        </TreeItem>
      </TreeItem>
      <TreeItem id="downloads" textValue="Downloads">
        <TreeContent>Downloads</TreeContent>
        <TreeItem id="image" textValue="Image">
          <TreeContent>photo.png</TreeContent>
        </TreeItem>
      </TreeItem>
    </Tree>
  ),
};

export const SingleSelection: Story = {
  render: (args) => (
    <Tree {...args} selectionMode="single" defaultExpandedKeys={["src"]} className="w-72">
      <TreeItem id="src" textValue="src">
        <TreeContent>src</TreeContent>
        <TreeItem id="index" textValue="index.ts">
          <TreeContent>index.ts</TreeContent>
        </TreeItem>
      </TreeItem>
      <TreeItem id="readme" textValue="README">
        <TreeContent>README.md</TreeContent>
      </TreeItem>
    </Tree>
  ),
};
