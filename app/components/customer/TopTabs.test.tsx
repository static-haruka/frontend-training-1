import { render, screen } from "@testing-library/react";
import TopTabs from "./TopTabs";

describe("TopTabs", () => {
  it("すべてのタブがボタンとして表示される", () => {
    render(<TopTabs active="top" />);

    expect(screen.getByRole("button", { name: "トップ" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "メッセージ" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "検討中パーツ" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "購入履歴" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "査定中" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "買取履歴" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "作業予約" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "作業履歴" })).toBeInTheDocument();
  });

  it("active に指定したタブだけ aria-current=page になる", () => {
    render(<TopTabs active="purchase" />);

    const purchase = screen.getByRole("button", { name: "購入履歴" });
    expect(purchase).toHaveAttribute("aria-current", "page");

    const top = screen.getByRole("button", { name: "トップ" });
    expect(top).not.toHaveAttribute("aria-current");
  });
});