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

    expect(screen.getAllByText("2022/11/01")).toHaveLength(2);
    expect(screen.getAllByText("WRX STI")).toHaveLength(2);
    expect(screen.getAllByText("未対応")).toHaveLength(2);

    expect(screen.getAllByText("¥ 12,000")).toHaveLength(2);
    expect(screen.getAllByText("Upgarage 新宿店")).toHaveLength(2);

    const row2 = screen.getByLabelText("購入履歴の詳細: 詳細");
    expect(row2).toHaveAttribute("href", "/customer/CUST-1/purchase/p-002");
    expect(screen.getAllByText("¥ 5,000")).toHaveLength(2);

    expect(screen.getAllByText("🚗")).toHaveLength(2); // car
    expect(screen.getAllByText("⚙️")).toHaveLength(2); // gear
    expect(screen.getAllByText("🖼️")).toHaveLength(2); // photo
    expect(screen.getAllByText("⭕")).toHaveLength(2); // ring
    expect(screen.getAllByText("🖥️")).toHaveLength(2); // monitor
    expect(screen.getAllByText("🔗")).toHaveLength(2); // default

    expect(screen.getAllByLabelText("コメントあり")).toHaveLength(4);
  });
});