import { render, screen } from "@testing-library/react";
import HistoryList from "./HistoryList";
import { mockCustomer, type Transaction } from "./mocks";

test("statusLabel があると表示され、ないと表示されない", () => {
  const items: Transaction[] = [
    {
      ...mockCustomer,
    } as any,
  ];

  const withStatus: Transaction = {
    id: "x1",
    kind: "purchase",
    carId: "car-1",
    carLabel: "インプレッサ\nスポーツ",
    date: "2022.9.26",
    sortAt: "2022-09-26T10:00:00Z",
    title: "TITLE A",
    amount: 1000,
    hasComment: false,
    statusLabel: "未設定",
    shopLabel: "店舗1",
    icon: "circle",
  };

  const withoutStatus: Transaction = {
    ...withStatus,
    id: "x2",
    title: "TITLE B",
    statusLabel: undefined,
  };

  render(<HistoryList items={[withStatus, withoutStatus]} cars={mockCustomer.cars} />);

  expect(screen.getByText("未設定")).toBeInTheDocument();
});

test("kind=considering のときラベルが『検討中パーツ』になる", () => {
  const item: Transaction = {
    id: "c1",
    kind: "considering",
    carId: "car-1",
    carLabel: "インプレッサ\nスポーツ",
    date: "2022.9.26",
    sortAt: "2022-09-26T10:00:00Z",
    title: "TITLE C",
    hasComment: false,
    shopLabel: "店舗1",
    icon: "circle",
  };

  render(<HistoryList items={[item]} cars={mockCustomer.cars} />);
  expect(screen.getByText("検討中パーツ")).toBeInTheDocument();
});



test("kindLabel: reservation が '作業予約' で表示される（reservation 分岐）", () => {
  render(
    <HistoryList
      items={[
        {
          id: "t-res",
          kind: "reservation" as any,
          carId: "car-1",
          carLabel: "NISSAN R35",
          date: "2022.7.01",
          sortAt: "2022-07-01T10:00:00Z",
          title: "RESERVATION ITEM",
          hasComment: false,
          shopLabel: undefined,
          amount: undefined,
        } as any,
      ]}
      cars={[] as any}
    />
  );

  expect(screen.getByText("作業予約")).toBeInTheDocument();
  expect(screen.getByText("RESERVATION ITEM")).toBeInTheDocument();
  expect(screen.getByText("—")).toBeInTheDocument();
});

test("kindLabel: work が '作業履歴' で表示される（work 分岐）", () => {
  render(
    <HistoryList
      items={[
        {
          id: "t-work",
          kind: "work" as any,
          carId: "car-1",
          carLabel: "NISSAN R35",
          date: "2022.8.01",
          sortAt: "2022-08-01T10:00:00Z",
          title: "WORK ITEM",
          hasComment: false,
          shopLabel: "店舗W",
          amount: 1000,
        } as any,
      ]}
      cars={[] as any}
    />
  );

  expect(screen.getByText("作業履歴")).toBeInTheDocument();
  expect(screen.getByText("WORK ITEM")).toBeInTheDocument();
});
