import type { Meta, StoryObj } from "@storybook/react";
import ReservationView from "./ReservationView";
import { mockCustomer } from "./mocks";

const meta = {
  title: "customer/ReservationView",
  component: ReservationView,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "light",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "24px 24px 16px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ReservationView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    customer: mockCustomer,
  },
};