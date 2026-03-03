import type { Meta, StoryObj } from "@storybook/react";
import PurchaseHistoryDetailView from "./PurchaseHistoryDetailView";
import { mockCustomer } from "./mocks";

const meta: Meta<typeof PurchaseHistoryDetailView> = {
  title: "Customer/PurchaseHistoryDetailView",
  component: PurchaseHistoryDetailView,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: [
          ["customerId", mockCustomer.crooooberId],
          ["purchaseId", "p-001"],
        ],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PurchaseHistoryDetailView>;

/**
 * デフォルト状態（基本情報のみ）
 * メモやコメントが特に登録されていないシンプルな履歴詳細の表示です。
 * （モックデータの `p-001` を参照しています）
 */
export const Default: Story = {
  args: {
    customerId: mockCustomer.crooooberId,
    purchaseId: "p-001",
  },
};

/**
 * 存在しないIDが渡された状態
 * コンポーネント内の `if (!item) return null;` に合致するため、画面には何も表示されません。
 * （エラーでクラッシュせずに真っ白になることの確認用です）
 */
export const NotFound: Story = {
  args: {
    customerId: mockCustomer.crooooberId,
    purchaseId: "invalid-id",
  },
};