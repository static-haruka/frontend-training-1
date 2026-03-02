import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const pushMock = jest.fn();
let mockParams: any = { customerId: "123" };

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    back: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useParams: () => mockParams,
}));

jest.mock("./Pagination", () => {
  return function MockPagination({ page, totalPages, onChange }: any) {
    return (
      <div>
        <span data-testid="page-info">page:{page} / total:{totalPages}</span>
        <button type="button" onClick={() => onChange(page + 1)}>
          NextPage
        </button>
      </div>
    );
  };
});

jest.mock("./mocks", () => {
  const actual = jest.requireActual("./mocks");
  const customTransactions = [
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
    {
      id: "t-edge",
      kind: "purchase",
      carId: "invalid-car-id",
      carLabel: undefined,
      statusLabel: undefined,
      shopLabel: undefined,
      date: "2022.8.01",
      sortAt: "2022-08-01T10:00:00Z",
      title: "EDGE ITEM",
      hasComment: true,
      icon: "circle",
    },
    {
      id: "t-assess",
      kind: "assessment",
      carId: "car-1",
      carLabel: "インプレッサ",
      date: "2022.9.01",
      sortAt: "2022-09-01T10:00:00Z",
      title: "ASSESSMENT ITEM",
      hasComment: false,
      icon: "circle",
    },
    { id: "t-d1", kind: "other", date: "2021.1.1", sortAt: "2021-01-01T00:00:00Z", title: "DUMMY 1", hasComment: false },
    { id: "t-d2", kind: "other", date: "2021.1.2", sortAt: "2021-01-02T00:00:00Z", title: "DUMMY 2", hasComment: false },
    { id: "t-d3", kind: "other", date: "2021.1.3", sortAt: "2021-01-03T00:00:00Z", title: "DUMMY 3", hasComment: false },
    { id: "t-d4", kind: "other", date: "2021.1.4", sortAt: "2021-01-04T00:00:00Z", title: "DUMMY 4", hasComment: false },
    ...actual.mockTransactions,
  ];

  return {
    ...actual,
    mockTransactions: customTransactions,
    fetchTransactions: () => customTransactions,
  };
});

import CustomerTopView from "./CustomerTopView";

describe("CustomerTopView", () => {
  beforeEach(() => {
    mockParams = { customerId: "123" };
  });

  test("期間フィルタ：from だけ指定した場合も動く（fromのみ分岐）", async () => {
    const user = userEvent.setup();
    render(<CustomerTopView customerId="123" />);

    const from = screen.getByLabelText("開始日");
    await user.type(from, "2022-09-01");

    expect(screen.queryByText("CONSIDERING ITEM")).not.toBeInTheDocument();
  });

  test("期間フィルタ：to だけ指定した場合も動く（toのみ分岐）", async () => {
    const user = userEvent.setup();
    render(<CustomerTopView customerId="123" />);

    const to = screen.getByLabelText("終了日");
    await user.type(to, "2022-05-31");

    expect(screen.queryByText("CONSIDERING ITEM")).not.toBeInTheDocument();
  });

  test("愛車フィルタ：car-2 を選ぶと該当なしになる（carId 分岐）", async () => {
    const user = userEvent.setup();
    render(<CustomerTopView customerId="123" />);

    await user.selectOptions(screen.getByRole("combobox", { name: "愛車" }), "car-2");

    expect(screen.queryByText("CONSIDERING ITEM")).not.toBeInTheDocument();
  });

  test("メモ付きのみ：ONで hasComment=true だけが残る（hasCommentOnly 分岐）", async () => {
    const user = userEvent.setup();
    render(<CustomerTopView customerId="123" />);

    await user.click(screen.getByRole("checkbox", { name: "メモ付きのみ" }));

    expect(screen.queryByText("CONSIDERING ITEM")).not.toBeInTheDocument();
    expect(screen.queryByText("RESERVATION ITEM")).not.toBeInTheDocument();
    expect(screen.getByText("EDGE ITEM")).toBeInTheDocument();
  });

  test("キーワード検索：一致するアイテムのみが表示される（containsKeyword の全分岐網羅）", async () => {
    const user = userEvent.setup();
    render(<CustomerTopView customerId="123" />);

    const inputs = screen.getAllByRole("textbox");
    const keywordInput = inputs[0]; 

    await user.type(keywordInput, "EDGE");
    expect(screen.getByText("EDGE ITEM")).toBeInTheDocument();
    expect(screen.queryByText("CONSIDERING ITEM")).not.toBeInTheDocument();

    await user.clear(keywordInput);
    expect(screen.getByText("CONSIDERING ITEM")).toBeInTheDocument();

    await user.type(keywordInput, "購入履歴");
    expect(screen.getByText("EDGE ITEM")).toBeInTheDocument(); 
    await user.clear(keywordInput);

    await user.type(keywordInput, "査定履歴");
    expect(screen.getByText("ASSESSMENT ITEM")).toBeInTheDocument(); 
  });

  test("ページネーションの挙動とフィルタ変更によるページリセット", async () => {
    const user = userEvent.setup();
    render(<CustomerTopView customerId="123" />);

    await user.click(screen.getByRole("button", { name: "NextPage" }));
    expect(screen.getByTestId("page-info")).toHaveTextContent("page:2");

    await user.click(screen.getByRole("checkbox", { name: "メモ付きのみ" }));
    expect(screen.getByTestId("page-info")).toHaveTextContent("page:1");
  });

  test("customerId が配列の場合、最初の要素が使用される", () => {
    mockParams = { customerId: ["CUST-ARR-1", "CUST-ARR-2"] };
    render(<CustomerTopView />);
    expect(screen.getByText("取引履歴")).toBeInTheDocument();
  });

  test("customerId が params に無い場合、デフォルト値にフォールバックされる", () => {
    mockParams = {};
    render(<CustomerTopView />);
    expect(screen.getByText("取引履歴")).toBeInTheDocument();
  });
});