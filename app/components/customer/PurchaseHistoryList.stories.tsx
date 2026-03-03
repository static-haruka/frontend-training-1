import type { Meta, StoryObj } from "@storybook/react";
import PurchaseHistoryList from "./PurchaseHistoryList";

const meta: Meta<typeof PurchaseHistoryList> = {
  title: "Customer/PurchaseHistoryList",
  component: PurchaseHistoryList,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "light",
      values: [{ name: "light", value: "#f5f5f5" }],
    },
  },
};

export default meta;
type Story = StoryObj<typeof PurchaseHistoryList>;

export const Default: Story = {
  args: {
    customerId: "CUST-123",
    items: [
      {
        id: "p-001",
        icon: "car",
        date: "2022/11/01",
        carName: "WRX STI",
        statusLabel: "未対応",
        statusTone: "danger",
        title: "ヨコハマタイヤ ICE GUARD 6",
        amountYen: 45000,
        shopLabel: "Upgarage 新宿店",
        hasMemo: false,
      },
      {
        id: "p-002",
        icon: "gear",
        date: "2022/10/15",
        carName: "GR86",
        statusLabel: "対応済",
        statusTone: "muted",
        title: "HKS 車高調 HIPERMAX S",
        amountYen: 120000,
        shopLabel: "Upgarage 池袋店",
        hasMemo: true,
      },
      {
        id: "p-003",
        icon: "photo",
        date: "2022/09/10",
        carName: "CIVIC",
        title: "純正フロントバンパー",
        amountYen: 15000,
        shopLabel: "Upgarage 渋谷店",
        hasMemo: false,
        comments: [{ id: "c1" }] as any,
      },
      {
        id: "p-004",
        icon: "ring",
        date: "2022/08/05",
        carName: "",
        title: "ステアリング ボス",
        amountYen: 3500,
        shopLabel: "Webストア",
        hasMemo: false,
      },
      {
        id: "p-005",
        icon: "monitor",
        date: "2022/07/20",
        carName: "WRX STI",
        title: "カーナビ カロッツェリア",
        amountYen: 80000,
        shopLabel: "Upgarage 新宿店",
        hasMemo: false,
      },
      {
        id: "p-006",
        icon: "other",
        date: "2022/06/11",
        carName: "GR86",
        title: "",
        amountYen: 0,
        shopLabel: "",
        hasMemo: false,
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    customerId: "CUST-123",
    items: [],
  },
};