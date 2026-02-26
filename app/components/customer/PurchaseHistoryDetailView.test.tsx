import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PurchaseHistoryDetailView from "./PurchaseHistoryDetailView";

const backMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: backMock,
  }),
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
      icon: "car",
      date: "2022/11/01",
      carName: "WRX STI",
      statusLabel: "未対応",
      statusTone: "danger",
      title: "タイヤ交換",
      amountYen: 12000,
      shopLabel: "Upgarage 新宿店",
      hasMemo: true,
    },
  ],
  MOCK_PURCHASE_DETAILS: {
    "p-001": {
      managementNo: "UP00000001",
      productName: "ヨコハマタイヤ",
      productUrl: "https://example.com",
      memoText: "ここメモ本文",
    },
  },
}));

describe("PurchaseHistoryDetailView", () => {
  beforeEach(() => {
    backMock.mockClear();
  });

  it("purchaseId が見つからないと null を返す（何も描画しない）", () => {
    const { container } = render(
      <PurchaseHistoryDetailView customerId="CUST-1" purchaseId="p-999" />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("詳細が描画され、管理番号・商品名・URL が表示される", () => {
    render(<PurchaseHistoryDetailView customerId="CUST-1" purchaseId="p-001" />);

    expect(screen.getByText("購入履歴")).toBeInTheDocument();
    expect(screen.getByText("管理番号：UP00000001")).toBeInTheDocument();
    expect(screen.getByText("ヨコハマタイヤ")).toBeInTheDocument();

    const link = screen.getByRole("link", { name: "https://example.com" });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");

    expect(screen.getByText("ここメモ本文")).toBeInTheDocument();
    expect(screen.getByText("¥ 12,000")).toBeInTheDocument();
  });

  it("戻るボタンで router.back が呼ばれる", async () => {
    const user = userEvent.setup();
    render(<PurchaseHistoryDetailView customerId="CUST-1" purchaseId="p-001" />);

    await user.click(screen.getByRole("button", { name: "戻る" }));
    expect(backMock).toHaveBeenCalledTimes(1);
  });
});