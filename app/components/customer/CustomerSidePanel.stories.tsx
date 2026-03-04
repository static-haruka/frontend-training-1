import type { Meta, StoryObj } from "@storybook/react";
import CustomerSidePanel from "./CustomerSidePanel";

const meta: Meta<typeof CustomerSidePanel> = {
  title: "Customer/CustomerSidePanel",
  component: CustomerSidePanel,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "light",
      values: [{ name: "light", value: "#f5f5f5" }],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: "600px", display: "flex" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CustomerSidePanel>;

/**
 * デフォルト状態（顧客情報と愛車情報がすべて揃っているパターン）
 */
export const Default: Story = {
  args: {
    customer: {
      id: "123",
      crooooberId: "12345678901234",
      name: "山田太郎",
      cars: [
        {
          id: "car-1",
          maker: "NISSAN",
          model: "R35",
          note: "車検まであと1ヶ月です",
          image: "/images/nissan-r35.jpeg", 
        },
        {
          id: "car-2",
          maker: "MAZDA",
          model: "ROADSTAR",
          note: "点検の案内あり",
          image: "/images/mazda-roadstar.jpg",
        },
      ],
    },
  },
};

/**
 * 愛車の画像やメモ（note）が登録されていない場合の表示
 */
export const NoImageAndNote: Story = {
  args: {
    customer: {
      id: "456",
      crooooberId: "98382329238838",
      name: "小池若奈",
      cars: [
        {
          id: "car-3",
          maker: "TOYOTA",
          model: "PRIUS",
        },
        {
          id: "car-4",
          maker: "HONDA",
          model: "CIVIC",
        },
      ],
    },
  },
};

/**
 * 愛車が1台も登録されていない場合の表示
 */
export const EmptyCars: Story = {
  args: {
    customer: {
      id: "789",
      crooooberId: "11112222333344",
      name: "鈴木一郎",
      cars: [],
    },
  },
};