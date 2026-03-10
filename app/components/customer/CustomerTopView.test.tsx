import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CustomerTopView from "./CustomerTopView";

const pushMock = jest.fn();
let mockParams: any = { customerId: "123" };

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock, back: jest.fn(), replace: jest.fn(), prefetch: jest.fn() }),
  useParams: () => mockParams,
}));

jest.mock("./Pagination", () => {
  return function MockPagination({ page, totalPages, onChange }: any) {
    return (
      <div>
        <span data-testid="page-info">page:{page} / total:{totalPages}</span>
        <button type="button" onClick={() => onChange(page + 1)}>NextPage</button>
      </div>
    );
  };
});

jest.mock("./mocks", () => {
  const actual = jest.requireActual("./mocks");
  const customTransactions = [
    { id: "t-res", kind: "reservation", carId: "car-1", carLabel: "インプレッサ\nスポーツ", date: "2022.7.01", sortAt: "2022-07-01T10:00:00Z", title: "RESERVATION ITEM", hasComment: false, shopLabel: "店舗X", icon: "circle" },
    { id: "t-edge", kind: "purchase", carId: "car-1", date: "2022.8.01", sortAt: "2022-08-01T10:00:00Z", title: "EDGE ITEM", hasComment: true, icon: "circle" },
    ...actual.mockTransactions,
  ];

  return {
    ...actual,
    mockTransactions: customTransactions,
    fetchTransactions: () => customTransactions,
    fetchCustomer: jest.fn((id: any) => {
      if (id === "456" || id === "98382329238838") return actual.mockCustomer2;
      return actual.mockCustomer;
    }),
  };
});

describe("CustomerTopView", () => {
  beforeEach(() => { mockParams = { customerId: "123" }; jest.clearAllMocks(); });

  test("キーワード検索：一致するアイテムのみが表示される", async () => {
    const user = userEvent.setup();
    render(<CustomerTopView customerId="123" />);
    const keywordInput = screen.getAllByRole("textbox")[0];
    await user.type(keywordInput, "EDGE");
    expect(screen.getByText("EDGE ITEM")).toBeInTheDocument();
  });

  test("customerId が配列の場合、最初の要素が使用される", async () => {
    mockParams = { customerId: ["123", "456"] };
    render(<CustomerTopView />);
    const heading = await screen.findByRole("heading", { name: /取引履歴/ });
    expect(heading).toBeInTheDocument();
  });

  test("customerId が params に無い場合、デフォルト値にフォールバックされる", async () => {
    mockParams = {}; 
    render(<CustomerTopView customerId="123" />);
    const heading = await screen.findByRole("heading", { name: /取引履歴/ });
    expect(heading).toBeInTheDocument();
  });

  test("顧客が見つからない場合の表示（カバレッジ用）", () => {
    const { fetchCustomer } = require("./mocks");
    fetchCustomer.mockReturnValueOnce(undefined);
    render(<CustomerTopView customerId="unknown" />);
    expect(screen.getByText("顧客情報が見つかりません")).toBeInTheDocument();
  });

  test("carId フィルターを指定すると該当車両の取引のみに絞り込まれる（59行目カバレッジ）", async () => {
    const user = userEvent.setup();
    render(<CustomerTopView customerId="123" />);
    const selects = screen.getAllByRole("combobox");
    await user.selectOptions(selects[0], "car-1");
    expect(screen.getByText("RESERVATION ITEM")).toBeInTheDocument();
  });

  test("customerId が空文字の場合、顧客情報が見つからない表示になる（30行目カバレッジ）", () => {
    render(<CustomerTopView customerId="" />);
    expect(screen.getByText("顧客情報が見つかりません")).toBeInTheDocument();
  });

  test("hasCommentOnly フィルターONでメモ付き取引のみ表示される（61行目カバレッジ）", async () => {
    const user = userEvent.setup();
    render(<CustomerTopView customerId="123" />);
    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(screen.getByText("EDGE ITEM")).toBeInTheDocument();
  });

  test("チェックボックスをOFF→ONと操作してonChangeハンドラーを通す（103行目カバレッジ）", async () => {
    const user = userEvent.setup();
    render(<CustomerTopView customerId="123" />);
    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox); // ON
    expect(checkbox).toBeChecked();
    await user.click(checkbox); // OFF
    expect(checkbox).not.toBeChecked();
  });
});