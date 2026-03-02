import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserSearchView from "./UserSearchView";
import { MOCK_USERS } from "../user_search/mockUsers";

const USERS = MOCK_USERS;

function renderView(
  override?: Partial<React.ComponentProps<typeof UserSearchView>>
) {
  const props: React.ComponentProps<typeof UserSearchView> = {
    keyword: "山",
    onChangeKeyword: () => {},
    users: USERS as any,
    selectedId: null,
    onSelectUser: () => {},
    onSearch: () => {},
    onBack: () => {},
    onDecide: () => {},
    ...override,
  };

  return render(<UserSearchView {...props} />);
}

describe("UserSearchView", () => {
  it("ヘッダーが表示される（テーブル見出し含む）", () => {
    renderView();
    expect(screen.getByText("Croooober ID")).toBeInTheDocument();
    expect(screen.getByText("氏名")).toBeInTheDocument();
  });

  it("入力すると onChangeKeyword が呼ばれる", async () => {
    const user = userEvent.setup();
    const onChangeKeyword = jest.fn();

    renderView({ onChangeKeyword, keyword: "" });

    await user.type(
      screen.getByPlaceholderText("キーワード・電話番号で検索"),
      "abc"
    );

    expect(onChangeKeyword).toHaveBeenCalled();
  });

  it("未選択のとき、決定ボタンはdisabled", () => {
    renderView({ selectedId: null });
    expect(screen.getByRole("button", { name: "決定" })).toBeDisabled();
  });

  it("行クリックで onSelectUser が呼ばれる", async () => {
    const user = userEvent.setup();
    const onSelectUser = jest.fn();

    renderView({ onSelectUser });

    const firstId = USERS[0].crooooberId;
    const cell = screen.getByText(firstId);
    const row = cell.closest("tr");
    expect(row).not.toBeNull();

    await user.click(row as HTMLElement);

    expect(onSelectUser).toHaveBeenCalledTimes(1);

    const calledArg = (onSelectUser.mock.calls[0] ?? [])[0];
    expect([USERS[0].id, USERS[0].crooooberId]).toContain(calledArg);
  });

  it("ユーザーが見つからないとき「該当する顧客がいません」と表示される", () => {
    renderView({ users: [] });
    expect(screen.getByText("該当する顧客がいません")).toBeInTheDocument();
  });

  it("selectedId に一致するユーザーの行は選択状態になる", () => {
    renderView({ selectedId: USERS[0].crooooberId });
    
    const firstRow = screen.getByText(USERS[0].crooooberId).closest("tr");
    expect(firstRow).toHaveAttribute("aria-selected", "true");

    const secondRow = screen.getByText(USERS[1].crooooberId).closest("tr");
    expect(secondRow).toHaveAttribute("aria-selected", "false");
  });

  it("検索、戻る、決定ボタンがクリックされたとき、それぞれの関数が呼ばれる", async () => {
    const user = userEvent.setup();
    const onSearch = jest.fn();
    const onBack = jest.fn();
    const onDecide = jest.fn();

    renderView({ 
      onSearch, 
      onBack, 
      onDecide,
      selectedId: USERS[0].crooooberId
    });

    await user.click(screen.getByRole("button", { name: "検索" }));
    expect(onSearch).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("button", { name: "戻る" }));
    expect(onBack).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("button", { name: "決定" }));
    expect(onDecide).toHaveBeenCalledTimes(1);
  });
});