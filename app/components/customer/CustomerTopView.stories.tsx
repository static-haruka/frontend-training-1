import type { Meta, StoryObj } from "@storybook/react";
import CustomerTopView from "./CustomerTopView";

const meta: Meta<typeof CustomerTopView> = {
  title: "customer/CustomerTopView",
  component: CustomerTopView,
  tags: ["autodocs"],
  args: {
    customerId: "CUST-0001",
  },
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: [["customerId", "CUST-0001"]],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CustomerTopView>;

/**
 * デフォルトの表示状態
 */
export const Default: Story = {
  name: "Default",
};