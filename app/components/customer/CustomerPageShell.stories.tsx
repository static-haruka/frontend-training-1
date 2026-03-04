import type { Meta, StoryObj } from "@storybook/react";
import CustomerPageShell from "./CustomerPageShell";
import { mockCustomer } from "./mocks";

const meta: Meta<typeof CustomerPageShell> = {
  title: "Customer/CustomerPageShell",
  component: CustomerPageShell,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: [["customerId", mockCustomer.crooooberId]],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CustomerPageShell>;

/**
 * デフォルト状態（「トップ」タブ選択時）
 * 中にダミーのコンテンツを配置して、レイアウトの広がり方を確認します。
 */
export const TopActive: Story = {
  args: {
    customer: mockCustomer,
    active: "top",
    children: (
      <div
        style={{
          border: "4px dashed #ccc",
          borderRadius: "8px",
          padding: "40px",
          textAlign: "center",
          color: "#999",
          backgroundColor: "#fafafa",
          height: "400px",
          display: "grid",
          placeItems: "center",
        }}
      >
        <h2>ここがメインコンテンツエリア（children）です</h2>
        <p>各種一覧や詳細ビューがここにレンダリングされます。</p>
      </div>
    ),
  },
};

/**
 * 「購入履歴」タブ選択時の状態
 */
export const PurchaseActive: Story = {
  args: {
    customer: mockCustomer,
    active: "purchase",
    children: (
      <div
        style={{
          border: "4px dashed #ccc",
          borderRadius: "8px",
          padding: "40px",
          color: "#999",
          height: "400px",
        }}
      >
        <h2>購入履歴コンテンツ</h2>
      </div>
    ),
  },
};