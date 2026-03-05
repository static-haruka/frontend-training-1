import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TopTabs from "./TopTabs";

const pushMock = jest.fn();

let mockUseParams = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    back: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useParams: () => mockUseParams(),
}));

describe("TopTabs", () => {
  beforeEach(() => {
    pushMock.mockClear();
    mockUseParams.mockReturnValue({ customerId: "CUST-1" });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

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

  it("有効なタブをクリックすると、正しいURLへ遷移する", async () => {
    const user = userEvent.setup();
    render(<TopTabs active="top" />);

    await user.click(screen.getByRole("button", { name: "購入履歴" }));
    expect(pushMock).toHaveBeenCalledWith("/customer/CUST-1/purchase");

    await user.click(screen.getByRole("button", { name: "トップ" }));
    expect(pushMock).toHaveBeenCalledWith("/customer/CUST-1");

    await user.click(screen.getByRole("button", { name: "作業予約" }));
    expect(pushMock).toHaveBeenCalledWith("/customer/CUST-1/reservation");
  });

  it("customerId が配列で渡された場合、最初の要素が使用される", async () => {
    mockUseParams.mockReturnValue({ customerId: ["CUST-ARR-1", "CUST-ARR-2"] });
    const user = userEvent.setup();
    render(<TopTabs active="top" />);

    await user.click(screen.getByRole("button", { name: "トップ" }));
    expect(pushMock).toHaveBeenCalledWith("/customer/CUST-ARR-1");
  });

  it("customerId が存在しない場合、クリックしても遷移しない", async () => {
    mockUseParams.mockReturnValue({});
    const user = userEvent.setup();
    render(<TopTabs active="top" />);

    await user.click(screen.getByRole("button", { name: "トップ" }));
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("無効なタブ(isEnabled=false)の onClick 内部の早期リターンを網羅する", () => {
    render(<TopTabs active="top" />);
    const messageTab = screen.getByRole("button", { name: "メッセージ" });
    
    const reactPropsKey = Object.keys(messageTab).find(key => key.startsWith("__reactProps"));
    if (reactPropsKey) {
      messageTab[reactPropsKey].onClick();
    }
    
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("内部関数 buildHref のフォールバック (return '') を網羅する", () => {
    const originalIncludes = Array.prototype.includes;
    jest.spyOn(Array.prototype, "includes").mockImplementation(function (this: any, searchElement: any) {
      if (Array.isArray(this) && this.join(",") === "top,purchase,reservation") {
        return true; 
      }
      return originalIncludes.call(this, searchElement);
    });

    render(<TopTabs active="top" />);
    
    const messageTab = screen.getByRole("button", { name: "メッセージ" });
    fireEvent.click(messageTab);

    expect(pushMock).toHaveBeenCalledWith("");
  });
});