import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PurchaseHistoryView from "./PurchaseHistoryView";

jest.mock("next/navigation", () => ({
  useParams: () => ({ customerId: "CUST-9" }),
}));

jest.mock("./mocks", () => ({
  fetchCustomer: (id: string) => ({ id, name: "username" }),
}));

jest.mock("./CustomerPageShell", () => {
  return ({ children }: any) => <div data-testid="shell">{children}</div>;
});

jest.mock("./Pagination", () => {
  return ({ page, totalPages, onChange }: any) => (
    <div>
      <div>
        page:{page} / total:{totalPages}
      </div>
      <button type="button" onClick={() => onChange(page + 1)}>
        next
      </button>
    </div>
  );
});

jest.mock("./purchaseMocks", () => ({
  MOCK_PURCHASE_HISTORY: [
    {
      id: "p-001",
      icon: "car",
      date: "2022/11/01",
      carName: "WRX STI",
      statusLabel: "未対応",
      statusTone: "danger",
      title: "タイヤ交換",
      amountYen: 12000,
      shopLabel: "Upgarage 新宿店",
      hasMemo: false,
    },
    {
      id: "p-002",
      icon: "gear",
      date: "2022/11/02",
      carName: "GR86",
      statusLabel: "対応済",
      statusTone: "muted",
      title: "オイル交換",
      amountYen: 8000,
      shopLabel: "Upgarage 池袋店",
      hasMemo: true,
    },
    {
      id: "p-003",
      icon: "photo",
      date: "2022/11/03",
      carName: "CIVIC",
      statusLabel: "未対応",
      statusTone: "danger",
      title: "バッテリー",
      amountYen: 15000,
      shopLabel: "Upgarage 渋谷店",
      hasMemo: true,
    },
  ],
}));

describe("PurchaseHistoryView", () => {
  it("初期表示で件数が表示され、リストが出る", () => {
    render(<PurchaseHistoryView />);

    expect(screen.getByText("購入履歴")).toBeInTheDocument();
    expect(screen.getByText("3件")).toBeInTheDocument();
    expect(screen.getByLabelText("購入履歴の詳細: タイヤ交換")).toBeInTheDocument();
    expect(screen.getByLabelText("購入履歴の詳細: オイル交換")).toBeInTheDocument();
    expect(screen.getByLabelText("購入履歴の詳細: バッテリー")).toBeInTheDocument();
  });

  it("キーワード検索で絞り込みできる（件数も更新）", async () => {
    const user = userEvent.setup();
    render(<PurchaseHistoryView />);

    const input = screen.getByPlaceholderText("キーワードで検索");
    await user.type(input, "オイル");

    expect(screen.getByText("1件")).toBeInTheDocument();
    expect(screen.getByLabelText("購入履歴の詳細: オイル交換")).toBeInTheDocument();
    expect(screen.queryByLabelText("購入履歴の詳細: タイヤ交換")).not.toBeInTheDocument();
  });

  it("メモ付きのみチェックで絞り込みできる（件数も更新）", async () => {
    const user = userEvent.setup();
    render(<PurchaseHistoryView />);

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(screen.getByText("2件")).toBeInTheDocument();
    expect(screen.getByLabelText("購入履歴の詳細: オイル交換")).toBeInTheDocument();
    expect(screen.getByLabelText("購入履歴の詳細: バッテリー")).toBeInTheDocument();
    expect(screen.queryByLabelText("購入履歴の詳細: タイヤ交換")).not.toBeInTheDocument();
  });

  it("検索やメモ絞り込みをすると page が 1 に戻る", async () => {
    const user = userEvent.setup();
    render(<PurchaseHistoryView />);

    await user.click(screen.getByRole("button", { name: "next" }));
    expect(screen.getByText("page:2 / total:1")).toBeInTheDocument();

    const input = screen.getByPlaceholderText("キーワードで検索");
    await user.type(input, "タイヤ");
    expect(screen.getByText("page:1 / total:1")).toBeInTheDocument();
  });
});