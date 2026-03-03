import type { Meta, StoryObj } from "@storybook/react";
import PurchaseHistoryView from "./PurchaseHistoryView";
import { mockCustomer, mockCustomer2 } from "./mocks";

const meta: Meta<typeof PurchaseHistoryView> = {
  title: "Customer/PurchaseHistoryView",
  component: PurchaseHistoryView,
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
type Story = StoryObj<typeof PurchaseHistoryView>;

/**
 * デフォルトの表示状態
 * サイドパネルには「山田太郎」さんの情報が表示され、
 * メインエリアには購入履歴の一覧と検索フィルターが表示されます。
 * ※リストのデータはモックから直接読み込まれます。
 */
export const Default: Story = {
  args: {
    customerId: mockCustomer.crooooberId,
  },
};

/**
 * 別の顧客のIDを渡した場合の表示
 * サイドパネルの情報が「小池若奈」さん等、別の顧客に切り替わることが確認できます。
 */
export const AnotherCustomer: Story = {
  args: {
    customerId: mockCustomer2.crooooberId,
  },
  parameters: {
    nextjs: {
      navigation: {
        segments: [["customerId", mockCustomer2.crooooberId]],
      },
    },
  },
};