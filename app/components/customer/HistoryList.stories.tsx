import type { Meta, StoryObj } from "@storybook/react";
import HistoryList from "./HistoryList";
const meta: Meta<typeof HistoryList> = {
  title: "Customer/HistoryList",
  component: HistoryList,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "light",
      values: [{ name: "light", value: "#f5f5f5" }],
    },
  },
};

export default meta;
type Story = StoryObj<typeof HistoryList>;

export const Default: Story = {
  args: {
    items: [
      {
        id: "t-1",
        kind: "purchase",
        carId: "car-1",
        carLabel: "インプレッサ\nスポーツ",
        date: "2022.9.26",
        sortAt: "2022-09-26T10:00:00Z",
        title: "GOODYEAR EAGLE REVSPEC RS-02 205/55R16",
        amount: 13138,
        hasComment: true,
        shopLabel: "店舗1(検証用直営1)",
        icon: "circle",
      },
      {
        id: "t-2",
        kind: "assessment",
        carId: "car-1",
        carLabel: "インプレッサ\nスポーツ",
        date: "2022.9.20",
        sortAt: "2022-09-20T10:00:00Z",
        title: "純正マフラー 買取査定",
        amount: undefined,
        hasComment: false,
        shopLabel: "店舗2",
        icon: "gear",
      },
      {
        id: "t-3",
        kind: "purchase",
        carId: "car-1",
        carLabel: "未設定",
        statusLabel: "未設定",
        date: "2022.8.15",
        sortAt: "2022-08-15T10:00:00Z",
        title: "汎用 ドリンクホルダー",
        amount: 1500,
        hasComment: false,
        shopLabel: "Webストア",
        icon: "link",
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};