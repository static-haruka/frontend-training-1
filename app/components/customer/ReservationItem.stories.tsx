import type { Meta, StoryObj } from "@storybook/react";
import ReservationItem from "./ReservationItem";

const meta: Meta<typeof ReservationItem> = {
  title: "Customer/ReservationItem",
  component: ReservationItem,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ReservationItem>;

export const Default: Story = {
  args: {
    isPast: false,
    reservation: {
      id: "1",
      datetime: "2023年03月06日 12:30",
      task: "買取予約",
      storeName: "ｔ横浜町田総本店",
      storeUrl: "#",
    },
  },
};

export const Past: Story = {
  args: {
    isPast: true,
    reservation: {
      id: "2",
      datetime: "2023年01月10日 15:30",
      task: "買取予約",
      storeName: "ｔ盛岡インター店",
      storeUrl: "#",
    },
  },
};