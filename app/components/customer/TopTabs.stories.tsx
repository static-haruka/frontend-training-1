import type { Meta, StoryObj } from "@storybook/react";
import TopTabs from "./TopTabs";

const meta: Meta<typeof TopTabs> = {
  title: "Customer/TopTabs",
  component: TopTabs,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: [["customerId", "CUST-123"]],
      },
    },
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof TopTabs>;

/**
 * デフォルト状態（「トップ」タブがアクティブ）
 */
export const TopActive: Story = {
  args: {
    active: "top",
  },
};

/**
 * 「購入履歴」タブがアクティブな状態
 */
export const PurchaseActive: Story = {
  args: {
    active: "purchase",
  },
};

/**
 * 「予約一覧」タブがアクティブな状態
 */
export const ReservationActive: Story = {
  args: {
    active: "reservation",
  },
};