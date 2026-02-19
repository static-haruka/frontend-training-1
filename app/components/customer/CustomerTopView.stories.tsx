import type { Meta, StoryObj } from "@storybook/react";
import CustomerTopView from "./CustomerTopView";

const meta: Meta<typeof CustomerTopView> = {
  title: "customer/CustomerTopView",
  component: CustomerTopView,
  args: {
    customerId: "CUST-0001",
  },
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof CustomerTopView>;

export const Default: Story = {};
