import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import HistoryFilters, { type FilterState } from "./HistoryFilters";
import { mockCustomer } from "./mocks";

const meta: Meta<typeof HistoryFilters> = {
  title: "customer/HistoryFilters",
  component: HistoryFilters,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof HistoryFilters>;

const CARS = mockCustomer.cars;
const EMPTY: FilterState = { keyword: "", carId: "", from: "", to: "", hasCommentOnly: false };

function Stateful(initial: FilterState) {
  const [value, setValue] = useState<FilterState>(initial);
  return (
    <div style={{ padding: 16 }}>
      <HistoryFilters cars={CARS} value={value} onChange={setValue} />
    </div>
  );
}

/**
 * 未入力状態
 */
export const Empty: Story = {
  name: "Empty",
  render: () => <Stateful {...EMPTY} />,
};

/**
 * キーワードが入力されている状態
 */
export const WithKeyword: Story = {
  name: "With Keyword",
  render: () => <Stateful {...{ ...EMPTY, keyword: "オイル" }} />,
};

/**
 * 期間が指定されている状態
 */
export const WithPeriod: Story = {
  name: "With Period",
  render: () => <Stateful {...{ ...EMPTY, from: "2022-07-01", to: "2022-07-31" }} />,
};

/**
 * すべての条件が入力されている状態
 */
export const Filled: Story = {
  name: "All Filters Filled",
  render: () => <Stateful {...{
    keyword: "オイル",
    carId: CARS[0]?.id ?? "",
    from: "2022-07-01",
    to: "2022-07-31",
    hasCommentOnly: false,
  }} />,
};