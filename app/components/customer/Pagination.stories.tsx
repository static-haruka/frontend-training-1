import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Pagination from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "customer/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

function Stateful(args: { totalPages: number; initialPage: number }) {
  const [page, setPage] = useState(args.initialPage);
  return <Pagination page={page} totalPages={args.totalPages} onChange={setPage} />;
}

/**
 * 1ページのみの場合
 */
export const OnePage: Story = {
  name: "Single Page",
  render: () => <Stateful totalPages={1} initialPage={1} />,
};

/**
 * 最初のページを選択中
 */
export const FirstPage: Story = {
  name: "First Page",
  render: () => <Stateful totalPages={5} initialPage={1} />,
};

/**
 * 中間のページを選択中
 */
export const MiddlePage: Story = {
  name: "Middle Page",
  render: () => <Stateful totalPages={5} initialPage={3} />,
};

/**
 * 最後のページを選択中
 */
export const LastPage: Story = {
  name: "Last Page",
  render: () => <Stateful totalPages={5} initialPage={5} />,
};