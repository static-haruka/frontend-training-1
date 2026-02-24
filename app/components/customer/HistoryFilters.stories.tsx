import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import HistoryFilters, { type FilterState } from "./HistoryFilters";
import { mockCustomer } from "./mocks";

const meta: Meta<typeof HistoryFilters> = {
  title: "customer/HistoryFilters",
  component: HistoryFilters,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof HistoryFilters>;

const CARS = mockCustomer.cars;

const EMPTY: FilterState = {
  keyword: "",
  carId: "",
  from: "",
  to: "",
  hasCommentOnly: false,
};

function Stateful(initial: FilterState) {
  const [value, setValue] = useState<FilterState>(initial);

  return (
    <div style={{ padding: 16 }}>
      <HistoryFilters cars={CARS} value={value} onChange={setValue} />
    </div>
  );
}

export const Empty: Story = {
  render: () => <Stateful {...EMPTY} />,
};

export const WithKeyword: Story = {
  render: () => <Stateful {...{ ...EMPTY, keyword: "オイル" }} />,
};

export const WithPeriod: Story = {
  render: () =>
    <Stateful
      {...{
        ...EMPTY,
        from: "2022-07-01",
        to: "2022-07-31",
      }}
    />,
};

export const WithCar: Story = {
  render: () =>
    <Stateful
      {...{
        ...EMPTY,
        carId: CARS[0]?.id ?? "",
      }}
    />,
};

export const Filled: Story = {
  render: () =>
    <Stateful
      {...{
        keyword: "オイル",
        carId: CARS[0]?.id ?? "",
        from: "2022-07-01",
        to: "2022-07-31",
        hasCommentOnly: false,
      }}
    />,
};
