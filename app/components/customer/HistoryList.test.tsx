import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HistoryList from "./HistoryList";
import type { Transaction } from "./mocks";
import { mockCustomer } from "./mocks";

test("未設定のとき、未設定タグは表示されず、車名が赤になる", () => {
  const withUnset: Transaction = {
    id: "a",
    kind: "purchase" as any,
    carId: "car-1",
    carLabel: "インプレッサ\nスポーツ",
    date: "2022.9.26",
    sortAt: "2022-09-26T10:00:00Z",
    title: "TITLE A",
    hasComment: false,
    shopLabel: "店舗1",
    icon: "circle",
    statusLabel: "未設定",
    amount: 1000,
  } as any;

  render(<HistoryList items={[withUnset]} cars={mockCustomer.cars} />);

  expect(screen.queryByText("未設定")).not.toBeInTheDocument();

  const car = screen.getByText(/インプレッサ/);
  expect(car).toHaveStyle({ color: "#d60000" });
});

test("amount がないときは '—' が表示される", () => {
  const item: Transaction = {
    id: "b",
    kind: "purchase" as any,
    carId: "car-1",
    carLabel: "インプレッサ\nスポーツ",
    date: "2022.9.26",
    sortAt: "2022-09-26T10:00:00Z",
    title: "TITLE B",
    hasComment: false,
    shopLabel: "店舗1",
    icon: "circle",
    amount: undefined,
  } as any;

  render(<HistoryList items={[item]} cars={mockCustomer.cars} />);
  expect(screen.getByText("—")).toBeInTheDocument();
});

test("shopLabel が undefined のときも描画できる（?? '' の分岐）", () => {
  const item: Transaction = {
    id: "shop-undef",
    kind: "purchase" as any,
    carId: "car-1",
    carLabel: "インプレッサ\nスポーツ",
    date: "2022.9.26",
    sortAt: "2022-09-26T10:00:00Z",
    title: "TITLE SHOP UNDEF",
    hasComment: false,
    shopLabel: undefined,
    icon: "circle",
    amount: 1000,
  } as any;

  render(<HistoryList items={[item]} cars={mockCustomer.cars} />);

  expect(screen.getByText("TITLE SHOP UNDEF")).toBeInTheDocument();
});