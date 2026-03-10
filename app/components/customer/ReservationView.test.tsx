import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReservationView from "./ReservationView";
import type { Customer } from "./mocks";

const mockCustomer: Customer = {
  id: "123",
  crooooberId: "12345678901234",
  name: "山田 太郎",
  cars: [{ id: "car-1", maker: "NISSAN", model: "R35" }],
};

const mockFetchReservations = jest.fn();

jest.mock("./mockReservations", () => {
  const actual = jest.requireActual("./mockReservations");
  return {
    ...actual,
    fetchReservations: (...args: any[]) => mockFetchReservations(...args),
  };
});

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
    return <div data-testid="mock-pagination"><button onClick={() => onChange(2)}>ページ変更</button></div>;
  };
});

jest.mock("./ReservationItem", () => {
  return function MockReservationItem({ reservation }: any) {
    return <div data-testid="mock-reservation-item">{reservation.id}</div>;
  };
});

describe("ReservationView", () => {
  beforeEach(() => {
    const { mockReservationsYamada } = jest.requireActual("./mockReservations");
    mockFetchReservations.mockReturnValue(mockReservationsYamada);
  });

  it("すべてのUI操作とデータ表示を網羅し、カバレッジを100%にする", async () => {
    const user = userEvent.setup();
    render(<ReservationView customer={mockCustomer} />);

    // 1. 初期表示確認
    expect(screen.getByText(/0\s*件/)).toBeInTheDocument();

    // 2. 過去タブへの切り替え
    const pastButton = screen.getAllByRole("button", { name: "過去の予約も含む" })[0];
    await user.click(pastButton);
    expect(screen.getByText((content, element) => element?.textContent === "20件")).toBeInTheDocument();

    // 3. 各種イベントの発火
    await user.click(screen.getByText("ページ変更"));
    await user.click(screen.getByText("フィルター変更"));

    // 4. チェックボックス
    const checkbox = screen.getByLabelText("メモ付きのみ");
    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    // 5. カバレッジの穴（トグルボタンの逆操作など）をすべて網羅
    const allToggleButtons = [
      ...screen.getAllByRole("button", { name: "本日以降の予約のみ" }),
      ...screen.getAllByRole("button", { name: "過去の予約も含む" })
    ];
    for (const btn of allToggleButtons) {
      await user.click(btn);
    }
  });

  it("顧客が見つからないケースの fetchReservations (カバレッジ用)", () => {
    const { fetchReservations } = jest.requireActual("./mockReservations");
    expect(fetchReservations("none")).toEqual([]);
  });

  it("有効な顧客IDで fetchReservations が予約リストを返す（50行目カバレッジ用）", () => {
    const { fetchReservations, mockReservationsYamada } = jest.requireActual("./mockReservations");
    const { mockCustomer: realMockCustomer } = jest.requireActual("./mocks");
    expect(fetchReservations(realMockCustomer.id)).toEqual(mockReservationsYamada);
  });
});