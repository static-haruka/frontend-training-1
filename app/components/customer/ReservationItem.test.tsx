import { render, screen } from "@testing-library/react";
import ReservationItem from "./ReservationItem";
import type { Reservation } from "./ReservationView";

const mockReservation: Reservation = {
  id: "test-1",
  datetime: "2023年03月06日 12:30",
  task: "買取予約",
  storeName: "t 横浜町田総本店",
  storeUrl: "/dummy-url",
};

describe("ReservationItem", () => {
  it("渡された予約情報が正しくレンダリングされること（通常表示）", () => {
    render(<ReservationItem reservation={mockReservation} isPast={false} />);

    expect(screen.getByText("2023年03月06日 12:30")).toBeInTheDocument();
    expect(screen.getByText("買取予約")).toBeInTheDocument();
    expect(screen.getByText("t 横浜町田総本店")).toBeInTheDocument();

    const storeLink = screen.getByRole("link", { name: "t 横浜町田総本店" });
    expect(storeLink).toHaveAttribute("href", "/dummy-url");

    expect(screen.getByRole("button", { name: "予約詳細" })).toBeInTheDocument();
  });

  it("過去の予約（isPast=true）としてレンダリングしてもクラッシュしないこと", () => {
    render(<ReservationItem reservation={mockReservation} isPast={true} />);
    
    expect(screen.getByText("2023年03月06日 12:30")).toBeInTheDocument();
  });
});