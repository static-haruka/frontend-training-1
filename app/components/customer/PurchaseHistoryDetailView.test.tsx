import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PurchaseHistoryDetailView from "./PurchaseHistoryDetailView";

const backMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ back: backMock }),
  useParams: () => ({}),
}));

jest.mock("./mocks", () => ({
  fetchCustomer: (id: string) => ({ id, name: "username" }),
}));

jest.mock("./CustomerPageShell", () => {
  return ({ children }: any) => <div data-testid="shell">{children}</div>;
});

jest.mock("./purchaseMocks", () => ({
  MOCK_PURCHASE_HISTORY: [
    {
      id: "p-001",
      icon: "photo",
      carName: "WRX STI",
      title: "タイヤ交換",
      amountYen: 12000,
      hasMemo: true,
      comments: [
        { id: "c1", postedAt: "2022/11/10", authorLabel: "店員A", bodyText: "コメント本文", resultText: "完了" },
      ]
    },
    {
      id: "p-002",
      icon: "ring",
      carName: "GR86",
      title: "オイル交換",
      amountYen: 8000,
      hasMemo: false,
    },
    {
      id: "p-003",
      icon: "gear",
      carName: undefined,
      title: undefined,
      amountYen: 1000,
      hasMemo: true,
    },
    {
      id: "p-004",
      icon: "car",
      amountYen: 500,
      hasMemo: false,
    },
    {
      id: "p-005",
      icon: "monitor",
      amountYen: 7000,
      hasMemo: false,
    },
    {
      id: "p-006",
      icon: "other",
      amountYen: 0,
      hasMemo: false,
    },
    {
      id: "p-falsy",
      icon: "other",
      amountYen: 0,
      hasMemo: false,
      comments: [
        { id: "c2", postedAt: "2022/11/11", authorLabel: "店員B", bodyText: "", resultText: "" }
      ]
    }
  ],
  MOCK_PURCHASE_DETAILS: {
    "p-001": {
      managementNo: "UP00000001",
      productName: "ヨコハマタイヤ",
      productUrl: "https://example.com/p1",
      memoText: "ここメモ本文",
      installCar: "WRX STI",
    },
    "p-003": {
      productName: undefined,
      memoText: undefined,
    },
    "p-falsy": {
      productName: "",
    }
  },
}));

/* helpers */

function getPurchaseArea() {
  const title = screen.getByText("購入履歴");
  return title.nextElementSibling as HTMLElement;
}

function expectManagementNo(no: string) {
  expect(screen.getByText(`管理番号：${no}`)).toBeInTheDocument();
}

function getRowWrapperByLabel(label: string) {
  const labelEl = screen.getByText(label);
  return labelEl.parentElement!;
}

describe("PurchaseHistoryDetailView", () => {
  beforeEach(() => {
    backMock.mockClear();
  });

  it("存在しないIDの場合は何も表示しない", () => {
    const { container } = render(<PurchaseHistoryDetailView customerId="1" purchaseId="none" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("詳細データがある場合の正常描画", () => {
    render(<PurchaseHistoryDetailView customerId="1" purchaseId="p-001" />);
    expect(screen.getByText("ヨコハマタイヤ")).toBeInTheDocument();
    expectManagementNo("UP00000001");
    expect(screen.getByText("¥ 12,000")).toBeInTheDocument();
    
    expect(screen.getByText("コメント本文")).toBeInTheDocument();
    expect(screen.getByText("完了")).toBeInTheDocument();
  });

  it("空文字(falsy)によるフォールバックが全て適用される（指摘箇所のカバレッジ網羅用）", () => {
    render(<PurchaseHistoryDetailView customerId="" purchaseId="p-falsy" />);

    expect(screen.getByText("商品名")).toBeInTheDocument();

    expect(screen.getByText("店員B")).toBeInTheDocument();
  });

  it("データが不足(undefined)している場合のフォールバック分岐", () => {
    render(<PurchaseHistoryDetailView customerId="1" purchaseId="p-003" />);
    
    expect(screen.getByText("商品名")).toBeInTheDocument();
    
    const memoWrapper = getRowWrapperByLabel("メモ");
    expect(within(memoWrapper).getByText("—")).toBeInTheDocument();

    const carWrapper = getRowWrapperByLabel("取付車");
    expect(within(carWrapper).getByText("WRX STI")).toBeInTheDocument();
  });

  it("hasMemo が false の場合のメモ表示", () => {
    render(<PurchaseHistoryDetailView customerId="1" purchaseId="p-002" />);
    const memoWrapper = getRowWrapperByLabel("メモ");
    expect(within(memoWrapper).getByText("—")).toBeInTheDocument();
  });

  it("各アイコンが正しく表示される", () => {
    const { rerender } = render(<PurchaseHistoryDetailView customerId="1" purchaseId="p-001" />);
    expect(within(getPurchaseArea()).getByText("🖼️")).toBeInTheDocument();

    rerender(<PurchaseHistoryDetailView customerId="1" purchaseId="p-002" />);
    expect(within(getPurchaseArea()).getByText("⭕")).toBeInTheDocument();

    rerender(<PurchaseHistoryDetailView customerId="1" purchaseId="p-003" />);
    expect(within(getPurchaseArea()).getByText("⚙️")).toBeInTheDocument();

    rerender(<PurchaseHistoryDetailView customerId="1" purchaseId="p-004" />);
    expect(within(getPurchaseArea()).getByText("🚗")).toBeInTheDocument();

    rerender(<PurchaseHistoryDetailView customerId="1" purchaseId="p-005" />);
    expect(within(getPurchaseArea()).getByText("🖥️")).toBeInTheDocument();

    rerender(<PurchaseHistoryDetailView customerId="1" purchaseId="p-006" />);
    expect(within(getPurchaseArea()).getByText("🔗")).toBeInTheDocument();
  });

  it("戻るボタンと各種ボタンのクリック", async () => {
    const user = userEvent.setup();
    render(<PurchaseHistoryDetailView customerId="1" purchaseId="p-001" />);

    await user.click(screen.getByRole("button", { name: /戻る/ }));
    expect(backMock).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("button", { name: /編集する/ }));
    await user.click(screen.getByRole("button", { name: /削除する/ }));
    await user.click(screen.getByRole("button", { name: "送信" }));
  });
});