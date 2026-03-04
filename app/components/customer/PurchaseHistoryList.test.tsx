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
  it("すべてのアイコン分岐、コメント分岐、および行の描画が正しく行われること", () => {
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
          {
            id: "p-003",
            icon: "photo",
            date: "2022/11/03",
            title: "写真",
            amountYen: 1000,
          } as any,
          {
            id: "p-004",
            icon: "ring",
            date: "2022/11/04",
            title: "リング",
            amountYen: 2000,
          } as any,
          {
            id: "p-005",
            icon: "monitor",
            date: "2022/11/05",
            title: "モニター",
            amountYen: 3000,
          } as any,
          {
            id: "p-006",
            icon: "other",
            date: "2022/11/06",
            title: "その他",
            amountYen: 4000,
            hasMemo: false,
            comments: [{ id: "c1" }],
          } as any,
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

    expect(screen.getByText("🚗")).toBeInTheDocument(); // car
    expect(screen.getByText("⚙️")).toBeInTheDocument(); // gear
    expect(screen.getByText("🖼️")).toBeInTheDocument(); // photo
    expect(screen.getByText("⭕")).toBeInTheDocument(); // ring
    expect(screen.getByText("🖥️")).toBeInTheDocument(); // monitor
    expect(screen.getByText("🔗")).toBeInTheDocument(); // default

    expect(screen.getAllByLabelText("コメントあり")).toHaveLength(2);
  });
});