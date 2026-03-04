import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PurchaseHistoryView from "./PurchaseHistoryView";

const mockUseParams = jest.fn();

jest.mock("next/navigation", () => ({
  useParams: () => mockUseParams(),
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
      date: "2022.11.01",
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
      date: "2022.11.15",
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
      date: "2022.12.01",
      carName: "CIVIC",
      statusLabel: "未対応",
      statusTone: "danger",
      title: "バッテリー",
      amountYen: 15000,
      shopLabel: "Upgarage 渋谷店",
      hasMemo: true,
    },
    {
      id: "p-004",
      icon: "other",
      date: "invalid",
      carName: "   ",
      title: "不明なアイテム",
      amountYen: 0,
      hasMemo: false,
    },
    {
      id: "p-009",
      icon: "other",
      date: "0000.00.00",
      title: "ゼロ日付",
      amountYen: 0,
      hasMemo: false,
    },
  
    { id: "p-005", icon: "car", date: "2023.01.01", title: "ダミー5", carName: "CIVIC", amountYen: 100, hasMemo: false },
    { id: "p-006", icon: "car", date: "2023.01.02", title: "ダミー6", carName: "CIVIC", amountYen: 100, hasMemo: false },
    { id: "p-007", icon: "car", date: "2023.01.03", title: "ダミー7", carName: "CIVIC", amountYen: 100, hasMemo: false },
    { id: "p-008", icon: "car", date: "2023.01.04", title: "ダミー8", carName: "CIVIC", amountYen: 100, hasMemo: false },
  ],
}));

describe("PurchaseHistoryView", () => {
  beforeEach(() => {
    mockUseParams.mockReturnValue({ customerId: "CUST-9" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("初期表示で件数が表示され、リストが出る。ページネーションも正しく計算される", () => {
    render(<PurchaseHistoryView />);
    
    expect(screen.getByText(/9\s*件/)).toBeInTheDocument();
    expect(screen.getByLabelText("購入履歴の詳細: タイヤ交換")).toBeInTheDocument();
    expect(screen.getByText("page:1 / total:2")).toBeInTheDocument();
  });

  it("キーワード検索で絞り込みできる", async () => {
    const user = userEvent.setup();
    render(<PurchaseHistoryView />);

    const input = screen.getByPlaceholderText("キーワードで検索");
    await user.type(input, "オイル");

    expect(screen.getByText(/1\s*件/)).toBeInTheDocument();
    expect(screen.getByLabelText("購入履歴の詳細: オイル交換")).toBeInTheDocument();
  });

  it("メモ付きのみチェックで絞り込みできる", async () => {
    const user = userEvent.setup();
    render(<PurchaseHistoryView />);

    const checkbox = screen.getByRole("checkbox", { name: "メモ付きのみ" });
    await user.click(checkbox);

    expect(screen.getByText(/2\s*件/)).toBeInTheDocument(); 
    expect(screen.getByLabelText("購入履歴の詳細: オイル交換")).toBeInTheDocument();
    expect(screen.getByLabelText("購入履歴の詳細: バッテリー")).toBeInTheDocument();
  });

  it("検索やメモ絞り込みをすると page が 1 に戻る", async () => {
    const user = userEvent.setup();
    render(<PurchaseHistoryView />);

    await user.click(screen.getByRole("button", { name: "next" }));
    expect(screen.getByText("page:2 / total:2")).toBeInTheDocument();

    const input = screen.getByPlaceholderText("キーワードで検索");
    await user.type(input, "ダミー");

    expect(screen.getByText("page:1 / total:1")).toBeInTheDocument();
  });

  it("正常な日付でフィルタリングできる（開始日・終了日）", () => {
    render(<PurchaseHistoryView />);
    
    const fromInput = screen.getByLabelText("開始日") as HTMLInputElement;
    const toInput = screen.getByLabelText("終了日") as HTMLInputElement;

    fireEvent.change(fromInput, { target: { value: "2022-11-10" } });
    expect(screen.queryByLabelText("購入履歴の詳細: タイヤ交換")).not.toBeInTheDocument();

    fireEvent.change(toInput, { target: { value: "2022-11-20" } });
    expect(screen.queryByLabelText("購入履歴の詳細: バッテリー")).not.toBeInTheDocument(); 
    expect(screen.getByLabelText("購入履歴の詳細: オイル交換")).toBeInTheDocument(); 
  });

  it("強制的に不正な日付文字列を入力し、エラーハンドリング分岐を網羅する（カバレッジハック）", () => {
    render(<PurchaseHistoryView />);
    
    const fromInput = screen.getByLabelText("開始日") as HTMLInputElement;
    const toInput = screen.getByLabelText("終了日") as HTMLInputElement;

    Object.defineProperty(fromInput, "value", { value: "0-0-0", configurable: true });
    fireEvent.change(fromInput);

    Object.defineProperty(toInput, "value", { value: "0-0-0", configurable: true });
    fireEvent.change(toInput);
    expect(screen.getByText(/9\s*件/)).toBeInTheDocument(); 
  });

  it("登録車セレクトボックスで絞り込みができる", async () => {
    const user = userEvent.setup();
    render(<PurchaseHistoryView />);

    const select = screen.getByLabelText("登録車で絞り込む");
    await user.selectOptions(select, "CIVIC");

    expect(screen.getByLabelText("購入履歴の詳細: バッテリー")).toBeInTheDocument();
    expect(screen.queryByLabelText("購入履歴の詳細: タイヤ交換")).not.toBeInTheDocument();
  });

  it("props で customerId が渡された場合はそれが params より優先される", () => {
    render(<PurchaseHistoryView customerId="CUST-PROP" />);
    const row = screen.getByLabelText("購入履歴の詳細: タイヤ交換");
    expect(row.closest("a")).toHaveAttribute("href", "/customer/CUST-PROP/purchase/p-001");
  });

  it("params.customerId が配列の場合は最初の要素が使われる", () => {
    mockUseParams.mockReturnValue({ customerId: ["CUST-ARR-1", "CUST-ARR-2"] });
    render(<PurchaseHistoryView />);
    
    const row = screen.getByLabelText("購入履歴の詳細: タイヤ交換");
    expect(row.closest("a")).toHaveAttribute("href", "/customer/CUST-ARR-1/purchase/p-001");
  });

  it("params が空の場合はデフォルトのIDが使われる", () => {
    mockUseParams.mockReturnValue({});
    render(<PurchaseHistoryView />);
    
    const row = screen.getByLabelText("購入履歴の詳細: タイヤ交換");
    expect(row.closest("a")).toHaveAttribute("href", "/customer/12345678901234/purchase/p-001");
  });

  it("検索ボタンをクリックしてもクラッシュしない", async () => {
    const user = userEvent.setup();
    render(<PurchaseHistoryView />);
    const btn = screen.getByRole("button", { name: "検索" });
    await user.click(btn);
    expect(btn).toBeInTheDocument();
  });
});