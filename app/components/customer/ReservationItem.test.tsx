import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReservationView from "./ReservationView";
import type { Customer } from "./mocks";

// --- モックデータ ---
const mockCustomer: Customer = {
  id: "c-123",
  crooooberId: "1234567890",
  name: "山田 太郎",
  cars: [
    {
      id: "car-1",
      maker: "NISSAN",
      model: "R35",
    },
  ],
};

// 子コンポーネントのモック化
jest.mock("./HistoryFilters", () => {
  return function MockHistoryFilters() {
    return <div data-testid="mock-history-filters" />;
  };
});

jest.mock("./Pagination", () => {
  return function MockPagination() {
    return <div data-testid="mock-pagination" />;
  };
});

jest.mock("./ReservationItem", () => {
  return function MockReservationItem({ reservation }: any) {
    return <div data-testid="mock-reservation-item">{reservation.task}</div>;
  };
});

describe("ReservationView", () => {
  it("初期表示で必要な要素が正しくレンダリングされていること", () => {
    render(<ReservationView customer={mockCustomer} />);

    expect(screen.getByRole("heading", { name: "予約一覧" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "買取予約" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "UPPIT(持込取付予約)" })).toBeInTheDocument();
    expect(screen.getByText("20件")).toBeInTheDocument();

    expect(screen.getByTestId("mock-history-filters")).toBeInTheDocument();
    expect(screen.getByTestId("mock-pagination")).toBeInTheDocument();

    const items = screen.getAllByTestId("mock-reservation-item");
    expect(items).toHaveLength(4);
  });

  it("「メモ付きのみ」のチェックボックスのON/OFFが切り替わること", async () => {
    const user = userEvent.setup();
    render(<ReservationView customer={mockCustomer} />);

    const checkbox = screen.getByLabelText("メモ付きのみ");
    
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("各セクションのタブ（本日以降/過去）がクリックできること", async () => {
    const user = userEvent.setup();
    render(<ReservationView customer={mockCustomer} />);

    const allButtons = screen.getAllByRole("button", { name: "過去の予約も含む" });
    
    await user.click(allButtons[0]);
    await user.click(allButtons[1]);
  });
});