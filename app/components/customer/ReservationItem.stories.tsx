import type { Meta, StoryObj } from "@storybook/react";
import ReservationItem from "./ReservationItem";

const meta = {
  title: "customer/ReservationItem",
  component: ReservationItem,
  tags: ["autodocs"],
} satisfies Meta<typeof ReservationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    reservation: {
      id: "1",
      datetime: "2023年03月06日 12:30",
      task: "買取予約",
      storeName: "t 横浜町田総本店",
      storeUrl: "#",
    },
  },
};

export const LongText: Story = {
  args: {
    reservation: {
      id: "2",
      datetime: "2023年12月31日 23:59",
      task: "UPPIT(持込取付予約) - タイヤ交換・アライメント調整",
      storeName: "t 札幌新発寒店（北海道エリア店舗）",
      storeUrl: "#",
    },
  },
};