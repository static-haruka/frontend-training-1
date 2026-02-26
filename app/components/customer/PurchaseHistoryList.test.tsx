import { render, screen } from "@testing-library/react";
import PurchaseHistoryList from "./PurchaseHistoryList";

jest.mock("next/link", () => {
  return ({ href, children, ...props }: any) => (
    <a href={typeof href === "string" ? href : String(href)} {...props}>
      {children}
    </a>
  );
});

describe("PurchaseHistoryList", () => {
  it("items を行として描画し、href が customerId/purchaseId になる", () => {
    render(
      <PurchaseHistoryList
        customerId="CUST-1"
        items={[
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
            carName: "",
            statusLabel: "",
            statusTone: "muted",
            title: "",
            amountYen: 5000,
            shopLabel: "",
            hasMemo: true,
          },
        ]}
      />
    );

    const row1 = screen.getByLabelText("購入履歴の詳細: タイヤ交換");
    expect(row1).toHaveAttribute("href", "/customer/CUST-1/purchase/p-001");
    expect(screen.getByText("2022/11/01 /")).toBeInTheDocument();
    expect(screen.getByText("WRX STI")).toBeInTheDocument();
    expect(screen.getByText("未対応")).toBeInTheDocument();
    expect(screen.getByText("¥ 12,000")).toBeInTheDocument();
    expect(screen.getByText("Upgarage 新宿店")).toBeInTheDocument();

    const row2 = screen.getByLabelText("購入履歴の詳細: 詳細");
    expect(row2).toHaveAttribute("href", "/customer/CUST-1/purchase/p-002");
    expect(screen.getByText("¥ 5,000")).toBeInTheDocument();
  });
});