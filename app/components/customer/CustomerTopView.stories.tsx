import type { Meta, StoryObj } from "@storybook/react";
import CustomerTopView from "./CustomerTopView";

const meta: Meta<typeof CustomerTopView> = {
  title: "customer/CustomerTopView",
  component: CustomerTopView,
  tags: ["autodocs"],
  args: {
    customerId: "12345678901234",
  },
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: [["customerId", "12345678901234"]],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CustomerTopView>;

export const Default: Story = {
  name: "Default",
};