import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Pagination from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "customer/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

function Stateful(args: { totalPages: number; initialPage: number }) {
  const [page, setPage] = useState(args.initialPage);

  return (
    <Pagination
      page={page}
      totalPages={args.totalPages}
      onChange={setPage}
    />
  );
}

export const OnePage: Story = {
  render: () => <Stateful totalPages={1} initialPage={1} />,
};

export const FirstPage: Story = {
  render: () => <Stateful totalPages={5} initialPage={1} />,
};

export const MiddlePage: Story = {
  render: () => <Stateful totalPages={5} initialPage={3} />,
};

export const LastPage: Story = {
  render: () => <Stateful totalPages={5} initialPage={5} />,
};

export const ManyPages: Story = {
  render: () => <Stateful totalPages={30} initialPage={10} />,
};
