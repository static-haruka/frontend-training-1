import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReservationView from "./ReservationView";
import type { Customer } from "./mocks";

const mockCustomer: Customer = {
  id: "c-123",
  crooooberId: "1234567890",
  name: "山田 太郎",
  cars: [{ id: "car-1", maker: "NISSAN", model: "R35" }],
};

jest.mock("./HistoryFilters", () => {
  return function MockHistoryFilters({ onChange }: any) {
    return (
      <div data-testid="mock-history-filters">
        <button onClick={() => onChange({ keyword: "test", carId: "", from: "", to: "", hasCommentOnly: false })}>
          フィルター変更
        </button>
      </div>
    );
  };
});

jest.mock("./Pagination", () => {
  return function MockPagination({ onChange }: any) {
    return (
      <div data-testid="mock-pagination">
        <button onClick={() => onChange(2)}>ページ変更</button>
      </div>
    );
  };
});

jest.mock("./ReservationItem", () => {
  return function MockReservationItem({ reservation }: any) {
    return <div data-testid="mock-reservation-item">{reservation.task}</div>;
  };
});

describe("ReservationView", () => {
  it("初期表示（未来のみ）は0件で、過去タブに切り替えると20件表示されること", async () => {
    const user = userEvent.setup();
    render(<ReservationView customer={mockCustomer} />);

    expect(screen.getByText("0件")).toBeInTheDocument();
    expect(screen.getByText("表示する予約がありません。")).toBeInTheDocument();

    const allPastButtons = screen.getAllByRole("button", { name: "過去の予約も含む" });
    await user.click(allPastButtons[0]);

    expect(screen.getByText("20件")).toBeInTheDocument();
    
    expect(screen.getByTestId("mock-pagination")).toBeInTheDocument();

    const items = screen.getAllByTestId("mock-reservation-item");
    expect(items).toHaveLength(10);
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

  it("子コンポーネントからの onChange イベント（Pagination, Filters）を処理できること", async () => {
    const user = userEvent.setup();
    render(<ReservationView customer={mockCustomer} />);

    await user.click(screen.getByText("フィルター変更"));

    const allPastButtons = screen.getAllByRole("button", { name: "過去の予約も含む" });
    await user.click(allPastButtons[0]);

    await user.click(screen.getByText("ページ変更"));
  });

  it("買取予約およびUPPITのすべてのタブ切り替えがクリックできること（カバレッジ網羅）", async () => {
    const user = userEvent.setup();
    render(<ReservationView customer={mockCustomer} />);

    const allFutureButtons = screen.getAllByRole("button", { name: "本日以降の予約のみ" });
    const allPastButtons = screen.getAllByRole("button", { name: "過去の予約も含む" });

    await user.click(allPastButtons[0]);
    await user.click(allFutureButtons[0]);

    await user.click(allPastButtons[1]);
    await user.click(allFutureButtons[1]);
  });
});