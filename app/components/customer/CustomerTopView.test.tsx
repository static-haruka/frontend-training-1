import { render, screen, within } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

jest.mock("./mocks", () => {
  const actual = jest.requireActual("./mocks");
  return {
    ...actual,
    mockTransactions: [
      ...actual.mockTransactions,
      {
        id: "t-res",
        kind: "reservation",
        carId: "car-1",
        carLabel: "インプレッサ\nスポーツ",
        date: "2022.7.01",
        sortAt: "2022-07-01T10:00:00Z",
        title: "RESERVATION ITEM",
        hasComment: false,
        shopLabel: "店舗X",
        icon: "circle",
      },
      {
        id: "t-con",
        kind: "considering",
        carId: "car-1",
        carLabel: "インプレッサ\nスポーツ",
        date: "2022.6.01",
        sortAt: "2022-06-01T10:00:00Z",
        title: "CONSIDERING ITEM",
        hasComment: false,
        shopLabel: "店舗Y",
        icon: "circle",
      },
    ],
  };
});

import CustomerTopView from "./CustomerTopView";

test("期間フィルタ：from だけ指定した場合も動く（fromのみ分岐）", async () => {
  const user = userEvent.setup();
  render(<CustomerTopView customerId="123" />);

  const from = screen.getAllByDisplayValue("")[0] as HTMLInputElement;
  await user.type(from, "2022-09-01");

  expect(screen.queryByText("CONSIDERING ITEM")).not.toBeInTheDocument();
});

test("期間フィルタ：to だけ指定した場合も動く（toのみ分岐）", async () => {
  const user = userEvent.setup();
  render(<CustomerTopView customerId="123" />);

  const to = screen.getAllByDisplayValue("")[1] as HTMLInputElement;

  await user.type(to, "2022-05-31");

  expect(screen.queryByText("CONSIDERING ITEM")).not.toBeInTheDocument();
});


test("愛車フィルタ：car-2 を選ぶと 0件 になる（carId 分岐）", async () => {
  const user = userEvent.setup();
  render(<CustomerTopView customerId="123" />);

  await user.selectOptions(
    screen.getByRole("combobox", { name: "愛車" }),
    "car-2"
  );

  expect(screen.getByText("0件")).toBeInTheDocument();
});




test("メモ付きのみ：ONで hasComment=true だけが残る（hasCommentOnly 分岐）", async () => {
  const user = userEvent.setup();
  render(<CustomerTopView customerId="123" />);

  await user.click(screen.getByRole("checkbox", { name: "メモ付きのみ" }));

  expect(screen.queryByText("CONSIDERING ITEM")).not.toBeInTheDocument();
  expect(screen.queryByText("RESERVATION ITEM")).not.toBeInTheDocument();
});