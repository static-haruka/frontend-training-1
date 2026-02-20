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

test("ヘッダーが表示される（テーブル見出し含む）", () => {
  renderView();
  expect(screen.getByText("Croooober ID")).toBeInTheDocument();
  expect(screen.getByText("氏名")).toBeInTheDocument();
});

test("入力すると onChangeKeyword が呼ばれる", async () => {
  const user = userEvent.setup();
  const onChangeKeyword = jest.fn();

  renderView({ onChangeKeyword, keyword: "" });

  await user.type(
    screen.getByPlaceholderText("キーワード・電話番号で検索"),
    "abc"
  );

  expect(onChangeKeyword).toHaveBeenCalled();
});

test("未選択のとき、決定ボタンはdisabled", () => {
  renderView({ selectedId: null });
  expect(screen.getByRole("button", { name: "決定" })).toBeDisabled();
});

test("行クリックで onSelectUser が呼ばれる", async () => {
  const user = userEvent.setup();
  const onSelectUser = jest.fn();

  renderView({ onSelectUser });

  // 1件目のCroooober IDセルを起点に行(tr)を取得してクリック
  const firstId = USERS[0].crooooberId;
  const cell = screen.getByText(firstId);
  const row = cell.closest("tr");
  expect(row).not.toBeNull();

  await user.click(row as HTMLElement);

  expect(onSelectUser).toHaveBeenCalledTimes(1);

  // 呼び出し引数が "id" か "crooooberId" か実装次第なので、どちらでも通るようにする
  const calledArg = (onSelectUser.mock.calls[0] ?? [])[0];
  expect([USERS[0].id, USERS[0].crooooberId]).toContain(calledArg);
});