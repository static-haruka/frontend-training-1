import { render, screen } from "@testing-library/react";
import CustomerSidePanel from "./CustomerSidePanel";

describe("CustomerSidePanel", () => {
  it("顧客ID・氏名・愛車一覧・ボタンが表示され、note はあるときだけ表示される", () => {
    render(
      <CustomerSidePanel
        customer={
          {
            crooooberId: "CR-0001",
            name: "username",
            cars: [
              {
                id: "car-1",
                maker: "SUBARU",
                model: "WRX STI",
                note: "スタッドレス",
                image: "cars/wrx.jpg",
              },
              {
                id: "car-2",
                maker: "TOYOTA",
                model: "GR86",
                note: "",
                image: "/cars/gr86.jpg",
              },
              {
                id: "car-3",
                maker: "HONDA",
                model: "CIVIC",
                note: undefined,
                image: null,
              },
            ],
          } as any
        }
      />
    );

    // 顧客情報
    expect(screen.getByText("Croooober ID")).toBeInTheDocument();
    expect(screen.getByText("CR-0001")).toBeInTheDocument();
    expect(screen.getByText("username")).toBeInTheDocument();
    expect(screen.getByText("さま")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "編集" })).toHaveAttribute("href", "#");

    // 愛車一覧
    expect(screen.getByText("愛車一覧")).toBeInTheDocument();

    expect(screen.getByText("SUBARU")).toBeInTheDocument();
    expect(screen.getByText("WRX STI")).toBeInTheDocument();

    expect(screen.getByText("TOYOTA")).toBeInTheDocument();
    expect(screen.getByText("GR86")).toBeInTheDocument();

    expect(screen.getByText("HONDA")).toBeInTheDocument();
    expect(screen.getByText("CIVIC")).toBeInTheDocument();

    expect(screen.getByText("スタッドレス")).toBeInTheDocument();
    expect(screen.queryByText("GR86", { exact: true }))
      .toBeInTheDocument();
    expect(screen.queryByText("（なし）")).not.toBeInTheDocument();

    // ボタン
    expect(screen.getByRole("button", { name: "新規見積り" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "新規買取査定" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "新規作業予約" })).toBeInTheDocument();
  });

  it("画像 src の先頭に / がない場合は補完され、null の場合は img が出ない", () => {
    const { container } = render(
      <CustomerSidePanel
        customer={
          {
            crooooberId: "CR-0002",
            name: "username",
            cars: [
              { id: "car-1", maker: "A", model: "M1", note: "", image: "a.jpg" },
              { id: "car-2", maker: "B", model: "M2", note: "", image: "/b.jpg" },
              { id: "car-3", maker: "C", model: "M3", note: "", image: null },
            ],
          } as any
        }
      />
    );

    const imgs = Array.from(container.querySelectorAll("img"));
    expect(imgs).toHaveLength(2);
    expect(imgs[0].getAttribute("src")).toBe("/a.jpg");
    expect(imgs[1].getAttribute("src")).toBe("/b.jpg");
  });
});